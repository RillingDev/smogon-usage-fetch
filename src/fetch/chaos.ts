import fetch from "node-fetch";
import { IFormatData } from "../parse/smogon/format";
import { IChaosData } from "../parse/smogon/page/chaos";
import { ITimeframeData } from "../parse/smogon/timeframe";
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
 * @return Object containing chaos data.
 */
const fetchChaos = async (
    timeframe: ITimeframeData,
    format: IFormatData
): Promise<IChaosData> =>
    fetch(
        new UrlBuilder()
            .setSubFolder(SubFolder.CHAOS)
            .setExtension(Extension.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then(res => res.json());

export { fetchChaos };
