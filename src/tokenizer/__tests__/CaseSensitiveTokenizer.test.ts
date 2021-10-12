import { SimpleTokenizer } from "../SimpleTokenizer";
import { CaseSensitiveTokenizer } from "../CaseSensitiveTokenizer";

describe("Case sesitive tokenizer", () => {
    it("tokenizer", () => {
        const simpleTokenizer = new SimpleTokenizer();
        const caseSensitiveTokenizer = new CaseSensitiveTokenizer(
            simpleTokenizer
        );
        expect(caseSensitiveTokenizer.tokenize("Hello")).toEqual(["hello"]);
        expect(caseSensitiveTokenizer.tokenize("Hello      ")).toEqual(["hello"]);
    });
});
