import { ISmogonTableData } from "../table";
interface ILeadsData {
    total: number;
    data: ISmogonTableData;
}
/**
 * Parses a smogon leads page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseLeadsPage: (page: string) => ILeadsData;
export { parseLeadsPage, ILeadsData };
