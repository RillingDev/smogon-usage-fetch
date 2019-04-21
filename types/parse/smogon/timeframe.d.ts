interface ITimeframesData {
    combined: ICombinedTimeframeData[];
    full: ITimeframeData[];
}
interface ICombinedTimeframeData {
    year: string;
    months: string[];
}
interface ITimeframeData {
    year: string;
    month: string;
}
/**
 * Determines the timeframe data stored in a line.
 *
 * @public
 * @param timeframeLine Timeframe data line to check.
 * @return Object containing year and months.
 */
declare const splitTimeframeDataLine: (timeframeLine: string) => ITimeframeData;
/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
declare const joinTimeframeDataLine: (timeframe: ITimeframeData) => string;
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
declare const createCombinedTimeframes: (timeframes: ITimeframeData[]) => ICombinedTimeframeData[];
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
declare const mapTimeframes: (timeframeLines: string[]) => ITimeframesData;
export { splitTimeframeDataLine, joinTimeframeDataLine, mapTimeframes, createCombinedTimeframes, ITimeframesData, ICombinedTimeframeData, ITimeframeData };
