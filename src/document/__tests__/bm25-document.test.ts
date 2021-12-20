import { BM25Document } from "../bm25-document";

describe("Relevance ", () => {
    it("document is empty", () => {
        const document = new BM25Document();
        expect(document.get("Hobbit")).toEqual([]);
    });

    it("insert", () => {
        const document = new BM25Document();
        document.insert("001", ["the", "lord", "of", "the", "rings", "the", "return", "of", "the", "king"]);
        document.insert("002", ["the", "hobbit", "an", "unexpected", "journey"]);
        document.insert("003", ["the", "lord", "of", "the", "rings", "the", "fellowship", "of", "the", "ring"]);

        expect(document.length).toEqual(12);
    });

    it("get document", () => {
        const document = new BM25Document();
        document.insert("001", ["the", "lord", "of", "the", "rings", "the", "return", "of", "the", "king"]);
        document.insert("002", ["the", "hobbit", "an", "unexpected", "journey"]);
        document.insert("003", ["the", "lord", "of", "the", "rings", "the", "fellowship", "of", "the", "ring"]);

        expect(document.length).toEqual(12);
        expect(document.get("the")).toEqual(["001", "002", "003"]);
        expect(document.get("hobbit")).toEqual(["002"]);
        expect(document.get("lord")).toEqual(["001","003"]);
    });
});
