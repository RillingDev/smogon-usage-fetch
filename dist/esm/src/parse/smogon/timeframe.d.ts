interface TimeframeData {
    combined: CombinedTimeframeData[];
    full: IndividualTimeframeData[];
}
interface CombinedTimeframeData {
    year: string;
    months: string[];
}
interface IndividualTimeframeData {
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
declare const timeframeFromString: (timeframeLine: string) => IndividualTimeframeData;
/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
declare const timeframeToString: (timeframe: IndividualTimeframeData) => string;
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
declare const timeframeAsCombined: (timeframes: IndividualTimeframeData[]) => CombinedTimeframeData[];
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
declare const mapTimeframes: (timeframeLines: string[]) => TimeframeData;
export { timeframeFromString, timeframeToString, mapTimeframes, timeframeAsCombined, TimeframeData, CombinedTimeframeData, IndividualTimeframeData, };
//# sourceMappingURL=timeframe.d.ts.map