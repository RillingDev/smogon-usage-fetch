import fetch from "node-fetch";
import { FormatData } from "../parse/smogon/format";
import { ChaosData } from "../parse/smogon/page/chaos";
import { TimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "../url/Extension";
import { SubFolder } from "../url/SubFolder";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Object containing chaos data.
 */
const fetchChaos = async (
    timeframe: TimeframeData,
    format: FormatData,
    customBaseUrl?: string
): Promise<ChaosData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setSubFolder(SubFolder.CHAOS)
            .setExtension(Extension.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then((res) => res.json());
};

export { fetchChaos };
