import { Factory as Tokenizer } from "../factory";

describe("Factory", () => {
    it("case sensitive", () => {
        const tokenizer = Tokenizer.init(true);
        expect(tokenizer.tokenize("A person with an Orange")).toEqual([
            "A",
            "person",
            "with",
            "an",
            "Orange",
        ]);
    });

    it("stop words", () => {
        const tokenizer = Tokenizer.init(false, {
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
