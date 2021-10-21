import { toMap, toMapBy } from "lightdash";
import type { Moveset, Movesets, Spread } from "../model/movesets";

/**
 * @internal
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
	readonly usage?: number;
	readonly Items: { readonly [key: string]: number };
	readonly "Raw count": number;
	readonly Spreads: { readonly [key: string]: number };
	readonly Happiness: { readonly [key: string]: number };
	readonly "Viability Ceiling"?: [number, number, number, number];
}

/**
 * @internal
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
 * @internal
 */
const mapSpread = (spreadKey: string): Spread => {
	const [nature, evs] = spreadKey.split(":");
	const [hp, atk, def, spa, spd, spe] = evs.split("/");
	return {
		nature,
		evs: {
			hp: Number(hp),
			atk: Number(atk),
			def: Number(def),
			spa: Number(spa),
			spd: Number(spd),
			spe: Number(spe),
		},
	};
};

/**
 * @internal
 */
const mapPokemonData = (rawPokemonData: RawPokemon): Moveset => {
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
			rawPokemonData.Happiness,
			(key) => Number(key),
			(_key, val) => val
		),
		teammates: toMap(rawPokemonData.Teammates),
		checksAndCounters: toMap(rawPokemonData["Checks and Counters"]),
		viabilityCeiling: rawPokemonData["Viability Ceiling"],
	};
};

/**
 * @internal
 */
export const mapChaosData = (rawChaosData: RawChaos): Movesets => {
	return {
		cutoff: rawChaosData.info.cutoff,
		cutoffDeviation: rawChaosData.info["cutoff deviation"],
		numberOfBattles: rawChaosData.info["number of battles"],
		data: toMapBy(
			rawChaosData.data,
			(key) => key,
			(_key, val) => mapPokemonData(val)
		),
	};
};
