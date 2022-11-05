import { SmogonUrlBuilder } from "../../src/api/SmogonUrlBuilder.js";

describe("SmogonUrlBuilder", () => {
	it("Constructs", () => {
		expect(
			new SmogonUrlBuilder(new URL("https://www.smogon.com/stats/"))
		).toBeDefined();
	});
});
