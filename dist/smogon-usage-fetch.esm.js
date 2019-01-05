import fetch from 'node-fetch';
import { load } from 'cheerio';
import { isRegExp, arrCompact, isNil } from 'lightdash';

/**
 * Off-brand path.join().
 *
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args) => args.join("/");

const URL_BASE = "http://www.smogon.com";
const URL_PATH_STATS = "stats";
const URL_STATS = urlJoin(URL_BASE, URL_PATH_STATS);

/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseList = (html) => {
    const $ = load(html);
    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter Link to previous directory
        .map((i, el) => $(el).text()) // Only use link text
        .get();
};

/**
 * Removes trailing sequences from a string.
 *
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (isRegExp(seq)) {
        return str.replace(seq, "");
    }
    return str.includes(seq) ? str.substr(0, str.lastIndexOf(seq)) : str;
};
/**
 * Removes trailing slashes from a string.
 *
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str) => removeTrailing(str, "/");
/**
 * Removes file extension from a string
 *
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str) => removeTrailing(str, /\..+$/);
/**
 * Checks if a file name is a directory.
 *
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str) => !str.endsWith("/");

/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
const fetchTimeframes = async () => fetch(urlJoin(URL_STATS))
    .then(res => res.text())
    .then(html => parseList(html).map(removeTrailingSlash));

/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @return List of format names.
 */
const fetchFormats = async (timeframe) => fetch(urlJoin(URL_STATS, timeframe))
    .then(res => res.text())
    .then(html => parseList(html)
    .filter(isFile)
    .map(removeExtension));

const URL_PATH_CHAOS = "chaos";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe, format) => fetch(urlJoin(URL_STATS, timeframe, URL_PATH_CHAOS, `${format}.json`)).then(res => res.json());

/**
 * Parses a single markdown table row and returns the values.
 *
 * @private
 * @param row Markdown table row.
 * @return Values of the row.
 */
const parseTableRow = (row) => arrCompact(row.split("|").map(str => str.trim()));
/**
 * A simple markdown table parser. Designed for a markdown table with a header, containing any amount of rows and columns.
 *
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
 * Gets a group match as a number.
 *
 * @param str String to use.
 * @param regex Regex to match.
 * @param groupIndex Index to get.
 * @return The non-NaN group result number.
 * @throws when the group is not found or cannot be converted.
 */
const getGroupMatchAsNumber = (str, regex, groupIndex) => {
    const errNotFound = new Error(`Could not find match for '${regex}' in '${str}'.`);
    if (!regex.test(str)) {
        throw errNotFound;
    }
    const match = str.match(regex);
    if (isNil(match) || isNil(match[groupIndex])) {
        throw errNotFound;
    }
    const num = Number(match[groupIndex]);
    if (Number.isNaN(num)) {
        throw errNotFound;
    }
    return num;
};

const PERCENTAGE_UNIT = "%";
const HEADER_NAMES = [
    "Rank",
    "Pokemon",
    "Usage Percentage",
    "Usage Raw",
    "Usage Raw Percentage",
    "Usage Real",
    "Usage Real Percentage"
];
const TOTAL_REGEX = /Total battles: (\d+)/;
const WEIGHT_REGEX = /Avg\. weight\/team: ([\d.]+)/;
/**
 * Converts a row of usage data into a nicer format.
 *
 * @private
 * @param row Row to convert.
 * @return Row with values converted.
 */
const convertRow = (row) => [
    Number(row[0 /* RANK */]),
    row[1 /* POKEMON */],
    Number(removeTrailing(row[2 /* USAGE_PERCENTAGE */], PERCENTAGE_UNIT)),
    Number(row[3 /* USAGE_RAW */]),
    Number(removeTrailing(row[4 /* USAGE_RAW_PERCENTAGE */], PERCENTAGE_UNIT)),
    Number(row[5 /* USAGE_REAL */]),
    Number(removeTrailing(row[6 /* USAGE_REAL_PERCENTAGE */], PERCENTAGE_UNIT))
];
/**
 * Parses a smogon usage markdown table.
 *
 * @param table Table to parse.
 * @return Parsed table.
 */
const parseUsageTable = (table) => {
    const tableData = parseTable(table);
    const columnLength = tableData.header.length;
    if (columnLength !== HEADER_NAMES.length) {
        throw new Error(`Table does not have the right amount of columns (${columnLength} instead of ${HEADER_NAMES.length})!`);
    }
    return {
        header: Array.from(HEADER_NAMES),
        rows: tableData.rows.map(convertRow)
    };
};
/**
 * Parses a smogon usage page.
 *
 * @param page Page to parse.
 * @return parsed page.
 */
const parseUsagePage = (page) => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const weightRow = rows[1];
    const tableRows = rows.slice(2);
    return {
        total: getGroupMatchAsNumber(totalRow, TOTAL_REGEX, 1),
        weight: getGroupMatchAsNumber(weightRow, WEIGHT_REGEX, 1),
        data: parseUsageTable(tableRows.join("\n"))
    };
};

/**
 * Loads usage data for the given timeframe and format.
 *
 * @return Usage data.
 */
const fetchUsage = async (timeframe, format) => fetch(urlJoin(URL_STATS, timeframe, `${format}.txt`))
    .then(res => res.text())
    .then(parseUsagePage);

export { fetchTimeframes, fetchFormats, fetchUsage, fetchChaos };