/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<any>;
export { fetchChaos };
