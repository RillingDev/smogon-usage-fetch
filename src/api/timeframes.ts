import { request } from "../http/request";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { TimeframeData } from "../parse/smogon/timeframe";
import { FileType, UrlBuilder } from "../http/UrlBuilder";

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return List of timeframe names.
 */
const fetchTimeframes = async (
    customBaseUrl?: string
): Promise<TimeframeData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    const url = urlBuilder.build();
    const response = await request<string>(url, FileType.TEXT);
    return parseTimeframesPage(response.data);
};

export { fetchTimeframes };
