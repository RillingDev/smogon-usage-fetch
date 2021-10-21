import { parseApacheDirectoryListing } from "./list";
import { formatFromString } from "../format";
import type { Format } from "../../model/format";

/**
 * Removes file extension from a string.
 *
 * @internal
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str: string): string => str.replace(/\..+$/, "");

/**
 * Parses a smogon format list page.
 *
 * @internal
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
export const parseFormatsPage = (html: string): Format[] =>
	parseApacheDirectoryListing(html)
		.filter((str: string): boolean => !str.endsWith("/"))
		.map(removeExtension)
		.map(formatFromString);
