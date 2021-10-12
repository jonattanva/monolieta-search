import { Document } from "../../document";
import { SearchWordStrategy } from "../searchwordstrategy";

describe("Search word strategy", () => {
    it("search document", () => {
        const document = new Document();
        document.insert("The", "002");
        document.insert("Hobbit", "002");
        document.insert("The", "003");
        document.insert("Lord", "003");

        const searchWordStrategy = new SearchWordStrategy(document);
        expect(searchWordStrategy.where(["The"])[0]).toEqual(["002", "003"]);
        expect(searchWordStrategy.where(["Lo"])[0]).toEqual(["003"]);
        expect(searchWordStrategy.where(["it"])[0]).toEqual(["002"]);
    });
});
