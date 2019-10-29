import fetch from "node-fetch";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";
/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return List of timeframe names.
 */
const fetchTimeframes = async (customBaseUrl) => {
    const urlBuilder = new UrlBuilder();
    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }
    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then(res => res.text())
        .then(parseTimeframesPage);
};
export { fetchTimeframes };
//# sourceMappingURL=timeframes.js.map