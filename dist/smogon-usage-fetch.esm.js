import fetch from "node-fetch";
import { arrCompact, isEmpty, isNil, isRegExp } from "lightdash";
import { load } from "cheerio";

/**
 * Collects elements in an array into a an array of merged elements.
 *
 * @private
 * @param arr Array to collect.
 * @param keyFn Function returning the key for the value.
 * @param creationFn Function creating a new element.
 * @param mutatorConsumer Consumer mutating the existing object with the new data.
 * @returns Merged and collected elements.
 */
const arrMergingCollect = (arr, keyFn, creationFn, mutatorConsumer) => {
    const collected = new Map();
    arr.forEach(val => {
        const key = keyFn(val);
        if (!collected.has(key)) {
            collected.set(key, creationFn(val));
        }
        mutatorConsumer(val, collected.get(key));
    });
    return Array.from(collected.values());
};

const RANK_DEFAULT = "0";
const FORMAT_DELIMITER = "-";
const FORMAT_ELEMENTS_LOWER_BOUND = 2;
const FORMAT_ELEMENTS_UPPER_BOUND = 3;
const FORMAT_INDEX_NAME = 0;
const FORMAT_INDEX_MONOTYPE = 1;
const FORMAT_INDEX_RANK = 2;
const FORMAT_INDEX_RANK_ALTERNATE = 1;
/**
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank) => isNil(rank) ? RANK_DEFAULT : rank;
/**
 * Determines the data stored in a format line.
 *
 * @public
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
const splitFormatLineData = (formatLine) => {
    const split = formatLine.split(FORMAT_DELIMITER);
    if (split.length < FORMAT_ELEMENTS_LOWER_BOUND ||
        split.length > FORMAT_ELEMENTS_UPPER_BOUND) {
        throw new Error(`Not a valid format: '${formatLine}', expecting between ${FORMAT_ELEMENTS_LOWER_BOUND} and ${FORMAT_ELEMENTS_UPPER_BOUND} sub-elements but got ${split.length}.`);
    }
    const name = split[FORMAT_INDEX_NAME];
    let monotype;
    let rank;
    if (split.length === FORMAT_ELEMENTS_UPPER_BOUND) {
        monotype = split[FORMAT_INDEX_MONOTYPE];
        rank = split[FORMAT_INDEX_RANK];
    } else {
        monotype = null;
        rank = split[FORMAT_INDEX_RANK_ALTERNATE];
    }
    return { name, rank, monotype };
};
/**
 * Joins the sub-elements of a format back together.
 *
 * @public
 * @param format Format to use.
 * @return Joined format.
 */
const joinFormatLineData = (format) => arrCompact([format.name, format.monotype, normalizeRank(format.rank)]).join(FORMAT_DELIMITER);
/**
 * Creates a merged list from a full list of formats.
 *
 * @public
 * @param formats Format data to use.
 * @return List of combined formats.
 */
const createCombinedFormats = (formats) => arrMergingCollect(formats, val => val.name, ({ name }) => {
    return {
        name,
        ranks: [],
        monotype: []
    };
}, ({ name, rank, monotype }, combinedElement) => {
    rank = normalizeRank(rank);
    if (!combinedElement.ranks.includes(rank)) {
        combinedElement.ranks.push(rank);
    }
    if (!isNil(monotype) &&
        !combinedElement.monotype.includes(monotype)) {
        combinedElement.monotype.push(monotype);
    }
});
/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
const mapFormats = (formatLines) => {
    const full = formatLines.map(splitFormatLineData);
    const combined = createCombinedFormats(full);
    return { full, combined };
};

const TIMEFRAME_DELIMITER = "-";
const TIMEFRAME_ELEMENTS = 2;
const TIMEFRAME_INDEX_YEAR = 0;
const TIMEFRAME_INDEX_MONTH = 1;
/**
 * Determines the data stored in a timeframe line.
 *
 * @public
 * @param timeframeLine Timeframe line to check.
 * @return Object containing year and months.
 */
const splitTimeframeLineData = (timeframeLine) => {
    const split = timeframeLine.split(TIMEFRAME_DELIMITER);
    if (split.length !== TIMEFRAME_ELEMENTS) {
        throw new Error(`Not a valid timeframe: '${timeframeLine}', expecting exactly ${TIMEFRAME_ELEMENTS} sub-elements but got ${split.length}.`);
    }
    return {
        year: split[TIMEFRAME_INDEX_YEAR],
        month: split[TIMEFRAME_INDEX_MONTH]
    };
};
/**
 * Joins the sub-elements of a timeframe back together.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe.
 */
const joinTimeframeLineData = (timeframe) => [timeframe.year, timeframe.month].join(TIMEFRAME_DELIMITER);
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
const createCombinedTimeframes = (timeframes) => arrMergingCollect(timeframes, timeframe => timeframe.year, ({ year }) => {
    return { year, months: [] };
}, ({ year, month }, combinedElement) => {
    if (!combinedElement.months.includes(month)) {
        combinedElement.months.push(month);
    }
});
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
const mapTimeframes = (timeframeLines) => {
    const full = timeframeLines.map(splitTimeframeLineData);
    const combined = createCombinedTimeframes(full);
    return { combined, full };
};

/**
 * Off-brand path.join().
 *
 * @private
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args) => args.join("/");
/**
 * Simple helper to throw exceptions for non-success status codes.
 *
 * @private
 * @param res Fetch Response
 * @return Fetch response.
 */
const checkStatus = (res) => {
    if (!res.ok) {
        throw new Error(`Error while fetching '${res.url}': ${res.statusText} (${res.status}).`);
    }
    return res;
};

const URL_BASE = "https://www.smogon.com";
const URL_PATH_STATS = "stats";
const URL_STATS = urlJoin(URL_BASE, URL_PATH_STATS);

/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    setSubFolder(subFolder) {
        this.subFolder = subFolder;
        return this;
    }

    setExtension(extension) {
        this.extension = extension;
        return this;
    }

    setTimeframe(timeframe) {
        this.timeframe = timeframe;
        return this;
    }

    setFormat(format) {
        this.format = format;
        return this;
    }

    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    build() {
        let folderUrl = URL_STATS;
        if (!isNil(this.timeframe)) {
            folderUrl = urlJoin(folderUrl, joinTimeframeLineData(this.timeframe));
        }
        if (!isNil(this.format) && !isNil(this.format.monotype)) {
            folderUrl = urlJoin(folderUrl, "monotype" /* MONOTYPE */);
        }
        if (!isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }
        if (!isNil(this.format)) {
            let fileName = joinFormatLineData(this.format);
            if (!isNil(this.extension)) {
                fileName += "." + this.extension;
            }
            return urlJoin(folderUrl, fileName);
        }
        return folderUrl;
    }
}

/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe, format) => fetch(new UrlBuilder()
    .setSubFolder("chaos" /* CHAOS */)
    .setExtension("json" /* JSON */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .build())
    .then(checkStatus)
    .then(res => res.json());

/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (isRegExp(seq)) {
        return str.replace(seq, "");
    }
    if (!str.includes(seq)) {
        return str;
    }
    return str.substr(0, str.lastIndexOf(seq));
};
/**
 * Removes trailing slashes from a string.
 *
 * @private
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str) => removeTrailing(str, "/");
/**
 * Removes file extension from a string
 *
 * @private
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str) => removeTrailing(str, /\..+$/);
/**
 * Checks if a file name is a directory.
 *
 * @private
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str) => !str.endsWith("/");
/**
 * Checks if the string is blank (no non-space content).
 *
 * @private
 * @param str String to check.
 *  @return If the file is blank.
 */
const isBlank = (str) => isEmpty(str.trim());

const PARENT_DIRECTORY_LINK = "../";
const DIRECTORY_LINK_SELECTOR = "pre a";
/**
 * Parses a list of links from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseApacheDirectoryListing = (html) => {
    const $ = load(html);
    return $(DIRECTORY_LINK_SELECTOR)
        .map((i, el) => $(el).text()) // Only use link text
        .get()
        .filter(text => text !== PARENT_DIRECTORY_LINK); // Filter out link to parent directory;
};

/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
const parseFormatsPage = (html) => mapFormats(parseApacheDirectoryListing(html)
    .filter(isFile)
    .map(removeExtension));

/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
 * @return List of formats.
 */
const fetchFormats = async (timeframe, useMonotype = false) => {
    const urlBuilder = new UrlBuilder();
    urlBuilder.setTimeframe(timeframe);
    if (useMonotype) {
        urlBuilder.setSubFolder("monotype" /* MONOTYPE */);
    }
    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then(res => res.text())
        .then(parseFormatsPage);
};

const createNotFoundErr = (regex, str) => new Error(`Could not find match for '${regex}' in '${str}'.`);
/**
 * Matches a regex and gets the group match by its group index.
 *
 * @private
 * @param str String to use.
 * @param regex Regex to match.
 * @param groupIndex Index to get.
 * @return The group result.
 * @throws when the regex does not match or the group is not found.
 */
const getMatchGroup = (str, regex, groupIndex) => {
    if (!regex.test(str)) {
        throw createNotFoundErr(regex, str);
    }
    const match = str.match(regex);
    if (isNil(match) || isNil(match[groupIndex])) {
        throw createNotFoundErr(regex, str);
    }
    return match[groupIndex];
};

const PERCENTAGE_UNIT = "%";
/**
 * Converts a string by its identity, not modifying it at all.
 *
 * @private
 * @param str String to use.
 * @return Same string as provided as parameter.
 */
const convertIdentity = (str) => str;
/**
 * Converts a string in the format "123" to a number.
 *
 * @private
 * @param str String to use.
 * @return Number.
 */
const convertNumber = (str) => Number(str);
/**
 * Converts a string in the format "123%" to a number.
 *
 * @private
 * @param str String to use.
 * @return Frequency number.
 */
const convertFrequency = (str) => Number(removeTrailing(str, PERCENTAGE_UNIT));
/**
 * Converts a line in the format "foo 12%" to a pair of name and frequency.
 *
 * @private
 * @param str String to use.
 * @param paddingRegex Optional regex to use for padding checking.
 * @return Frequency pair.
 */
const convertFrequencyPair = (str, paddingRegex = /(\s+)\d/) => {
    const padding = getMatchGroup(str, paddingRegex, 0);
    const splitStr = str.split(padding);
    return [splitStr[0].trim(), convertFrequency(splitStr[1])];
};

const CELL_DELIMITER = "|";
const TABLE_HEADER_ROW_INDEX = 1;
const TABLE_DATA_ROW_START_INDEX = 3;
const TABLE_DATA_ROW_END_OFFSET = 1;
/**
 * Parses a single markdown table row and returns the values.
 *
 * @private
 * @param row Markdown table row.
 * @return Values of the row.
 */
const parseTableRow = (row) => arrCompact(row.split(CELL_DELIMITER).map(str => str.trim()));
// noinspection SpellCheckingInspection
/**
 * A simple markdown table parser. Designed for a markdown table with a header,
 * containing any amount of rows and columns.
 *
 * @private
 * @param table Markdown table.
 * @return Object containing the table data.
 * @example
 * const table = `+ ---- + ------------------ + --------- + ------ + ------- + ------ + ------- +
 *                | Rank | Pokemon            | Usage %   | Raw    | %       | Real   | %       |
 *                + ---- + ------------------ + --------- + ------ + ------- + ------ + ------- +
 *                | 1    | Skarmory           | 19.96100% | 2252   | 19.961% | 1743   | 21.008% |
 *                | 2    | Gengar             | 19.01259% | 2145   | 19.013% | 1541   | 18.574% |
 *                | 3    | Suicune            | 14.02234% | 1582   | 14.022% | 1165   | 14.042% |
 *                | 4    | Victini            | 13.91597% | 1570   | 13.916% | 1172   | 14.126% |
 *                | 5    | Lucario            | 13.42847% | 1515   | 13.428% | 1073   | 12.933% |
 *                + ---- + ------------------ + --------- + ------ + ------- + ------ + ------- +`;
 *
 * const tableJSON = parseMarkdownTable(str);
 *
 * tableJSON === {
 *     header: ["Rank", "Pokemon", "Usage %", "Raw", "%", "Real", "%"],
 *     rows: [
 *         ["1", "Skarmory", "19.96100%", "2252", "19.961%", "1743", "21.008%"],
 *         ["2", "Gengar",   "19.01259%", "2145", "19.013%", "1541", "18.574%"],
 *         ["3", "Suicune",  "14.02234%", "1582", "14.022%", "1165", "14.042%"],
 *         ["4", "Victini",  "13.91597%", "1570", "13.916%", "1172", "14.126%"],
 *         ["5", "Lucario",  "13.42847%", "1515", "13.428%", "1073", "12.933%"]
 *     ]
 * }
 */
const parseMarkdownTable = (table) => {
    const rows = table.split("\n");
    const headerRow = rows[TABLE_HEADER_ROW_INDEX];
    const dataRows = rows.slice(TABLE_DATA_ROW_START_INDEX, rows.length - 1 - TABLE_DATA_ROW_END_OFFSET);
    return {
        header: parseTableRow(headerRow),
        rows: dataRows.map(parseTableRow)
    };
};

/**
 * Parses a smogon markdown table.
 *
 * @private
 * @param table Table to parse.
 * @param currentTableLayout Layout to parse by.
 * @return Parsed table.
 */
const parseSmogonTable = (table, currentTableLayout) => {
    const tableData = parseMarkdownTable(table);
    const columnLength = tableData.header.length;
    if (columnLength !== currentTableLayout.length) {
        throw new Error(`Table does not have the right amount of columns: '${columnLength}' instead of '${currentTableLayout.length}'.`);
    }
    return {
        header: currentTableLayout.map(layoutRow => layoutRow.name),
        rows: tableData.rows.map(row => row.map((field, i) => currentTableLayout[i].converter(field)))
    };
};

const HEADER_NAME_POKEMON = "Pokemon";
const HEADER_NAME_USAGE_PERCENTAGE = "Usage Percentage";
const HEADER_NAME_USAGE_RAW = "Usage Raw";
const HEADER_NAME_USAGE_RAW_PERCENTAGE = "Usage Raw Percentage";
const HEADER_NAME_USAGE_REAL = "Usage Real";
const HEADER_NAME_USAGE_REAL_PERCENTAGE = "Usage Real Percentage";
const HEADER_NAME_RANK = "Rank";

const LEADS_TOTAL_ROW_INDEX = 0;
const LEADS_TABLE_ROW_OFFSET = 1;
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;
const LEADS_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency
    }
];
/**
 * Parses a smogon leads page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseLeadsPage = (page) => {
    const rows = page.split("\n");
    const totalRow = rows[LEADS_TOTAL_ROW_INDEX];
    const tableRows = rows.slice(LEADS_TABLE_ROW_OFFSET);
    return {
        total: convertNumber(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), LEADS_TABLE_LAYOUT)
    };
};

/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Leads data.
 */
const fetchLeads = async (timeframe, format) => fetch(new UrlBuilder()
    .setSubFolder("leads" /* LEADS */)
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .build())
    .then(checkStatus)
    .then(res => res.text())
    .then(parseLeadsPage);

const STALLINESS_MEAN_REGEX = / Stalliness \(mean: (-?[\d.]+)/;
const STALLINESS_ONE_REGEX = / one # = {2}(-?[\d.]+%)/;
/**
 * Parses a smogon metagame page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseMetagamePage = (page) => {
    const rows = page.split("\n");
    const separatorIndex = rows.findIndex(isBlank);
    if (separatorIndex === -1) {
        throw new Error("Could not parse Metagame page.");
    }
    const styleRows = rows.slice(0, separatorIndex);
    const stallinessMeanRow = rows[separatorIndex + 1];
    const stallinessOneRow = rows[rows.length - 2];
    return {
        style: styleRows.map(row => convertFrequencyPair(row, /(\.+\s*)\d/)),
        stalliness: {
            mean: convertNumber(getMatchGroup(stallinessMeanRow, STALLINESS_MEAN_REGEX, 1)),
            one: convertFrequency(getMatchGroup(stallinessOneRow, STALLINESS_ONE_REGEX, 1))
        }
    };
};

/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Metagame data.
 */
const fetchMetagame = async (timeframe, format) => fetch(new UrlBuilder()
    .setSubFolder("metagame" /* METAGAME */)
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .build())
    .then(checkStatus)
    .then(res => res.text())
    .then(parseMetagamePage);

/**
 * Loads moveset data for the given timeframe and format.
 *
 * This is identical to {@link fetchChaos}, as the data they contain are the same, just in different formats.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Moveset data.
 */
const fetchMoveset = fetchChaos;

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html) => mapTimeframes(parseApacheDirectoryListing(html).map(removeTrailingSlash));

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
const fetchTimeframes = async () => fetch(new UrlBuilder().build())
    .then(checkStatus)
    .then(res => res.text())
    .then(parseTimeframesPage);

const USAGE_TOTAL_ROW_INDEX = 0;
const USAGE_WEIGHT_ROW_INDEX = 1;
const USAGE_TABLE_ROW_OFFSET = 2;
const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;
const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;
const USAGE_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency
    },
    { name: HEADER_NAME_USAGE_REAL, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_REAL_PERCENTAGE,
        converter: convertFrequency
    }
];
/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseUsagePage = (page) => {
    const rows = page.split("\n");
    const totalRow = rows[USAGE_TOTAL_ROW_INDEX];
    const weightRow = rows[USAGE_WEIGHT_ROW_INDEX];
    const tableRows = rows.slice(USAGE_TABLE_ROW_OFFSET);
    return {
        total: convertNumber(getMatchGroup(totalRow, USAGE_TOTAL_REGEX, 1)),
        weight: convertNumber(getMatchGroup(weightRow, USAGE_WEIGHT_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), USAGE_TABLE_LAYOUT)
    };
};

/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Usage data.
 */
const fetchUsage = async (timeframe, format) => fetch(new UrlBuilder()
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .build())
    .then(checkStatus)
    .then(res => res.text())
    .then(parseUsagePage);

export {
    createCombinedFormats,
    createCombinedTimeframes,
    fetchChaos,
    fetchFormats,
    fetchLeads,
    fetchMetagame,
    fetchMoveset,
    fetchTimeframes,
    fetchUsage,
    joinFormatLineData,
    joinTimeframeLineData,
    splitFormatLineData,
    splitTimeframeLineData
};
