import { UrlBuilder } from "../../src/api/UrlBuilder";

describe("UrlBuilder", () => {
    it("Constructs", () => {
        expect(new UrlBuilder()).toBeDefined();
    });
});
