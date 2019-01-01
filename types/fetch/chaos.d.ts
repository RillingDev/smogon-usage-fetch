/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: string, format: string) => Promise<any>;
export { fetchChaos };
