declare type usageRowData = [number, string, number, number, number, number, number];
interface IUsageTableData {
    header: string[];
    rows: usageRowData[];
}
interface IUsagePageData {
    total: number;
    weight: number;
    data: IUsageTableData;
}
declare const enum RowIndex {
    RANK = 0,
    POKEMON = 1,
    USAGE_PERCENTAGE = 2,
    USAGE_RAW = 3,
    USAGE_RAW_PERCENTAGE = 4,
    USAGE_REAL = 5,
    USAGE_REAL_PERCENTAGE = 6
}
/**
 * Parses a smogon usage markdown table.
 *
 * @param table Table to parse.
 * @return Parsed table.
 */
declare const parseUsageTable: (table: string) => IUsageTableData;
/**
 * Parses a smogon usage page.
 *
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseUsagePage: (page: string) => IUsagePageData;
export { parseUsageTable, parseUsagePage, RowIndex, IUsagePageData, IUsageTableData };
