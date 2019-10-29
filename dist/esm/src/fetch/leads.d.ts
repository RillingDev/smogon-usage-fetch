import { IFormatData } from "../parse/smogon/format";
import { ILeadsData } from "../parse/smogon/page/leads";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: ITimeframeData, format: IFormatData, customBaseUrl?: string | undefined) => Promise<ILeadsData>;
export { fetchLeads };
//# sourceMappingURL=leads.d.ts.map