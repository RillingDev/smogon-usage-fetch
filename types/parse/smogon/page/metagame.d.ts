import { frequencyPair } from "../convert";
interface IMetagameData {
    style: frequencyPair[];
    stalliness: {
        mean: number;
        one: number;
    };
}
/**
 * Parses a smogon metagame page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
declare const parseMetagamePage: (page: string) => IMetagameData;
export { parseMetagamePage, IMetagameData };
