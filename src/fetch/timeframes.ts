import fetch from "node-fetch";
import {
    ITimeframesData,
    parseTimeframesPage
} from "../parse/smogon/page/timeframes";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
const fetchTimeframes = async (): Promise<ITimeframesData> =>
    fetch(new UrlBuilder().build())
        .then(checkStatus)
        .then(res => res.text())
        .then(parseTimeframesPage);

export { fetchTimeframes };
