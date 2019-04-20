interface ISmogonTableLayoutRow {
    name: string;
    converter: (str: string) => string | number;
}
interface ISmogonTableData {
    header: string[];
    rows: Array<Array<number | string>>;
}
declare type smogonTableLayout = ISmogonTableLayoutRow[];
/**
 * Parses a smogon markdown table.
 *
 * @private
 * @param table Table to parse.
 * @param currentTableLayout Layout to parse by.
 * @return Parsed table.
 */
declare const parseSmogonTable: (table: string, currentTableLayout: ISmogonTableLayoutRow[]) => ISmogonTableData;
export { parseSmogonTable, ISmogonTableData, smogonTableLayout };
