import { ILeadsData } from "../parse/smogon/page/leads";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<ILeadsData>;
export { fetchLeads };
