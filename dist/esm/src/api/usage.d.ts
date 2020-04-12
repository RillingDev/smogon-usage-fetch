import { IndividualFormatData } from "../parse/smogon/format";
import { UsageData } from "../parse/smogon/page/usage";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Usage data.
 */
declare const fetchUsage: (timeframe: IndividualTimeframeData, format: IndividualFormatData, customBaseUrl?: string | undefined) => Promise<UsageData>;
export { fetchUsage };
//# sourceMappingURL=usage.d.ts.map