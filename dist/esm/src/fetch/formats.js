import fetch from "node-fetch";
import { parseFormatsPage } from "../parse/smogon/page/formats";
import { ApiPath, UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";
/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return List of formats.
 */
const fetchFormats = async (timeframe, useMonotype = false, customBaseUrl) => {
    const urlBuilder = new UrlBuilder();
    urlBuilder.setTimeframe(timeframe);
    if (useMonotype) {
        urlBuilder.setPath(ApiPath.MONOTYPE);
    }
    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }
    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then((res) => res.text())
        .then(parseFormatsPage);
};
export { fetchFormats };
//# sourceMappingURL=formats.js.map