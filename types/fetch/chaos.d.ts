import { IFormatData } from "../parse/smogon/format";
import { IChaosData } from "../parse/smogon/page/chaos";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param corsUrl Optional, uses given CORS proxy to bypass CORS problems in the browser
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: ITimeframeData, format: IFormatData, corsUrl?: string) => Promise<IChaosData>;
export { fetchChaos };
