import { parseTable } from "../table";

const PERCENTAGE_UNIT = "%";

const enum HeaderPrettyName {
    RANK = "Rank",
    POKEMON = "Pokemon",
    USAGE_PERCENTAGE = "Usage Percentage",
    USAGE_RAW = "Usage Raw",
    USAGE_RAW_PERCENTAGE = "Usage Raw Percentage",
    USAGE_REAL = "Usage Real",
    USAGE_REAL_PERCENTAGE = "Usage Real Percentage"
}

interface ITableLayoutRow {
    name: HeaderPrettyName;
    converter: (str: string) => string | number;
}

type tableLayout = ITableLayoutRow[];

interface ISmogonTableData {
    header: string[];
    rows: Array<number | string>[];
}

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
    currentTableLayout: tableLayout
): ISmogonTableData => {
    const tableData = parseTable(table);

    const columnLength = tableData.header.length;
    if (columnLength !== currentTableLayout.length) {
        throw new Error(
            `Table does not have the right amount of columns: '${columnLength}' instead of '${
                currentTableLayout.length
            }'.`
        );
    }

    return {
        header: currentTableLayout.map(layoutRow => layoutRow.name),
        rows: tableData.rows.map(row =>
            row.map((field, i) => currentTableLayout[i].converter(field))
        )
    };
};

export {
    parseSmogonTable,
    PERCENTAGE_UNIT,
    HeaderPrettyName,
    ISmogonTableData,
    tableLayout
};
