import { IChaosData } from "../parse/smogon/page/chaos";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Object containing chaos data.
 */
declare const fetchChaos: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<IChaosData>;
export { fetchChaos };
