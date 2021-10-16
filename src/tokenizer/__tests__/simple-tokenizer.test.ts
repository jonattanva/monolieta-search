import { SimpleTokenizer } from "../simple-tokenizer";

describe("Simple tokenizer", () => {
    it("single", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("a")).toEqual(["a"]);
    });

    it("multiple", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("a b")).toEqual(["a", "b"]);
    });

    it("hyphens", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("a-b-c")).toEqual(["a-b-c"]);
    });

    it("trim", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("   a   ")).toEqual(["a"]);
    });

    it("punctuation", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("a,b.c")).toEqual(["a", "b", "c"]);
    });

    it("accent", () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize("áéíóú")).toEqual(["áéíóú"]);
    });
});
