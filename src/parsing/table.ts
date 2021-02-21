import { removeEnd, removeStart } from "lightdash";

/**
 * @internal
 */
interface Table {
    header: string[];
    rows: string[][];
}

/**
 * @internal
 */
const assertColCount = (row: unknown[], colsPerRow?: number): void => {
    if (colsPerRow != null && row.length !== colsPerRow) {
        throw new Error(
            `Table does not have the right amount of columns: found ${
                row.length
            } but expected ${colsPerRow}: ${JSON.stringify(row)}`
        );
    }
};

/**
 * Parses a single markdown table row and returns the values.
 *
 * @internal
 * @param rowString Markdown table row.
 * @param colsPerRow Expected count of cols per row.
 * @return Values of the row.
 */
const parseTableRow = (rowString: string, colsPerRow?: number): string[] => {
    const delimiterChar = "|";
    const rowWithoutLeadingOrTrailingDelimiter = removeEnd(
        removeStart(rowString.trim(), delimiterChar),
        delimiterChar
    );
    const row = rowWithoutLeadingOrTrailingDelimiter
        .trim()
        .split(delimiterChar)
        .map((str) => str.trim());
    assertColCount(row, colsPerRow);
    return row;
};

/**
 * @internal
 */
const getTableDataRows = (lines: string[]): string[] => {
    const maxIndex = lines.length - 1;
    return lines.slice(
        3, // The 3 rows before are the header and 2 delimiter rows.
        maxIndex - 1 // The last row is another delimiter.
    );
};

/**
 * @internal
 */
const getTableHeaderRow = (lines: string[]): string => lines[1]; // Accounts for leading delimiting row.

/**
 * A simple markdown table parser. Designed for a markdown table with a header,
 * containing any amount of rows and columns.
 *
 * @internal
 * @param table Markdown table.
 * @param colsPerRow Expected count of cols per row.
 * @return Object containing the table data.
 */
export const parseMarkdownTable = (
    table: string,
    colsPerRow?: number
): Table => {
    const lines = table.split("\n");
    return {
        header: parseTableRow(getTableHeaderRow(lines), colsPerRow),
        rows: getTableDataRows(lines).map((rowString) =>
            parseTableRow(rowString, colsPerRow)
        ),
    };
};
