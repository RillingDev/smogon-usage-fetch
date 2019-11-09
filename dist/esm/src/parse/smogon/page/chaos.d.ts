interface PokemonData {
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
interface ChaosData {
    info: {
        "team type": null;
        cutoff: number;
        "cutoff deviation": number;
        metagame: string;
        "number of battles": number;
    };
    data: {
        [key: string]: PokemonData;
    };
}
export { ChaosData, PokemonData };
//# sourceMappingURL=chaos.d.ts.map