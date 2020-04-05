import { groupMapReducingBy } from "lightdash";
const TIMEFRAME_DELIMITER = "-";
const TIMEFRAME_ELEMENTS = 2;
const TIMEFRAME_INDEX_YEAR = 0;
const TIMEFRAME_INDEX_MONTH = 1;
/**
 * Determines the timeframe data stored in a line.
 *
 * @public
 * @param timeframeLine Timeframe data line to check.
 * @return Object containing year and months.
 */
const splitTimeframeDataLine = (timeframeLine) => {
    const split = timeframeLine.split(TIMEFRAME_DELIMITER);
    if (split.length !== TIMEFRAME_ELEMENTS) {
        throw new Error(`Not a valid timeframe: '${timeframeLine}', expecting exactly ${TIMEFRAME_ELEMENTS} sub-elements but got ${split.length}.`);
    }
    return {
        year: split[TIMEFRAME_INDEX_YEAR],
        month: split[TIMEFRAME_INDEX_MONTH],
    };
};
/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @public
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
const joinTimeframeDataLine = (timeframe) => [timeframe.year, timeframe.month].join(TIMEFRAME_DELIMITER);
/**
 * Creates a merged list from a full list of timeframes.
 *
 * @public
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
const createCombinedTimeframes = (timeframes) => Array.from(groupMapReducingBy(timeframes, (timeframe) => timeframe.year, ({ year }) => {
    return { year, months: [] };
}, (combinedElement, { month }) => {
    if (!combinedElement.months.includes(month)) {
        combinedElement.months.push(month);
    }
    return combinedElement;
}).values());
/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
const mapTimeframes = (timeframeLines) => {
    const full = timeframeLines.map(splitTimeframeDataLine);
    const combined = createCombinedTimeframes(full);
    return { combined, full };
};
export { splitTimeframeDataLine, joinTimeframeDataLine, mapTimeframes, createCombinedTimeframes, };
//# sourceMappingURL=timeframe.js.map