/**
 * @public
 */
export interface Spread {
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
export interface Pokemon {
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
export interface Chaos {
    readonly teamType: null;
    readonly cutoff: number;
    readonly cutoffDeviation: number;
    readonly metagame: string;
    readonly numberOfBattles: number;
    readonly data: Map<string, Pokemon>;
}
