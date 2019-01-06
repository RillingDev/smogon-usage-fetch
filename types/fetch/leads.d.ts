import { ILeadsPageData } from "../parse/smogon/leads";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: string, format: string) => Promise<ILeadsPageData>;
export { fetchLeads };
