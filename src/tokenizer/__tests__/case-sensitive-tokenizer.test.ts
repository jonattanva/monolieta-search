import { SimpleTokenizer } from "../simple-tokenizer";
import { CaseSensitiveTokenizer } from "../case-sensitive-tokenizer";

describe("Case sesitive tokenizer", () => {
    it("tokenize", () => {
        const simpleTokenizer = new SimpleTokenizer();
        const caseSensitiveTokenizer = new CaseSensitiveTokenizer(
            simpleTokenizer
        );
        expect(caseSensitiveTokenizer.tokenize("Hello")).toEqual(["hello"]);
        expect(caseSensitiveTokenizer.tokenize("Hello      ")).toEqual([
            "hello",
        ]);
    });
});
