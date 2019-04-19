const TIMEFRAME_DELIMITER = "-";

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
const splitTimeframeLineData = (timeframeLine: string): ITimeframeData => {
    const split = timeframeLine.split(TIMEFRAME_DELIMITER);

    if (split.length !== 2) {
        throw new Error(
            `Not a valid timeframe: '${timeframeLine}', expecting exactly 2 sub-elements but got ${
                split.length
            }.`
        );
    }
    return {
        year: split[0],
        month: split[1]
    };
};

/**
 * Joins the sub-elements of a timeframe back together.
 *
 * @private
 * @param timeframe Timeframe to use.
 * @return Joined timeframe.
 */
const joinTimeframeLineData = (timeframe: ITimeframeData): string =>
    [timeframe.year, timeframe.month].join(TIMEFRAME_DELIMITER);

export { ITimeframeData, splitTimeframeLineData, joinTimeframeLineData };
