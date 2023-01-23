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
 * Always represents a single Pokémon.
 *
 * Detailed description from <https://github.com/pkmn/smogon/blob/main/smogon/index.ts>
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
	 * Map mapping an item to its usage count.
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

	readonly teammates: Map<string, number>;

	/**
	 * n = sum(POKE1_KOED...DOUBLE_SWITCH)
	 * p = POKE1_KOED + POKE1_SWITCHED_OUT / n
	 * d = sqrt((p * (1 - p)) / n)
	 */
	readonly checksAndCounters: Map<string, [number, number, number]>;

	/**
	 * num GXE, max GXE, 1% GXE, 20% GXE.
	 *
	 * Not set in older data.
	 */
	readonly viabilityCeiling?: [number, number, number, number];
}

/**
 * Represents moveset data.
 * Based on moveset data found on e.g. {@link https://www.smogon.com/stats/2015-01/chaos/gen1ou-0.json}.
 * Note that there is also a 'moveset' endpoint (e.g. {@link https://www.smogon.com/stats/2015-01/moveset/gen1ou-0.txt})
 * that contains the same data but uses a harder to parse format.
 *
 * This data representation makes some changes to the original data:
 * - the top level 'info' object contents have been flattened and exist on the top level to be consistent with other data.
 * - 'teamType' is dropped due to only being used for the monotype type, which is already found in {@link Format}.
 * - 'metagame' is dropped due to only containing data which is already found in {@link Format}.
 *
 * @public
 */
export interface Movesets {
	readonly cutoff: number;
	readonly cutoffDeviation: number;
	readonly numberOfBattles: number;

	/**
	 * Map mapping pokemon name to moveset data.
	 */
	readonly data: Map<string, Moveset>;
}
