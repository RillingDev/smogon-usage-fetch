import { UrlBuilder } from "../../src/url/UrlBuilder";

describe("UrlBuilder", () => {
    it("Constructs", () => {
        expect(new UrlBuilder()).toBeDefined();
    });
});
