import { removeTrailingSlash } from "../../../util/strUtil";
import { parseApacheDirectoryListing } from "../../list";
import { ITimeframeData, splitTimeframeLineData } from "../timeframe";

interface ITimeframesData {
    combined: ICombinedTimeframeData[];
    full: ITimeframeData[];
}

interface ICombinedTimeframeData {
    year: string;
    months: string[];
}

/**
 * Creates an new timeframe data object.
 *
 * @private
 * @param year Year of the timeframe.
 * @return New timeframe data object.
 */
const createTimeframeData = (year: string): ICombinedTimeframeData => {
    return { year, months: [] };
};

/**
 * Creates a merged list from a full list of timeframes.
 *
 * @private
 * @param timeframes Timeframe data to use.
 * @return List of combined timeframes.
 */
const createCombinedTimeframes = (
    timeframes: ITimeframeData[]
): ICombinedTimeframeData[] => {
    const combinedMap = new Map<string, ICombinedTimeframeData>();

    timeframes.forEach(({ year, month }) => {
        if (!combinedMap.has(year)) {
            combinedMap.set(year, createTimeframeData(year));
        }
        const current = combinedMap.get(year)!;
        if (!current.months.includes(month)) {
            current.months.push(month);
        }
    });

    return Array.from(combinedMap.values());
};

/**
 * Maps a list of timeframe lines to a full and a combined timeframe list.
 *
 * @private
 * @param timeframeLines Timeframe lines to use.
 * @return Object containing full and combined timeframes.
 */
const mapTimeframes = (timeframeLines: string[]): ITimeframesData => {
    const full = timeframeLines.map(splitTimeframeLineData);
    const combined = createCombinedTimeframes(full);
    return { combined, full };
};

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): ITimeframesData =>
    mapTimeframes(parseApacheDirectoryListing(html).map(removeTrailingSlash));

export { parseTimeframesPage, ITimeframesData, ICombinedTimeframeData };
