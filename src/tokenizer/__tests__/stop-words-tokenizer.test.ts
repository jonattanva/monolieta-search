import { StopWordsTokenizer } from "../stop-words-tokenizer";
import { SimpleTokenizer } from "../simple-tokenizer";

describe("Stop words", () => {
    it("tokenize", () => {
        const simpleTokenizer = new SimpleTokenizer();
        const stopWordsTokenizer = new StopWordsTokenizer(simpleTokenizer, {
            the: true,
            a: true,
            an: true,
            on: true,
            orange: false,
        });

        expect(
            stopWordsTokenizer.tokenize(
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
