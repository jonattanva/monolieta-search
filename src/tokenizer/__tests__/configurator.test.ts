import { Configurator } from "../configurator";

describe("Factory", () => {
    it("case sensitive", () => {
        const tokenizer = Configurator.init(true, false);
        expect(tokenizer.tokenize("A person with an Orange")).toEqual([
            "A",
            "person",
            "with",
            "an",
            "Orange",
        ]);
    });

    it("case insensitive", () => {
        const tokenizer = Configurator.init(false, false);
        expect(tokenizer.tokenize("A person with an Orange")).toEqual([
            "a",
            "person",
            "with",
            "an",
            "orange",
        ]);
    });

    it("ignore accent", () => {
        const tokenizer = Configurator.init(false, true);
        expect(tokenizer.tokenize("El tiburón")).toEqual(["el", "tiburon"]);
    });

    it("stop words", () => {
        const tokenizer = Configurator.init(false, false, {
            a: true,
            an: true,
        });

        expect(tokenizer.tokenize("A person with an Orange")).toEqual([
            "person",
            "with",
            "orange",
        ]);
    });
});
