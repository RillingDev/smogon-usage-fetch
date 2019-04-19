import { IFormatData } from "../format";
interface IFormatsData {
    combined: ICombinedFormatData[];
    full: IFormatData[];
}
interface ICombinedFormatData {
    name: string;
    ranks: string[];
    monotype: string[];
}
/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
declare const parseFormatsPage: (html: string) => IFormatsData;
export { parseFormatsPage, IFormatsData, ICombinedFormatData };
