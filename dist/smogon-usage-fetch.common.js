'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));
var cheerio = require('cheerio');
var lightdash = require('lightdash');

/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseList = (html) => {
    const $ = cheerio.load(html);
    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter Link to previous directory
        .map((i, el) => $(el).text()) // Only use link text
        .get();
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

/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (lightdash.isRegExp(seq)) {
        return str.replace(seq, "");
    }
    return str.includes(seq) ? str.substr(0, str.lastIndexOf(seq)) : str;
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
const isBlank = (str) => str.trim().length === 0;

const URL_BASE = "http://www.smogon.com";
const URL_PATH_STATS = "stats";
const URL_STATS = urlJoin(URL_BASE, URL_PATH_STATS);

/**
 * Build for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    constructor() { }
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
    setRank(rank) {
        this.rank = rank;
        return this;
    }
    setMonotype(monotype) {
        this.monotype = monotype;
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
        if (!lightdash.isNil(this.timeframe)) {
            folderUrl = urlJoin(folderUrl, this.timeframe);
        }
        if (!lightdash.isNil(this.monotype)) {
            folderUrl = urlJoin(folderUrl, "monotype" /* MONOTYPE */);
        }
        if (!lightdash.isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }
        const fileNameParts = [];
        if (!lightdash.isNil(this.format)) {
            fileNameParts.push(this.format);
        }
        if (!lightdash.isNil(this.monotype)) {
            fileNameParts.push(this.monotype);
        }
        if (!lightdash.isNil(this.rank)) {
            fileNameParts.push(this.rank);
        }
        let fileName = fileNameParts.join("-");
        if (!lightdash.isNil(this.extension)) {
            fileName += "." + this.extension;
        }
        return urlJoin(folderUrl, fileName);
    }
}

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
const fetchTimeframes = async () => fetch(new UrlBuilder().build())
    .then(checkStatus)
    .then(res => res.text())
    .then(html => parseList(html).map(removeTrailingSlash));

/**
 * Creates an empty format data object.
 *
 * @private
 * @return New, empty format data object.
 */
const createFormatData = () => {
    return { ranks: [], monotype: [] };
};
/**
 * Determines the data stored in a format line.
 *
 * @private
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
const determineFormatLineData = (formatLine) => {
    const split = formatLine.split("-");
    if (split.length < 2 || split.length > 3) {
        throw new Error(`Not a valid format: '${formatLine}'.`);
    }
    const name = split[0];
    let monotype;
    let rank;
    if (split.length === 3) {
        monotype = split[1];
        rank = split[2];
    }
    else {
        monotype = null;
        rank = split[1];
    }
    return { name, rank, monotype };
};
/**
 * Maps a list of format lines to a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return List of combined formats.
 */
const mapFormats = (formatLines) => {
    const formats = new Map();
    for (const formatLine of formatLines) {
        const { name, rank, monotype } = determineFormatLineData(formatLine);
        const current = formats.has(name)
            ? formats.get(name)
            : createFormatData();
        current.ranks.push(rank);
        if (!lightdash.isNil(monotype)) {
            current.monotype.push(monotype);
        }
        formats.set(name, current);
    }
    return Array.from(formats.entries());
};

/**
 *Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded, defaults to false.
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
        .then(html => mapFormats(parseList(html)
        .filter(isFile)
        .map(removeExtension)));
};

/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe, format, rank = "0", monotype) => fetch(new UrlBuilder()
    .setSubFolder("chaos" /* CHAOS */)
    .setExtension("json" /* JSON */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .setRank(rank)
    .setMonotype(monotype)
    .build())
    .then(checkStatus)
    .then(res => res.json());

/**
 * Parses a single markdown table row and returns the values.
 *
 * @private
 * @param row Markdown table row.
 * @return Values of the row.
 */
const parseTableRow = (row) => lightdash.arrCompact(row.split("|").map(str => str.trim()));
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
 * const tableJSON = parseTable(str);
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
const parseTable = (table) => {
    const rows = table.split("\n");
    const headerRow = rows[1];
    const dataRows = rows.slice(3, rows.length - 2);
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
    const tableData = parseTable(table);
    const columnLength = tableData.header.length;
    if (columnLength !== currentTableLayout.length) {
        throw new Error(`Table does not have the right amount of columns: '${columnLength}' instead of '${currentTableLayout.length}'.`);
    }
    return {
        header: currentTableLayout.map(layoutRow => layoutRow.name),
        rows: tableData.rows.map(row => row.map((field, i) => currentTableLayout[i].converter(field)))
    };
};

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
    const notFoundErr = new Error(`Could not find match for '${regex}' in '${str}'.`);
    if (!regex.test(str)) {
        throw notFoundErr;
    }
    const match = str.match(regex);
    if (lightdash.isNil(match) || lightdash.isNil(match[groupIndex])) {
        throw notFoundErr;
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

const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;
const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;
const USAGE_TABLE_LAYOUT = [
    { name: "Rank" /* RANK */, converter: convertNumber },
    { name: "Pokemon" /* POKEMON */, converter: convertIdentity },
    {
        name: "Usage Percentage" /* USAGE_PERCENTAGE */,
        converter: convertFrequency
    },
    { name: "Usage Raw" /* USAGE_RAW */, converter: convertNumber },
    {
        name: "Usage Raw Percentage" /* USAGE_RAW_PERCENTAGE */,
        converter: convertFrequency
    },
    { name: "Usage Real" /* USAGE_REAL */, converter: convertNumber },
    {
        name: "Usage Real Percentage" /* USAGE_REAL_PERCENTAGE */,
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
    const totalRow = rows[0];
    const weightRow = rows[1];
    const tableRows = rows.slice(2);
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
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Usage data.
 */
const fetchUsage = async (timeframe, format, rank = "0", monotype) => fetch(new UrlBuilder()
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .setRank(rank)
    .setMonotype(monotype)
    .build())
    .then(checkStatus)
    .then(res => res.text())
    .then(parseUsagePage);

const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;
const LEADS_TABLE_LAYOUT = [
    { name: "Rank" /* RANK */, converter: convertNumber },
    { name: "Pokemon" /* POKEMON */, converter: convertIdentity },
    {
        name: "Usage Percentage" /* USAGE_PERCENTAGE */,
        converter: convertFrequency
    },
    { name: "Usage Raw" /* USAGE_RAW */, converter: convertNumber },
    {
        name: "Usage Raw Percentage" /* USAGE_RAW_PERCENTAGE */,
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
    const totalRow = rows[0];
    const tableRows = rows.slice(1);
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
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Leads data.
 */
const fetchLeads = async (timeframe, format, rank = "0", monotype) => fetch(new UrlBuilder()
    .setSubFolder("leads" /* LEADS */)
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .setRank(rank)
    .setMonotype(monotype)
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
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Metagame data.
 */
const fetchMetagame = async (timeframe, format, rank = "0", monotype) => fetch(new UrlBuilder()
    .setSubFolder("metagame" /* METAGAME */)
    .setExtension("txt" /* TEXT */)
    .setTimeframe(timeframe)
    .setFormat(format)
    .setRank(rank)
    .setMonotype(monotype)
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
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Moveset data.
 */
const fetchMoveset = fetchChaos;

exports.fetchTimeframes = fetchTimeframes;
exports.fetchFormats = fetchFormats;
exports.fetchUsage = fetchUsage;
exports.fetchChaos = fetchChaos;
exports.fetchLeads = fetchLeads;
exports.fetchMetagame = fetchMetagame;
exports.fetchMoveset = fetchMoveset;
