import { Document } from "../../document";
import { ExactWordStrategy } from "../exactwordstrategy";

describe("Exact word strategy", () => {
    it("search document", () => {
        const document = new Document();
        document.insert("The", "002");
        document.insert("Hobbit", "002");
        document.insert("The", "003");
        document.insert("Lord", "003");

        const exactWordStrategy = new ExactWordStrategy(document);
        expect(exactWordStrategy.where(["The"])[0]).toEqual(["002", "003"]);
        expect(exactWordStrategy.where(["Lord"])[0]).toEqual(["003"]);
        expect(exactWordStrategy.where(["Hobbit"])[0]).toEqual(["002"]);

        expect(exactWordStrategy.where(["ho"])[0]).toEqual([]);
        expect(exactWordStrategy.where(["the"])[0]).toEqual([]);
    });
});
