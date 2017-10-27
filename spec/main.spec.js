"use strict";

const lib = require("../index");

describe("Main tests", function () {
    it("Simple test", () => {
        expect(lib.add(1, 1)).toBe(2);
    });

    it("Advanced test", () => {
        expect(lib.addPi(2)).toBe(2 + Math.PI);
    });
});
