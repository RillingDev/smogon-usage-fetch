import { UrlBuilder } from "../../../src/http/UrlBuilder";

describe("UrlBuilder", () => {
    it("Constructs", () => {
        expect(new UrlBuilder()).toBeDefined();
    });
});
