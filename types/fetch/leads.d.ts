import { IFormatData } from "../parse/smogon/format";
import { ILeadsData } from "../parse/smogon/page/leads";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param corsUrl Optional, uses given CORS proxy to bypass CORS problems in the browser
 * @return Leads data.
 */
declare const fetchLeads: (timeframe: ITimeframeData, format: IFormatData, corsUrl?: string) => Promise<ILeadsData>;
export { fetchLeads };
