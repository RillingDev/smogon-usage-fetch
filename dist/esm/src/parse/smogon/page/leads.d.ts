import { SmogonTableData } from "../table";
interface LeadsData {
    total: number;
    data: SmogonTableData;
}
/**
 * Parses a smogon leads page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseLeadsPage: (page: string) => LeadsData;
export { parseLeadsPage, LeadsData };
//# sourceMappingURL=leads.d.ts.map