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
 * Determines the data stored in a timeframe line.
 *
 * @public
 * @param timeframeLine Timeframe line to check.
 * @return Object containing year and months.
 */
declare const splitTimeframeLineData: (timeframeLine: string) => ITimeframeData;
/**
 * Joins the sub-elements of a timeframe back together.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe.
 */
declare const joinTimeframeLineData: (timeframe: ITimeframeData) => string;
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
export { splitTimeframeLineData, joinTimeframeLineData, mapTimeframes, createCombinedTimeframes, ITimeframesData, ICombinedTimeframeData, ITimeframeData };
