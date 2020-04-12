import fetch from "node-fetch";
import { FormatData } from "../parse/smogon/format";
import { parseUsagePage, UsageData } from "../parse/smogon/page/usage";
import { TimeframeData } from "../parse/smogon/timeframe";
import { FileType, UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Usage data.
 */
const fetchUsage = async (
    timeframe: TimeframeData,
    format: FormatData,
    customBaseUrl?: string
): Promise<UsageData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then((res) => res.text())
        .then(parseUsagePage);
};

export { fetchUsage };
