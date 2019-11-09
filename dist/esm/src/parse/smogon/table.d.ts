interface SmogonTableLayoutRow {
    name: string;
    converter: (str: string) => string | number;
}
interface SmogonTableData {
    header: string[];
    rows: Array<Array<number | string>>;
}
declare type SmogonTableLayout = SmogonTableLayoutRow[];
/**
 * Parses a smogon markdown table.
 *
 * @private
 * @param table Table to parse.
 * @param currentTableLayout Layout to parse by.
 * @return Parsed table.
 */
declare const parseSmogonTable: (table: string, currentTableLayout: SmogonTableLayout) => SmogonTableData;
export { parseSmogonTable, SmogonTableData, SmogonTableLayout };
//# sourceMappingURL=table.d.ts.map