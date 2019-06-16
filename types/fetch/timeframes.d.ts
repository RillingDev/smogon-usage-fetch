import { ITimeframesData } from "../parse/smogon/timeframe";
/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param corsUrl Optional, uses given CORS proxy to bypass CORS problems in the browser
 * @return List of timeframe names.
 */
declare const fetchTimeframes: (corsUrl?: string) => Promise<ITimeframesData>;
export { fetchTimeframes };
