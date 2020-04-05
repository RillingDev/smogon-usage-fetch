interface MultiTimeframeData {
    combined: CombinedTimeframeData[];
    full: TimeframeData[];
}
interface CombinedTimeframeData {
    year: string;
    months: string[];
}
interface TimeframeData {
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
declare const splitTimeframeDataLine: (timeframeLine: string) => TimeframeData;
/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
declare const joinTimeframeDataLine: (timeframe: TimeframeData) => string;
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
declare const createCombinedTimeframes: (timeframes: TimeframeData[]) => CombinedTimeframeData[];
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
declare const mapTimeframes: (timeframeLines: string[]) => MultiTimeframeData;
export { splitTimeframeDataLine, joinTimeframeDataLine, mapTimeframes, createCombinedTimeframes, MultiTimeframeData, CombinedTimeframeData, TimeframeData, };
//# sourceMappingURL=timeframe.d.ts.map