import { IndividualFormatData } from "../parse/smogon/format";
import { LeadsData } from "../parse/smogon/page/leads";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: IndividualTimeframeData, format: IndividualFormatData, customBaseUrl?: string | undefined) => Promise<LeadsData>;
export { fetchLeads };
//# sourceMappingURL=leads.d.ts.map