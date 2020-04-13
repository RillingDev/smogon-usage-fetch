interface RawPokemonData {
    Moves: {
        [key: string]: number;
    };
    "Checks and Counters": {
        [key: string]: [number, number, number];
    };
    Abilities: {
        [key: string]: number;
    };
    Teammates: {
        [key: string]: number;
    };
    usage: number;
    Items: {
        [key: string]: number;
    };
    "Raw count": number;
    Spreads: {
        [key: string]: number;
    };
    Happiness: {
        [key: string]: number;
    };
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
declare const mapChaosData: (rawChaosData: RawChaosData) => ChaosData;
export { Spread, ChaosData, PokemonData, RawChaosData, mapChaosData };
//# sourceMappingURL=chaos.d.ts.map