import { groupMapReducingBy } from "lightdash";

/**
 * @private
 */
const TIMEFRAME_DELIMITER = "-";
/**
 * @private
 */
const TIMEFRAME_ELEMENTS = 2;
/**
 * @private
 */
const TIMEFRAME_INDEX_YEAR = 0;
/**
 * @private
 */
const TIMEFRAME_INDEX_MONTH = 1;

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
const timeframeFromString = (
    timeframeLine: string
): IndividualTimeframeData => {
    const split = timeframeLine.split(TIMEFRAME_DELIMITER);

    if (split.length !== TIMEFRAME_ELEMENTS) {
        throw new Error(
            `Not a valid timeframe: '${timeframeLine}', expecting exactly ${TIMEFRAME_ELEMENTS} sub-elements but got ${split.length}.`
        );
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
const timeframeToString = (timeframe: IndividualTimeframeData): string =>
    [timeframe.year, timeframe.month].join(TIMEFRAME_DELIMITER);

/**
 * Creates a merged list from a full list of timeframes.
 *
 * @private
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
const timeframeAsCombined = (
    timeframes: IndividualTimeframeData[]
): CombinedTimeframeData[] =>
    Array.from(
        groupMapReducingBy<
            IndividualTimeframeData,
            string,
            CombinedTimeframeData
        >(
            timeframes,
            (timeframe) => timeframe.year,
            ({ year }) => {
                return { year, months: [] };
            },
            (combinedElement, { month }) => {
                if (!combinedElement.months.includes(month)) {
                    combinedElement.months.push(month);
                }
                return combinedElement;
            }
        ).values()
    );

/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
const mapTimeframes = (timeframeLines: string[]): TimeframeData => {
    const full = timeframeLines.map(timeframeFromString);
    const combined = timeframeAsCombined(full);
    return { combined, full };
};

export {
    timeframeFromString,
    timeframeToString,
    mapTimeframes,
    TimeframeData,
    CombinedTimeframeData,
    IndividualTimeframeData,
};
