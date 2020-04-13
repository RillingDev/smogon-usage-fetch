/**
 * @private
 */
import { toMap } from "lightdash";
/**
 * @private
 */
const mapSpread = (spreadKey) => {
    const [nature, hp, atk, def, spa, spd, spe] = spreadKey.split("/");
    return {
        nature,
        hp: Number(hp),
        atk: Number(atk),
        def: Number(def),
        spa: Number(spa),
        spd: Number(spd),
        spe: Number(spe),
    };
};
/**
 * @private
 */
const mapPokemonData = (rawPokemonData) => {
    return {
        usage: rawPokemonData.usage,
        rawCount: rawPokemonData["Raw count"],
        moves: toMap(rawPokemonData.Moves),
        abilities: toMap(rawPokemonData.Abilities),
        items: toMap(rawPokemonData.Items),
        spreads: toMap(rawPokemonData.Spreads, (key) => mapSpread(key)),
        happiness: toMap(rawPokemonData.Spreads, (key) => Number(key)),
        teammates: toMap(rawPokemonData.Teammates),
        checksAndCounters: toMap(rawPokemonData["Checks and Counters"]),
        viabilityCeiling: rawPokemonData["Viability Ceiling"],
    };
};
/**
 * @private
 */
const mapChaosData = (rawChaosData) => {
    return {
        info: {
            teamType: rawChaosData.info["team type"],
            cutoff: rawChaosData.info.cutoff,
            cutoffDeviation: rawChaosData.info["cutoff deviation"],
            metagame: rawChaosData.info.metagame,
            numberOfBattles: rawChaosData.info["number of battles"],
        },
        data: toMap(rawChaosData.data, (key) => key, (val) => mapPokemonData(val)),
    };
};
export { mapChaosData };
//# sourceMappingURL=chaos.js.map