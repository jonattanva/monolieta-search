import { IgnoreAccentTokenizer } from "../ignore-accent-tokenizer";
import { SimpleTokenizer } from "../simple-tokenizer";

describe("Ignore accent", () => {
    it("tokenize", () => {
        const simpleTokenizer = new SimpleTokenizer();
        const ignoreAccentTokenizer = new IgnoreAccentTokenizer(
            simpleTokenizer
        );
        expect(ignoreAccentTokenizer.tokenize("áéíóú")).toEqual(["aeiou"]);
    });
});
