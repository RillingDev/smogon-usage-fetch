declare const enum HeaderPrettyName {
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
interface ISmogonTableData {
    header: string[];
    rows: Array<number | string>[];
}
declare type tableLayout = ITableLayoutRow[];
/**
 * Parses a smogon markdown table.
 *
 * @private
 * @param table Table to parse.
 * @param currentTableLayout Layout to parse by.
 * @return Parsed table.
 */
declare const parseSmogonTable: (table: string, currentTableLayout: ITableLayoutRow[]) => ISmogonTableData;
export { parseSmogonTable, HeaderPrettyName, ISmogonTableData, tableLayout };
