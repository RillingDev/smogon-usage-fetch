import fetch from "node-fetch";
import { IUsageData, parseUsagePage } from "../parse/smogon/page/usage";
import { checkStatus } from "../util/httpUtil";
import { Extension } from "../url/Extension";
import { UrlBuilder } from "../url/UrlBuilder";

/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @return Usage data.
 */
const fetchUsage = async (
    timeframe: string,
    format: string,
    rank: string = "0",
    monotype?: string
): Promise<IUsageData> =>
    fetch(
        new UrlBuilder()
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .setRank(rank)
            .setMonotype(monotype)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseUsagePage);

export { fetchUsage };
