import fetch from "node-fetch";
import { parseList } from "../parse/list";
import { checkStatus } from "../util/httpUtil";
import { removeTrailingSlash } from "../util/strUtil";
import { UrlBuilder } from "../url/UrlBuilder";

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
const fetchTimeframes = async (): Promise<string[]> =>
    fetch(new UrlBuilder().build())
        .then(checkStatus)
        .then(res => res.text())
        .then(html => parseList(html).map(removeTrailingSlash));

export { fetchTimeframes };
