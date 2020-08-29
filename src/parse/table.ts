import { compact } from "lodash";

/**
 * @private
 */
interface TableData {
    header: string[];
    rows: string[][];
}

/**
 * @private
 */
const CELL_DELIMITER = "|";

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
    const headerRowIndex = 1;
    const dataRowStartIndex = 3;
    const dataRowEndOffset = 1;

    const rows = table.split("\n");
    const headerRow = rows[headerRowIndex];
    const dataRows = rows.slice(
        dataRowStartIndex,
        rows.length - 1 - dataRowEndOffset
    );

    return {
        header: parseTableRow(headerRow),
        rows: dataRows.map(parseTableRow),
    };
};

/**
 * @private
 */
interface SmogonTableLayoutRow {
    name: string;
    converter: (str: string) => string | number;
}

/**
 * @private
 */
interface SmogonTable {
    header: string[];
    rows: Array<Array<number | string>>;
}

/**
 * @private
 */
type SmogonTableLayout = SmogonTableLayoutRow[];

/**
 * Parses a smogon markdown table.
 *
 * @private
 * @param table Table to parse.
 * @param currentTableLayout Layout to parse by.
 * @return Parsed table.
 */
const parseSmogonTable = (
    table: string,
    currentTableLayout: SmogonTableLayout
): SmogonTable => {
    const tableData = parseMarkdownTable(table);

    const columnLength = tableData.header.length;
    if (columnLength !== currentTableLayout.length) {
        throw new Error(
            `Table does not have the right amount of columns: '${columnLength}' instead of '${currentTableLayout.length}'.`
        );
    }

    return {
        header: currentTableLayout.map((layoutRow) => layoutRow.name),
        rows: tableData.rows.map((row) =>
            row.map((field, i) => currentTableLayout[i].converter(field))
        ),
    };
};

export { parseSmogonTable, SmogonTable, SmogonTableLayout };
