import { compact } from "lodash";

interface TableData {
    header: string[];
    rows: string[][];
}

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
const parseTableRow = (row: string): string[] =>
    compact(row.split(CELL_DELIMITER).map((str) => str.trim()));

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
const parseMarkdownTable = (table: string): TableData => {
    const rows = table.split("\n");
    const headerRow = rows[TABLE_HEADER_ROW_INDEX];
    const dataRows = rows.slice(
        TABLE_DATA_ROW_START_INDEX,
        rows.length - 1 - TABLE_DATA_ROW_END_OFFSET
    );

    return {
        header: parseTableRow(headerRow),
        rows: dataRows.map(parseTableRow),
    };
};

export { parseMarkdownTable, TableData };
