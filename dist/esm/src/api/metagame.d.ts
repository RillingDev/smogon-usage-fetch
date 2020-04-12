import { IndividualFormatData } from "../parse/smogon/format";
import { MetagameData } from "../parse/smogon/page/metagame";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Metagame data.
 */
declare const fetchMetagame: (timeframe: IndividualTimeframeData, format: IndividualFormatData, customBaseUrl?: string | undefined) => Promise<MetagameData>;
export { fetchMetagame };
//# sourceMappingURL=metagame.d.ts.map