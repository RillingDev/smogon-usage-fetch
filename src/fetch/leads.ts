import fetch from "node-fetch";
import { ILeadsData, parseLeadsPage } from "../parse/smogon/page/leads";
import { checkStatus } from "../util/httpUtil";
import { UrlBuilder } from "../url/UrlBuilder";
import { SubFolder } from "../url/SubFolder";
import { Extension } from "../url/Extension";

/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @return Leads data.
 */
const fetchLeads = async (
    timeframe: string,
    format: string,
    rank: string = "0",
    monotype?: string
): Promise<ILeadsData> =>
    fetch(
        new UrlBuilder()
            .setSubFolder(SubFolder.LEADS)
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .setRank(rank)
            .setMonotype(monotype)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseLeadsPage);

export { fetchLeads };
