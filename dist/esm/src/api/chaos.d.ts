import { IndividualFormatData } from "../parse/smogon/format";
import { ChaosData } from "../parse/smogon/page/chaos";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: IndividualTimeframeData, format: IndividualFormatData, customBaseUrl?: string | undefined) => Promise<ChaosData>;
export { fetchChaos };
//# sourceMappingURL=chaos.d.ts.map