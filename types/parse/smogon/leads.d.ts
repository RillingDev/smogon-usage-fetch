import { ISmogonTableData } from "./table";
interface ILeadsPageData {
    total: number;
    data: ISmogonTableData;
}
/**
 * Parses a smogon leads page.
 *
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseLeadsPage: (page: string) => ILeadsPageData;
export { parseLeadsPage, ILeadsPageData };
