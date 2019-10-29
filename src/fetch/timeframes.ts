import fetch from "node-fetch";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { MultiTimeframeData } from "../parse/smogon/timeframe";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return List of timeframe names.
 */
const fetchTimeframes = async (
    customBaseUrl?: string
): Promise<MultiTimeframeData> => {
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
