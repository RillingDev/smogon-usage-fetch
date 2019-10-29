import { FrequencyPair } from "../convert";
interface MetagameData {
    style: FrequencyPair[];
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
declare const parseMetagamePage: (page: string) => MetagameData;
export { parseMetagamePage, MetagameData };
//# sourceMappingURL=metagame.d.ts.map