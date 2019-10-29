import { ISmogonTableData } from "../table";
interface IUsageData {
    total: number;
    weight: number;
    data: ISmogonTableData;
}
/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseUsagePage: (page: string) => IUsageData;
export { parseUsagePage, IUsageData };
//# sourceMappingURL=usage.d.ts.map