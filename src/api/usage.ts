import { request } from "../http/request";
import { IndividualFormatData } from "../parse/smogon/format";
import { parseUsagePage, UsageData } from "../parse/smogon/page/usage";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
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
const fetchUsage = async (
    timeframe: IndividualTimeframeData,
    format: IndividualFormatData,
    customBaseUrl?: string
): Promise<UsageData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    const url = urlBuilder
        .setFileType(FileType.TEXT)
        .setTimeframe(timeframe)
        .setFormat(format)
        .build();
    const response = await request<string>(url, FileType.TEXT);
    return parseUsagePage(response.data);
};

export { fetchUsage };
