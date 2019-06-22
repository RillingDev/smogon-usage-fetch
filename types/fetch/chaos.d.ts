import { IFormatData } from "../parse/smogon/format";
import { IChaosData } from "../parse/smogon/page/chaos";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: ITimeframeData, format: IFormatData, customBaseUrl?: string) => Promise<IChaosData>;
export { fetchChaos };
