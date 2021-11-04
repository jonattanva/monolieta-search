import { SearchWordStrategy } from "../search-word-strategy";
import { UnorderedDocument } from "../../document/unordered-document";

describe("Search word strategy", () => {
    it("search document", () => {
        const document = new UnorderedDocument();
        document.insert("002", ["The"]);
        document.insert("002", ["Hobbit"]);
        document.insert("003", ["The"]);
        document.insert("003", ["Lord"]);

        const searchWordStrategy = new SearchWordStrategy(document);
        expect(searchWordStrategy.search(["The"])).toEqual(["002", "003"]);
        expect(searchWordStrategy.search(["Lo"])).toEqual(["003"]);
        expect(searchWordStrategy.search(["it"])).toEqual(["002"]);
    });
});
