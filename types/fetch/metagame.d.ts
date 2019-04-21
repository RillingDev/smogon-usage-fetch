import { IFormatData } from "../parse/smogon/format";
import { IMetagameData } from "../parse/smogon/page/metagame";
import { ITimeframeData } from "../parse/smogon/timeframe";
/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @return Metagame data.
 */
declare const fetchMetagame: (timeframe: ITimeframeData, format: IFormatData) => Promise<IMetagameData>;
export { fetchMetagame };
