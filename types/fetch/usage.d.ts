import { IUsageData } from "../parse/smogon/page/usage";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @return Usage data.
 */
declare const fetchUsage: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<IUsageData>;
export { fetchUsage };
