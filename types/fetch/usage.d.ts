import { IFormatData } from "../parse/smogon/format";
import { IUsageData } from "../parse/smogon/page/usage";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Usage data.
 */
declare const fetchUsage: (timeframe: ITimeframeData, format: IFormatData) => Promise<IUsageData>;
export { fetchUsage };
