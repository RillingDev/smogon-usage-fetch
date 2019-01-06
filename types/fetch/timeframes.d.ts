/**
 * Loads a list of all available timeframes.
 *
 * @public
 * @return List of timeframe names.
 */
declare const fetchTimeframes: () => Promise<string[]>;
export { fetchTimeframes };
