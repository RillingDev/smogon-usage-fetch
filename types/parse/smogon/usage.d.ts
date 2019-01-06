import { ISmogonTableData } from "./table";
interface IUsagePageData {
    total: number;
    weight: number;
    data: ISmogonTableData;
}
/**
 * Parses a smogon usage page.
 *
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseUsagePage: (page: string) => IUsagePageData;
export { parseUsagePage, IUsagePageData };
