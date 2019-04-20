const TIMEFRAME_DELIMITER = "-";

const TIMEFRAME_ELEMENTS = 2;

const TIMEFRAME_INDEX_YEAR = 0;
const TIMEFRAME_INDEX_MONTH = 1;

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

    if (split.length !== TIMEFRAME_ELEMENTS) {
        throw new Error(
            `Not a valid timeframe: '${timeframeLine}', expecting exactly ${TIMEFRAME_ELEMENTS} sub-elements but got ${
                split.length
            }.`
        );
    }
    return {
        year: split[TIMEFRAME_INDEX_YEAR],
        month: split[TIMEFRAME_INDEX_MONTH]
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
