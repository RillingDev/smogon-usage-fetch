declare type timeframesData = string[];
/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
declare const parseTimeframesPage: (html: string) => string[];
export { parseTimeframesPage, timeframesData };
