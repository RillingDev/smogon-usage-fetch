import { fetch } from "../http/fetch";
import { parseUsagePage } from "../parse/smogon/page/usage";
import { FileType, UrlBuilder } from "../http/UrlBuilder";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Usage data.
 */
const fetchUsage = async (timeframe, format, customBaseUrl) => {
    const urlBuilder = new UrlBuilder();
    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }
    return fetch(urlBuilder
        .setFileType(FileType.TEXT)
        .setTimeframe(timeframe)
        .setFormat(format)
        .build())
        .then((res) => res.text())
        .then(parseUsagePage);
};
export { fetchUsage };
//# sourceMappingURL=usage.js.map