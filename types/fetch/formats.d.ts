import { IFormatsData } from "../parse/smogon/page/formats";
/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded, defaults to false.
 * @return List of formats.
 */
declare const fetchFormats: (timeframe: string, useMonotype?: boolean) => Promise<IFormatsData>;
export { fetchFormats };
