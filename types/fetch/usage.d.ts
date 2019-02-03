import { IUsageData } from "../parse/smogon/page/usage";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Usage data.
 */
declare const fetchUsage: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<IUsageData>;
export { fetchUsage };
