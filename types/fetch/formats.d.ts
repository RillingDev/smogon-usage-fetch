import { IFormatsData } from "../parse/smogon/format";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
 * @param corsUrl Optional, uses given CORS proxy to bypass CORS problems in the browser
 * @return List of formats.
 */
declare const fetchFormats: (timeframe: ITimeframeData, useMonotype?: boolean, corsUrl?: string) => Promise<IFormatsData>;
export { fetchFormats };
