import { ITimeframeData } from "../timeframe";
interface ITimeframesData {
    combined: ICombinedTimeframeData[];
    full: ITimeframeData[];
}
interface ICombinedTimeframeData {
    year: string;
    months: string[];
}
/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
declare const parseTimeframesPage: (html: string) => ITimeframesData;
export { parseTimeframesPage, ITimeframesData, ICombinedTimeframeData };
