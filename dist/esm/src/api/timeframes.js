import { request } from "../http/request";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { FileType, UrlBuilder } from "../http/UrlBuilder";
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
    const url = urlBuilder.build();
    const response = await request(url, FileType.TEXT);
    return parseTimeframesPage(response.data);
};
export { fetchTimeframes };
//# sourceMappingURL=timeframes.js.map