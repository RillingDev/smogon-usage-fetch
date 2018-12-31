/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
declare const fetchTimeframes: () => Promise<string[]>;
export { fetchTimeframes };
