declare type formatsData = formatDataPair[];
declare type formatDataPair = [string, IFormatData];
interface IFormatData {
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
declare const parseFormatsPage: (html: string) => [string, IFormatData][];
export { parseFormatsPage, formatsData, formatDataPair, IFormatData };
