import { ILeadsData } from "../parse/smogon/page/leads";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<ILeadsData>;
export { fetchLeads };
