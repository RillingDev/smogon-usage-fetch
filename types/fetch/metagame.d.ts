import { IMetagameData } from "../parse/smogon/page/metagame";
/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param rank Optional rank to load, defaults to "0".
 * @param monotype Optional monotype to load, defaults to none.
 * @return Metagame data.
 */
declare const fetchMetagame: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<IMetagameData>;
export { fetchMetagame };
