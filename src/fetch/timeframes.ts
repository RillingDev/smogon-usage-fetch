import fetch from "node-fetch";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { ITimeframesData } from "../parse/smogon/timeframe";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param corsUrl Optional, uses given CORS proxy to bypass CORS problems in the browser
 * @return List of timeframe names.
 */
const fetchTimeframes = async (corsUrl: string): Promise<ITimeframesData> => {
    const urlBuilder = new UrlBuilder();

    if (corsUrl) {
        urlBuilder.setCors(corsUrl);
    }

    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then(res => res.text())
        .then(parseTimeframesPage);
}

export { fetchTimeframes };
