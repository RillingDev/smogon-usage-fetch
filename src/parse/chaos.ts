import { toMap, toMapBy } from "lightdash";
import { convertNumber } from "./convert";

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
interface RawChaos {
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
 * @public
 */
interface Spread {
    readonly nature: string;
    readonly hp: number;
    readonly atk: number;
    readonly def: number;
    readonly spa: number;
    readonly spd: number;
    readonly spe: number;
}

/**
 * @public
 */
interface Pokemon {
    readonly usage: number;
    readonly rawCount: number;
    readonly moves: Map<string, number>;
    readonly abilities: Map<string, number>;
    readonly items: Map<string, number>;
    readonly spreads: Map<Spread, number>;
    readonly happiness: Map<number, number>;
    readonly teammates: Map<string, number>;
    readonly checksAndCounters: Map<string, [number, number, number]>;
    readonly viabilityCeiling: [number, number, number, number];
}

/**
 * @public
 */
interface Chaos {
    readonly teamType: null;
    readonly cutoff: number;
    readonly cutoffDeviation: number;
    readonly metagame: string;
    readonly numberOfBattles: number;
    readonly data: Map<string, Pokemon>;
}

/**
 * @private
 */
const mapSpread = (spreadKey: string): Spread => {
    const [nature, hp, atk, def, spa, spd, spe] = spreadKey.split("/");
    return {
        nature,
        hp: convertNumber(hp),
        atk: convertNumber(atk),
        def: convertNumber(def),
        spa: convertNumber(spa),
        spd: convertNumber(spd),
        spe: convertNumber(spe),
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
const mapChaosData = (rawChaosData: RawChaos): Chaos => {
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

export { Spread, Chaos, Pokemon, RawChaos, mapChaosData };
