import { parseMarkdownTable } from "../table";

interface ISmogonTableLayoutRow {
    name: string;
    converter: (str: string) => string | number;
}

interface ISmogonTableData {
    header: string[];
    rows: Array<Array<number | string>>;
}

type smogonTableLayout = ISmogonTableLayoutRow[];

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
    currentTableLayout: smogonTableLayout
): ISmogonTableData => {
    const tableData = parseMarkdownTable(table);

    const columnLength = tableData.header.length;
    if (columnLength !== currentTableLayout.length) {
        throw new Error(
            `Table does not have the right amount of columns: '${columnLength}' instead of '${currentTableLayout.length}'.`
        );
    }

    return {
        header: currentTableLayout.map(layoutRow => layoutRow.name),
        rows: tableData.rows.map(row =>
            row.map((field, i) => currentTableLayout[i].converter(field))
        )
    };
};

export { parseSmogonTable, ISmogonTableData, smogonTableLayout };
