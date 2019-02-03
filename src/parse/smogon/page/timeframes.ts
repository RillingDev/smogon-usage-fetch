import { removeTrailingSlash } from "../../../util/strUtil";
import { parseList } from "../../list";

type timeframesData = string[];

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): timeframesData =>
    parseList(html).map(removeTrailingSlash);

export { parseTimeframesPage, timeframesData };
