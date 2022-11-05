import { defaults } from "lodash";
import type { RawChaos } from "../parsing/chaos";
import { mapChaosData } from "../parsing/chaos";
import { ApiPath, FileType, SmogonUrlBuilder } from "./SmogonUrlBuilder";
import { parseFormatsPage } from "../parsing/html/formats";
import { leadsFromString } from "../parsing/leads";
import { metagameFromString } from "../parsing/metagame";
import { parseTimeframesPage } from "../parsing/html/timeframes";
import { usageFromString } from "../parsing/usages";
import type { Movesets } from "../model/movesets";
import type { Format } from "../model/format";
import type { Leads } from "../model/leads";
import type { Metagame } from "../model/metagame";
import type { Timeframe } from "../model/timeframe";
import type { Usages } from "../model/usages";

/**
 * API Client config.
 *
 * @public
 */
interface SmogonApiClientConfig {
	/**
	 * Optional base URL to use instead of the default smogon stats URL.
	 * Useful for CORS-related proxies.
	 */
	baseUrl: URL;
}

/**
 * API client to load data from Smogon API.
 *
 * @public
 */
class SmogonApiClient {
	private static readonly API_BASE_URL = new URL(
		"https://www.smogon.com/stats/"
	);

	readonly #config: SmogonApiClientConfig;

	/**
	 * Creates a new instance.
	 *
	 * @param config Client config. See {@link SmogonApiClientConfig}.
	 */
	constructor(config: Partial<SmogonApiClientConfig> = {}) {
		this.#config = defaults(config, {
			baseUrl: SmogonApiClient.API_BASE_URL,
		});
	}

	/**
	 * Loads a list of all available timeframes.
	 *
	 * @public
	 * @return List of timeframe names.
	 */
	public async fetchTimeframes(): Promise<Timeframe[]> {
		const url = this.createUrlBuilder().build();
		return parseTimeframesPage(
			await this.request(url).then((res) => res.text())
		);
	}

	/**
	 * Loads a list of all available formats for a given timeframe.
	 *
	 * @public
	 * @param timeframe Timeframe to load.
	 * @param useMonotype If monotype formats should be loaded instead of "normal" formats, defaults to false.
	 * @return List of formats.
	 */
	public async fetchFormats(
		timeframe: Timeframe,
		useMonotype = false
	): Promise<Format[]> {
		const urlBuilder = this.createUrlBuilder();
		urlBuilder.setTimeframe(timeframe);
		if (useMonotype) {
			urlBuilder.setSubPath(ApiPath.MONOTYPE);
		}
		const url = urlBuilder.build();
		return parseFormatsPage(
			await this.request(url).then((res) => res.text())
		);
	}

	/**
	 * Loads usage data for the given timeframe and format.
	 *
	 * @public
	 * @param timeframe Timeframe to load.
	 * @param format Format to load.
	 * @return Usages data.
	 */
	public async fetchUsages(
		timeframe: Timeframe,
		format: Format
	): Promise<Usages> {
		const url = this.createUrlBuilder()
			.setFileType(FileType.TEXT)
			.setTimeframe(timeframe)
			.setFormat(format)
			.build();
		return usageFromString(
			await this.request(url).then((res) => res.text())
		);
	}

	/**
	 * Loads lead data for the given timeframe and format.
	 *
	 * @public
	 * @param timeframe Timeframe to load.
	 * @param format Format to load.
	 * @return Leads data.
	 */
	public async fetchLeads(
		timeframe: Timeframe,
		format: Format
	): Promise<Leads> {
		const url = this.createUrlBuilder()
			.setSubPath(ApiPath.LEADS)
			.setFileType(FileType.TEXT)
			.setTimeframe(timeframe)
			.setFormat(format)
			.build();
		return leadsFromString(
			await this.request(url).then((res) => res.text())
		);
	}

	/**
	 * Loads metagame data for the given timeframe and format.
	 *
	 * @public
	 * @param timeframe Timeframe to load.
	 * @param format Format to load.
	 * @return Metagame data.
	 */
	public async fetchMetagame(
		timeframe: Timeframe,
		format: Format
	): Promise<Metagame> {
		const url = this.createUrlBuilder()
			.setSubPath(ApiPath.METAGAME)
			.setFileType(FileType.TEXT)
			.setTimeframe(timeframe)
			.setFormat(format)
			.build();
		return metagameFromString(
			await this.request(url).then((res) => res.text())
		);
	}

	/**
	 * Loads moveset data for the given timeframe and format.
	 *
	 * Note: The `/chaos/` and the `/moveset/` endpoints are identical in terms of data.
	 * Previously this method aliased to `fetchChaos` which was removed for consistency.
	 *
	 * @public
	 * @param timeframe Timeframe to load.
	 * @param format Format to load.
	 * @return Moveset data.
	 */
	public async fetchMovesets(
		timeframe: Timeframe,
		format: Format
	): Promise<Movesets> {
		const url = this.createUrlBuilder()
			.setSubPath(ApiPath.CHAOS)
			.setFileType(FileType.JSON)
			.setTimeframe(timeframe)
			.setFormat(format)
			.build();
		return mapChaosData(
			await this.request(url).then(
				(res) => res.json() as Promise<RawChaos>
			)
		);
	}

	private createUrlBuilder(): SmogonUrlBuilder {
		return new SmogonUrlBuilder(this.#config.baseUrl);
	}

	private async request(url: URL): Promise<Response> {
		return fetch(url.toString(), { method: "GET" }).then((res) => {
			if (res.status >= 200 && res.status <= 299) {
				return res;
			}
			throw new Error(
				`Unexpected status code: ${res.status} - ${res.statusText}.`
			);
		});
	}
}

export { SmogonApiClientConfig, SmogonApiClient };
