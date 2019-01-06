import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import { parseList } from "../parse/list";
import { removeTrailingSlash } from "../util/strUtil";
import { checkStatus, urlJoin } from "../util/httpUtil";

/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
const fetchTimeframes = async (): Promise<string[]> =>
    fetch(urlJoin(URL_STATS))
        .then(checkStatus)
        .then(res => res.text())
        .then(html => parseList(html).map(removeTrailingSlash));

export { fetchTimeframes };
