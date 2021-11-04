import { ExactWordStrategy } from "../exact-word-strategy";
import { UnorderedDocument } from "../../document/unordered-document";

describe("Exact word strategy", () => {
    it("search document", () => {
        const document = new UnorderedDocument();
        document.insert("002", ["The"]);
        document.insert("002", ["Hobbit"]);
        document.insert("003", ["The"]);
        document.insert("003", ["Lord"]);

        const exactWordStrategy = new ExactWordStrategy(document);
        expect(exactWordStrategy.search(["The"])).toEqual(["002", "003"]);
        expect(exactWordStrategy.search(["Lord"])).toEqual(["003"]);
        expect(exactWordStrategy.search(["Hobbit"])).toEqual(["002"]);

        expect(exactWordStrategy.search(["ho"])).toEqual([]);
        expect(exactWordStrategy.search(["the"])).toEqual([]);
    });
});
