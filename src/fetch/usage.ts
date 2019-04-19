import fetch from "node-fetch";
import { IFormatData } from "../parse/smogon/format";
import { IUsageData, parseUsagePage } from "../parse/smogon/page/usage";
import { ITimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "../url/Extension";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Usage data.
 */
const fetchUsage = async (
    timeframe: ITimeframeData,
    format: IFormatData
): Promise<IUsageData> =>
    fetch(
        new UrlBuilder()
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseUsagePage);

export { fetchUsage };
