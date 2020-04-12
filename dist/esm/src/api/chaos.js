import { fetch } from "../http/fetch";
import { ApiPath, FileType, UrlBuilder } from "../http/UrlBuilder";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe, format, customBaseUrl) => {
    const urlBuilder = new UrlBuilder();
    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }
    return fetch(urlBuilder
        .setPath(ApiPath.CHAOS)
        .setFileType(FileType.JSON)
        .setTimeframe(timeframe)
        .setFormat(format)
        .build()).then((res) => res.json());
};
export { fetchChaos };
//# sourceMappingURL=chaos.js.map