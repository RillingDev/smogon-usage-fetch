import { MultiTimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return List of timeframe names.
 */
declare const fetchTimeframes: (customBaseUrl?: string | undefined) => Promise<MultiTimeframeData>;
export { fetchTimeframes };
//# sourceMappingURL=timeframes.d.ts.map