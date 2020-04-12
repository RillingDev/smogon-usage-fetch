'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash = require('lodash');
var cheerio = require('cheerio');
var axios = _interopDefault(require('axios'));

/**
 * Checks if the string is blank (no non-space content).
 *
 * @since 11.0.0
 * @category Is
 * @param str String to use.
 * @returns If the file is blank.
 * @example
 * isBlank("")
 * // => true
 *
 * isBlank("  ")
 * // => true
 *
 * isBlank(" foo ")
 * // => false
 */
const isBlank = (str) => lodash.isEmpty(str.trim());

/**
 * Collects elements in an array into a an array of merged elements.
 *
 * @since 11.0.0
 * @category Array
 * @param collection Collection to group.
 * @param keyProducer Function returning the key for the value.
 * @param initializer Function initializing a new mergable object.
 * @param reducer Consumer mutating the existing object with the new data.
 * @returns Grouped and merged map.
 * @example
 * groupMapReducingBy(
 *     ["foo", "bar", "fizz", "buzz"],
 *     val => val.charAt(0),
 *     () => {
 *        return {
 *            count: 0,
 *            matches: []
 *        };
 *     },
 *     (current, val) => {
 *         current.count++;
 *         current.matches.push(val);
 *         return current;
 *     }
 * )
 * // => Map{"f": {count: 2, matches: ["foo", "fizz"]}, "b": {count: 2, matches: ["bar", "buzz"]}}
 */
const groupMapReducingBy = (collection, keyProducer, initializer, reducer) => {
    const result = new Map();
    lodash.forEach(collection, (value, index) => {
        const key = keyProducer(value, index, collection);
        if (!result.has(key)) {
            result.set(key, initializer(value, index, collection));
        }
        result.set(key, reducer(result.get(key), value, index, collection));
    });
    return result;
};

/**
 * @private
 */
const RANK_DEFAULT = "0";
/**
 * @private
 */
const FORMAT_DELIMITER = "-";
/**
 * @private
 */
const FORMAT_ELEMENTS_LOWER_BOUND = 2;
/**
 * @private
 */
const FORMAT_ELEMENTS_UPPER_BOUND = 3;
/**
 * @private
 */
const FORMAT_INDEX_NAME = 0;
/**
 * @private
 */
const FORMAT_INDEX_MONOTYPE = 1;
/**
 * @private
 */
const FORMAT_INDEX_RANK = 2;
/**
 * @private
 */
const FORMAT_INDEX_RANK_ALTERNATE = 1;
/**
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank) => lodash.isNil(rank) ? RANK_DEFAULT : rank;
/**
 * Determines the format data stored in a line.
 *
 * @public
 * @param formatLine Format data line to check.
 * @return Object containing name, rank and optional monotype.
 */
const formatFromString = (formatLine) => {
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
    }
    else {
        monotype = null;
        rank = split[FORMAT_INDEX_RANK_ALTERNATE];
    }
    return { name, rank, monotype };
};
/**
 * Joins the sub-elements of format data back in a line.
 *
 * @public
 * @param format Format to use.
 * @return Joined format data line.
 */
const formatToString = (format) => lodash.compact([format.name, format.monotype, normalizeRank(format.rank)]).join(FORMAT_DELIMITER);
/**
 * Creates a merged list from a full list of formats.
 *
 * @public
 * @param formats Format data to use.
 * @return List of combined formats.
 */
const formatAsCombined = (formats) => Array.from(groupMapReducingBy(formats, (val) => val.name, ({ name }) => {
    return {
        name,
        ranks: [],
        monotype: [],
    };
}, (combinedElement, { rank, monotype }) => {
    rank = normalizeRank(rank);
    if (!combinedElement.ranks.includes(rank)) {
        combinedElement.ranks.push(rank);
    }
    if (!lodash.isNil(monotype) &&
        !combinedElement.monotype.includes(monotype)) {
        combinedElement.monotype.push(monotype);
    }
    return combinedElement;
}).values());
/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
const mapFormats = (formatLines) => {
    const full = formatLines.map(formatFromString);
    const combined = formatAsCombined(full);
    return { full, combined };
};

/**
 * @private
 */
const TIMEFRAME_DELIMITER = "-";
/**
 * @private
 */
const TIMEFRAME_ELEMENTS = 2;
/**
 * @private
 */
const TIMEFRAME_INDEX_YEAR = 0;
/**
 * @private
 */
const TIMEFRAME_INDEX_MONTH = 1;
/**
 * Determines the timeframe data stored in a line.
 *
 * @public
 * @param timeframeLine Timeframe data line to check.
 * @return Object containing year and months.
 */
const timeframeFromString = (timeframeLine) => {
    const split = timeframeLine.split(TIMEFRAME_DELIMITER);
    if (split.length !== TIMEFRAME_ELEMENTS) {
        throw new Error(`Not a valid timeframe: '${timeframeLine}', expecting exactly ${TIMEFRAME_ELEMENTS} sub-elements but got ${split.length}.`);
    }
    return {
        year: split[TIMEFRAME_INDEX_YEAR],
        month: split[TIMEFRAME_INDEX_MONTH],
    };
};
/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
const timeframeToString = (timeframe) => [timeframe.year, timeframe.month].join(TIMEFRAME_DELIMITER);
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
const timeframeAsCombined = (timeframes) => Array.from(groupMapReducingBy(timeframes, (timeframe) => timeframe.year, ({ year }) => {
    return { year, months: [] };
}, (combinedElement, { month }) => {
    if (!combinedElement.months.includes(month)) {
        combinedElement.months.push(month);
    }
    return combinedElement;
}).values());
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
const mapTimeframes = (timeframeLines) => {
    const full = timeframeLines.map(timeframeFromString);
    const combined = timeframeAsCombined(full);
    return { combined, full };
};

/**
 * @private
 */
const DEFAULT_BASE_URL = "https://www.smogon.com/stats";
/**
 * @private
 */
var ApiPath;
(function (ApiPath) {
    ApiPath["MONOTYPE"] = "monotype";
    ApiPath["CHAOS"] = "chaos";
    ApiPath["METAGAME"] = "metagame";
    ApiPath["LEADS"] = "leads";
})(ApiPath || (ApiPath = {}));
/**
 * @private
 */
var FileType;
(function (FileType) {
    FileType["TEXT"] = "txt";
    FileType["JSON"] = "json";
})(FileType || (FileType = {}));
/**
 * Off-brand path.join().
 *
 * @private
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args) => args.join("/");
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    setCustomBaseUrl(customBaseUrlPrefix) {
        this.customBaseUrlPrefix = customBaseUrlPrefix;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setFileType(fileType) {
        this.fileType = fileType;
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
        var _a;
        let url = DEFAULT_BASE_URL;
        if (this.customBaseUrlPrefix != null) {
            // We use string addition instead of urlJoin
            // To give more flexibility over how one wants to prefix
            url = this.customBaseUrlPrefix + url;
        }
        if (this.timeframe != null) {
            url = urlJoin(url, timeframeToString(this.timeframe));
        }
        if (((_a = this.format) === null || _a === void 0 ? void 0 : _a.monotype) != null) {
            url = urlJoin(url, ApiPath.MONOTYPE);
        }
        if (this.path != null) {
            url = urlJoin(url, this.path);
        }
        if (this.format != null) {
            let fileName = formatToString(this.format);
            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }
            return urlJoin(url, fileName);
        }
        return url;
    }
}

/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (lodash.isRegExp(seq)) {
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
 * @private
 */
const PARENT_DIRECTORY_LINK = "../";
/**
 * @private
 */
const DIRECTORY_LINK_SELECTOR = "pre a";
/**
 * Parses a list of links from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseApacheDirectoryListing = (html) => {
    const $ = cheerio.load(html);
    return $(DIRECTORY_LINK_SELECTOR)
        .map((i, el) => $(el).text()) // Only use link text
        .get()
        .filter((text) => text !== PARENT_DIRECTORY_LINK); // Filter out link to parent directory;
};

/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
const parseFormatsPage = (html) => mapFormats(parseApacheDirectoryListing(html).filter(isFile).map(removeExtension));

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
        throw new Error(`Could not find any match for '${regex.source}' in '${str}'.`);
    }
    const match = regex.exec(str);
    if (lodash.isNil(match) || lodash.isNil(match[groupIndex])) {
        throw new Error(`Could not find the match group with index ${groupIndex} for '${regex.source}' in '${str}'.`);
    }
    return match[groupIndex];
};

/**
 * @private
 */
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

/**
 * @private
 */
const CELL_DELIMITER = "|";
/**
 * @private
 */
const TABLE_HEADER_ROW_INDEX = 1;
/**
 * @private
 */
const TABLE_DATA_ROW_START_INDEX = 3;
/**
 * @private
 */
const TABLE_DATA_ROW_END_OFFSET = 1;
/**
 * Parses a single markdown table row and returns the values.
 *
 * @private
 * @param row Markdown table row.
 * @return Values of the row.
 */
const parseTableRow = (row) => lodash.compact(row.split(CELL_DELIMITER).map((str) => str.trim()));
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
        rows: dataRows.map(parseTableRow),
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
        header: currentTableLayout.map((layoutRow) => layoutRow.name),
        rows: tableData.rows.map((row) => row.map((field, i) => currentTableLayout[i].converter(field))),
    };
};

/**
 * @private
 */
const HEADER_NAME_POKEMON = "Pokemon";
/**
 * @private
 */
const HEADER_NAME_USAGE_PERCENTAGE = "Usage Percentage";
/**
 * @private
 */
const HEADER_NAME_USAGE_RAW = "Usage Raw";
/**
 * @private
 */
const HEADER_NAME_USAGE_RAW_PERCENTAGE = "Usage Raw Percentage";
/**
 * @private
 */
const HEADER_NAME_USAGE_REAL = "Usage Real";
/**
 * @private
 */
const HEADER_NAME_USAGE_REAL_PERCENTAGE = "Usage Real Percentage";
/**
 * @private
 */
const HEADER_NAME_RANK = "Rank";

/**
 * @private
 */
const LEADS_TOTAL_ROW_INDEX = 0;
/**
 * @private
 */
const LEADS_TABLE_ROW_OFFSET = 1;
/**
 * @private
 */
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;
/**
 * @private
 */
const LEADS_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency,
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency,
    },
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
        data: parseSmogonTable(tableRows.join("\n"), LEADS_TABLE_LAYOUT),
    };
};

/**
 * @private
 */
const STALLINESS_MEAN_REGEX = / Stalliness \(mean: (-?[\d.]+)/;
/**
 * @private
 */
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
        style: styleRows.map((row) => convertFrequencyPair(row, /(\.+\s*)\d/)),
        stalliness: {
            mean: convertNumber(getMatchGroup(stallinessMeanRow, STALLINESS_MEAN_REGEX, 1)),
            one: convertFrequency(getMatchGroup(stallinessOneRow, STALLINESS_ONE_REGEX, 1)),
        },
    };
};

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html) => mapTimeframes(parseApacheDirectoryListing(html).map(removeTrailingSlash));

/**
 * @private
 */
const USAGE_TOTAL_ROW_INDEX = 0;
/**
 * @private
 */
const USAGE_WEIGHT_ROW_INDEX = 1;
/**
 * @private
 */
const USAGE_TABLE_ROW_OFFSET = 2;
/**
 * @private
 */
const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;
/**
 * @private
 */
const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;
/**
 * @private
 */
const USAGE_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency,
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency,
    },
    { name: HEADER_NAME_USAGE_REAL, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_REAL_PERCENTAGE,
        converter: convertFrequency,
    },
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
        data: parseSmogonTable(tableRows.join("\n"), USAGE_TABLE_LAYOUT),
    };
};

class SmogonApiClient {
    constructor(config = {}) {
        this.config = lodash.defaults(config, {
            customBaseUrl: null,
        });
    }
    /**
     * Loads a list of all available timeframes.
     *
     * @public
     * @return List of timeframe names.
     */
    async fetchTimeframes() {
        const url = this.createUrlBuilder().build();
        return parseTimeframesPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads a list of all available formats for a given timeframe.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
     * @return List of formats.
     */
    async fetchFormats(timeframe, useMonotype = false) {
        const urlBuilder = this.createUrlBuilder();
        urlBuilder.setTimeframe(timeframe);
        if (useMonotype) {
            urlBuilder.setPath(ApiPath.MONOTYPE);
        }
        const url = urlBuilder.build();
        return parseFormatsPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads usage data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Usage data.
     */
    async fetchUsage(timeframe, format) {
        const url = this.createUrlBuilder()
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseUsagePage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads leads data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Leads data.
     */
    async fetchLeads(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.LEADS)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseLeadsPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads metagame data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Metagame data.
     */
    async fetchMetagame(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.METAGAME)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseMetagamePage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads the chaos data for a given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Object containing chaos data.
     */
    async fetchChaos(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.CHAOS)
            .setFileType(FileType.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return await this.request(url, FileType.JSON);
    }
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
    async fetchMoveset(timeframe, format) {
        return this.fetchChaos(timeframe, format);
    }
    createUrlBuilder() {
        const urlBuilder = new UrlBuilder();
        if (this.config.customBaseUrl != null) {
            urlBuilder.setCustomBaseUrl(this.config.customBaseUrl);
        }
        return urlBuilder;
    }
    async request(url, responseType) {
        const requestConfig = {
            timeout: 10000,
        };
        if (responseType == FileType.JSON) {
            requestConfig.responseType = "json";
        }
        else if (responseType === FileType.TEXT) {
            requestConfig.responseType = "text";
        }
        const response = await axios.get(url, requestConfig);
        return response.data;
    }
}

exports.SmogonApiClient = SmogonApiClient;
exports.formatAsCombined = formatAsCombined;
exports.formatFromString = formatFromString;
exports.formatToString = formatToString;
exports.timeframeAsCombined = timeframeAsCombined;
exports.timeframeFromString = timeframeFromString;
exports.timeframeToString = timeframeToString;
//# sourceMappingURL=smogon-usage-fetch.common.js.map
