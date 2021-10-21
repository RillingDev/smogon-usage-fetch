import type { Timeframe } from "../model/timeframe";

/**
 * @internal
 */
const TIMEFRAME_DELIMITER = "-";

/**
 * Determines the timeframe data stored in a line.
 *
 * @internal
 * @param timeframeLine Timeframe data line to check.
 * @return Object containing year and months.
 */
export const timeframeFromString = (timeframeLine: string): Timeframe => {
	const itemsMin = 2;
	const itemsMax = 3;
	const split = timeframeLine.split(TIMEFRAME_DELIMITER);

	if (split.length < itemsMin || split.length > itemsMax) {
		throw new Error(
			`Not a valid timeframe: '${timeframeLine}', expecting between ${itemsMin} and ${itemsMax} sub-elements but got ${split.length}.`
		);
	}

	const year = split[0];
	const month = split[1];
	const modifier = split[2] as string | undefined;
	if (modifier != null) {
		return {
			year,
			month,
			modifier,
		};
	} else {
		return {
			year,
			month,
		};
	}
};

/**
 * Joins the sub-elements of timeframe data back into a line.
 *
 * @internal
 * @param timeframe Timeframe to use.
 * @return Joined timeframe data line.
 */
export const timeframeToString = (timeframe: Timeframe): string => {
	const strings = [timeframe.year, timeframe.month];
	if (timeframe.modifier != null) {
		strings.push(timeframe.modifier);
	}
	return strings.join(TIMEFRAME_DELIMITER);
};
