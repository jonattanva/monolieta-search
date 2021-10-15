import { StopWords } from "../stop-words";
import { SimpleTokenizer } from "../simple-tokenizer";

describe("Stop words", () => {
    it("tokenize", () => {
        const simpleTokenizer = new SimpleTokenizer();
        const stopWords = new StopWords(simpleTokenizer, {
            the: true,
            a: true,
            an: true,
            on: true,
            orange: false
        });

        expect(
            stopWords.tokenize(
                "A person with an orange blanket covering them, sleeping on a wooden park bench."
            )
        ).toEqual([
            "person",
            "with",
            "orange",
            "blanket",
            "covering",
            "them",
            "sleeping",
            "wooden",
            "park",
            "bench",
        ]);
    });
});
