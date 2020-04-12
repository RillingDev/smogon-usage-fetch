import { fetch } from "../http/fetch";
import { FormatData } from "../parse/smogon/format";
import { MetagameData, parseMetagamePage } from "../parse/smogon/page/metagame";
import { TimeframeData } from "../parse/smogon/timeframe";
import { ApiPath, FileType, UrlBuilder } from "../http/UrlBuilder";

/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Metagame data.
 */
const fetchMetagame = async (
    timeframe: TimeframeData,
    format: FormatData,
    customBaseUrl?: string
): Promise<MetagameData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setPath(ApiPath.METAGAME)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then((res) => res.text())
        .then(parseMetagamePage);
};

export { fetchMetagame };
