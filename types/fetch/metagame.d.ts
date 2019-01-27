import { IMetagameData } from "../parse/smogon/page/metagame";
/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @return Metagame data.
 */
declare const fetchMetagame: (timeframe: string, format: string, rank?: string, monotype?: string | undefined) => Promise<IMetagameData>;
export { fetchMetagame };
