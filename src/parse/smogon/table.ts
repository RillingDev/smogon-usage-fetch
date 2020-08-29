import { parseMarkdownTable } from "../table";

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
