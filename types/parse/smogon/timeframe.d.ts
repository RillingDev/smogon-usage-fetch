interface ITimeframeData {
    year: string;
    month: string;
}
/**
 * Determines the data stored in a timeframe line.
 *
 * @private
 * @param timeframeLine Timeframe line to check.
 * @return Object containing year and months.
 */
declare const splitTimeframeLineData: (timeframeLine: string) => ITimeframeData;
/**
 * Joins the sub-elements of a timeframe back together.
 *
 * @private
 * @param timeframe Timeframe to use.
 * @return Joined timeframe.
 */
declare const joinTimeframeLineData: (timeframe: ITimeframeData) => string;
export { ITimeframeData, splitTimeframeLineData, joinTimeframeLineData };
