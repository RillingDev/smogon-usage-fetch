import { toMap, toMapBy } from "lightdash";
import { Chaos, Pokemon, Spread } from "../model/chaos";

/**
 * @private
 */
interface RawPokemon {
    readonly Moves: {
        readonly [key: string]: number;
    };
    readonly "Checks and Counters": {
        readonly [key: string]: [number, number, number];
    };
    readonly Abilities: { readonly [key: string]: number };
    readonly Teammates: { readonly [key: string]: number };
    readonly usage: number;
    readonly Items: { readonly [key: string]: number };
    readonly "Raw count": number;
    readonly Spreads: { readonly [key: string]: number };
    readonly Happiness: { readonly [key: string]: number };
    readonly "Viability Ceiling": [number, number, number, number];
}

/**
 * @private
 */
export interface RawChaos {
    readonly info: {
        readonly "team type": null;
        readonly cutoff: number;
        readonly "cutoff deviation": number;
        readonly metagame: string;
        readonly "number of battles": number;
    };
    readonly data: {
        readonly [key: string]: RawPokemon;
    };
}

/**
 * @private
 */
const mapSpread = (spreadKey: string): Spread => {
    const [nature, evs] = spreadKey.split(":");
    const [hp, atk, def, spa, spd, spe] = evs.split("/");
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
const mapPokemonData = (rawPokemonData: RawPokemon): Pokemon => {
    return {
        usage: rawPokemonData.usage,
        rawCount: rawPokemonData["Raw count"],
        moves: toMap(rawPokemonData.Moves),
        abilities: toMap(rawPokemonData.Abilities),
        items: toMap(rawPokemonData.Items),
        spreads: toMapBy(
            rawPokemonData.Spreads,
            (key) => mapSpread(key),
            (_key, val) => val
        ),
        happiness: toMapBy(
            rawPokemonData.Spreads,
            (key) => Number(key),
            (_key, val) => val
        ),
        teammates: toMap(rawPokemonData.Teammates),
        checksAndCounters: toMap(rawPokemonData["Checks and Counters"]),
        viabilityCeiling: rawPokemonData["Viability Ceiling"],
    };
};

/**
 * @private
 */
export const mapChaosData = (rawChaosData: RawChaos): Chaos => {
    return {
        teamType: rawChaosData.info["team type"],
        cutoff: rawChaosData.info.cutoff,
        cutoffDeviation: rawChaosData.info["cutoff deviation"],
        metagame: rawChaosData.info.metagame,
        numberOfBattles: rawChaosData.info["number of battles"],
        data: toMapBy(
            rawChaosData.data,
            (key) => key,
            (_key, val) => mapPokemonData(val)
        ),
    };
};
