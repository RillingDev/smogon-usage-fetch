import { ITimeframesData } from "../parse/smogon/timeframe";
/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
declare const fetchTimeframes: () => Promise<ITimeframesData>;
export { fetchTimeframes };
