/**
 * @private
 */
import { toMap } from "lightdash";
import { identity } from "lodash";

interface RawPokemonData {
    Moves: {
        [key: string]: number;
    };
    "Checks and Counters": {
        [key: string]: [number, number, number];
    };
    Abilities: { [key: string]: number };
    Teammates: { [key: string]: number };
    usage: number;
    Items: { [key: string]: number };
    "Raw count": number;
    Spreads: { [key: string]: number };
    Happiness: { [key: string]: number };
    "Viability Ceiling": [number, number, number, number];
}

/**
 * @private
 */
interface RawChaosData {
    info: {
        "team type": null;
        cutoff: number;
        "cutoff deviation": number;
        metagame: string;
        "number of battles": number;
    };
    data: {
        [key: string]: RawPokemonData;
    };
}

/**
 * @public
 */
interface Spread {
    nature: string;
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

/**
 * @public
 */
interface PokemonData {
    usage: number;
    rawCount: number;
    moves: Map<string, number>;
    abilities: Map<string, number>;
    items: Map<string, number>;
    spreads: Map<Spread, number>;
    happiness: Map<number, number>;
    teammates: Map<string, number>;
    checksAndCounters: Map<string, [number, number, number]>;
    viabilityCeiling: [number, number, number, number];
}

/**
 * @public
 */
interface ChaosData {
    info: {
        teamType: null;
        cutoff: number;
        cutoffDeviation: number;
        metagame: string;
        numberOfBattles: number;
    };
    data: Map<string, PokemonData>;
}

/**
 * @private
 */
const mapSpread = (spreadKey: string): Spread => {
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
const mapPokemonData = (rawPokemonData: RawPokemonData): PokemonData => {
    return {
        usage: rawPokemonData.usage,
        rawCount: rawPokemonData["Raw count"],
        moves: toMap(rawPokemonData.Moves),
        abilities: toMap(rawPokemonData.Abilities),
        items: toMap(rawPokemonData.Items),
        spreads: toMap(rawPokemonData.Spreads, (key) => mapSpread(<string>key)),
        happiness: toMap(rawPokemonData.Spreads, (key) => Number(<string>key)),
        teammates: toMap(rawPokemonData.Teammates),
        checksAndCounters: toMap(rawPokemonData["Checks and Counters"]),
        viabilityCeiling: rawPokemonData["Viability Ceiling"],
    };
};

/**
 * @private
 */
const mapChaosData = (rawChaosData: RawChaosData): ChaosData => {
    return {
        info: {
            teamType: rawChaosData.info["team type"],
            cutoff: rawChaosData.info.cutoff,
            cutoffDeviation: rawChaosData.info["cutoff deviation"],
            metagame: rawChaosData.info.metagame,
            numberOfBattles: rawChaosData.info["number of battles"],
        },
        data: toMap(
            rawChaosData.data,
            (key) => <string>key,
            (val) => mapPokemonData(val)
        ),
    };
};

export { Spread, ChaosData, PokemonData, RawChaosData, mapChaosData };
