import { parseApacheDirectoryListing } from "./list";
import { timeframeFromString } from "../timeframe";
import { removeEnd } from "lightdash";
import type { Timeframe } from "../../model/timeframe";

/**
 * Parses a smogon timeframes list page.
 *
 * @internal
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
export const parseTimeframesPage = (html: string): Timeframe[] =>
	parseApacheDirectoryListing(html)
		.map((str: string): string => removeEnd(str, "/"))
		.map(timeframeFromString);
