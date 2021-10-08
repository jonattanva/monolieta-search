import tokenizer from "../tokenizer";

describe("tokenizer", () => {
    it("single", () => expect(tokenizer("a")).toEqual(["a"]));
    it("multiple", () => {
        expect(tokenizer("a b c d e")).toEqual(["a", "b", "c", "d", "e"]);
    });
    it("hyphens", () => expect(tokenizer("a-b_C")).toEqual(["a-b_C"]));
    it("empty token", () => expect(tokenizer("  a  ")).toEqual(["a"]));
    it("punctuation", () => {
        expect(tokenizer("a, b. c")).toEqual(["a", "b", "c"]);
    });
});
