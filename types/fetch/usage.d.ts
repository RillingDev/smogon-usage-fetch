import { IUsagePageData } from "../parse/showdown/table";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @return Usage data.
 */
declare const fetchUsage: (timeframe: string, format: string) => Promise<IUsagePageData>;
export { fetchUsage };
