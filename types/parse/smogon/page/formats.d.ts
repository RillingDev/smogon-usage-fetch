import { IFormatsData } from "../format";
/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
declare const parseFormatsPage: (html: string) => IFormatsData;
export { parseFormatsPage };
