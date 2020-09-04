/**
 * Nature + EV spread of a set.
 *
 * @public
 */
export interface Spread {
    readonly nature: string;
    readonly evs: {
        readonly hp: number;
        readonly atk: number;
        readonly def: number;
        readonly spa: number;
        readonly spd: number;
        readonly spe: number;
    };
}

/**
 * A single moveset data object as found on e.g. {@link https://www.smogon.com/stats/2015-01/chaos/gen1ou-0.json}
 * as value of an entry in 'data'.
 * Always represents a single pokemon.
 *
 * @public
 */
export interface Moveset {
    /**
     * Usage ratio (e.g. 0.0123). Not set in older data.
     */
    readonly usage?: number;

    readonly rawCount: number;

    /**
     * Map mapping a move to its usage count.
     */
    readonly moves: Map<string, number>;

    /**
     * Map mapping a ability to its usage count.
     */
    readonly abilities: Map<string, number>;

    /**
     * Map mapping a item to its usage count.
     */
    readonly items: Map<string, number>;

    /**
     * Map mapping a {@link Spread} to its usage count.
     */
    readonly spreads: Map<Spread, number>;

    /**
     * Map mapping a happiness to its usage count.
     */
    readonly happiness: Map<number, number>;

    // TODO: The numbers, what do they mean?
    readonly teammates: Map<string, number>;

    // TODO: The numbers, what do they mean?
    readonly checksAndCounters: Map<string, [number, number, number]>;

    /**
     * Not set in older data.
     */
    // TODO: The numbers, what do they mean?
    readonly viabilityCeiling?: [number, number, number, number];
}

/**
 * Represents moveset data.
 * Based on moveset data found on e.g. {@link https://www.smogon.com/stats/2015-01/chaos/gen1ou-0.json}.
 * Note that there is also a 'moveset' endpoint (e.g. {@link {@link https://www.smogon.com/stats/2015-01/chaos/gen1ou-0.json}}
 * But that uses a harder to parse format and contains the same data.
 *
 * @public
 */
export interface Movesets {
    readonly cutoff: number;
    readonly cutoffDeviation: number;
    readonly numberOfBattles: number;

    // TODO: when does this have a value?
    readonly teamType: null;

    readonly metagame: string;

    /**
     * Map mapping pokemon name to moveset data.
     */
    readonly data: Map<string, Moveset>;
}
