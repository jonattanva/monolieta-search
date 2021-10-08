import Document from "../document";

describe("Document", () => {
    it("document is empty", () => {
        const document = new Document();
        expect(document.get("Hobbit")).toEqual([]);
    });

    it("create a document", () => {
        const document = new Document();
        document.insert("The", "002");
        document.insert("Hobbit", "002");
        document.insert("The", "003");
        expect(document.length).toEqual(2);
    });

    it("get document", () => {
        const document = new Document();
        document.insert("The", "002");
        document.insert("Hobbit", "002");
        document.insert("The", "003");
        document.insert("Lord", "003");

        expect(document.length).toEqual(3);
        expect(document.get("The")).toEqual(["002", "003"]);
        expect(document.get("Hobbit")).toEqual(["002"]);
        expect(document.get("Lord")).toEqual(["003"]);
    });
});
