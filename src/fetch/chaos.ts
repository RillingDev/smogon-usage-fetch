import fetch from "node-fetch";
import { checkStatus } from "../util/httpUtil";
import { UrlBuilder } from "../url/UrlBuilder";
import { SubFolder } from "../url/SubFolder";
import { Extension } from "../url/Extension";

/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @return Object containing chaos data.
 */
const fetchChaos = async (
    timeframe: string,
    format: string,
    rank: string = "0",
    monotype?: string
): Promise<any> =>
    fetch(
        new UrlBuilder()
            .setSubFolder(SubFolder.CHAOS)
            .setExtension(Extension.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .setRank(rank)
            .setMonotype(monotype)
            .build()
    )
        .then(checkStatus)
        .then(res => res.json());

export { fetchChaos };
