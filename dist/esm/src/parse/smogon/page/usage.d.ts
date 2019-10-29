import { SmogonTableData } from "../table";
interface UsageData {
    total: number;
    weight: number;
    data: SmogonTableData;
}
/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseUsagePage: (page: string) => UsageData;
export { parseUsagePage, UsageData };
//# sourceMappingURL=usage.d.ts.map