/**
 * Loads moveset data for the given timeframe and format.
 *
 * This is identical to {@link fetchChaos}, as the data they contain are the same, just in different formats.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Moveset data.
 */
declare const fetchMoveset: (timeframe: import("../parse/smogon/timeframe").ITimeframeData, format: import("../parse/smogon/format").IFormatData, customBaseUrl?: string) => Promise<import("../parse/smogon/page/chaos").IChaosData>;
export { fetchMoveset };
