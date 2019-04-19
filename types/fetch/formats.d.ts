import { IFormatsData } from "../parse/smogon/page/formats";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
 * @return List of formats.
 */
declare const fetchFormats: (timeframe: ITimeframeData, useMonotype?: boolean) => Promise<IFormatsData>;
export { fetchFormats };
