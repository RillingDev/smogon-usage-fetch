import { removeEnd, removeStart } from "lightdash";

/**
 * @private
 */
interface Table {
    header: string[];
    rows: string[][];
}

/**
 * @private
 */
const CELL_DELIMITER = "|";

/**
 * @private
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
 * @private
 * @param rowString Markdown table row.
 * @param colsPerRow Expected count of cols per row.
 * @return Values of the row.
 */
const parseTableRow = (rowString: string, colsPerRow?: number): string[] => {
    const rowWithoutLeadingOrTrailingDelimiter = removeEnd(
        removeStart(rowString.trim(), CELL_DELIMITER),
        CELL_DELIMITER
    );
    const row = rowWithoutLeadingOrTrailingDelimiter
        .trim()
        .split(CELL_DELIMITER)
        .map((str) => str.trim());
    assertColCount(row, colsPerRow);
    return row;
};

/**
 * A simple markdown table parser. Designed for a markdown table with a header,
 * containing any amount of rows and columns.
 *
 * @private
 * @param table Markdown table.
 * @param colsPerRow Expected count of cols per row.
 * @return Object containing the table data.
 */
export const parseMarkdownTable = (
    table: string,
    colsPerRow?: number
): Table => {
    const headerRowIndex = 1;
    const dataRowStartIndex = 3;
    const dataRowEndOffset = 1;

    const rowsStrings = table.split("\n");
    const headerRowString = rowsStrings[headerRowIndex];
    const dataRowStrings = rowsStrings.slice(
        dataRowStartIndex,
        rowsStrings.length - 1 - dataRowEndOffset
    );

    return {
        header: parseTableRow(headerRowString, colsPerRow),
        rows: dataRowStrings.map((rowString) =>
            parseTableRow(rowString, colsPerRow)
        ),
    };
};
