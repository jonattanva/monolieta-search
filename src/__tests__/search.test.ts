import { Search } from "../search";

describe("Search", () => {
    it("search document (stop word)", () => {
        const search = new Search({
            stopWord: {
                the: true,
            },
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("the")).toEqual([]);
        expect(search.search("the hobbit")).toEqual(["002"]);
    });

    it("search document (unordered)", () => {
        const search = new Search({
            unorderedDocument: false,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("the")).toEqual(["001", "002"]);
        expect(search.search("the hobbit")).toEqual(["002", "001"]);
    });

    it("search document (accent)", () => {
        const search = new Search();
        search.index("001", "Parásitos");
        search.index("002", "Déjame salir");
        search.index("003", "El Tiburón");

        expect(search.search("Tiburón")).toEqual(["003"]);
        expect(search.search("Tiburon")).toEqual(["003"]);
    });

    it("search document (case sensitive)", () => {
        const search = new Search({
            caseSensitive: true,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("hobbit")).toEqual([]);
        expect(search.search("Hobbit")).toEqual(["002"]);
    });

    it("search document (case insensitive)", () => {
        const search = new Search({
            caseSensitive: false,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("hobbit")).toEqual(["002"]);
        expect(search.search("Hobbit")).toEqual(["002"]);
    });

    it("search document (search word strategy)", () => {
        const search = new Search({
            caseSensitive: false,
            exactWordStrategy: false,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("o")).toEqual(["001", "002"]);
        expect(search.search("Rings")).toEqual(["001"]);
        expect(search.search("The Hobbit")).toEqual(["001", "002"]);
    });

    it("search document (exact word strategy)", () => {
        const search = new Search({
            caseSensitive: false,
            exactWordStrategy: true,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.search("o")).toEqual([]);
        expect(search.search("Rings")).toEqual(["001"]);
        expect(search.search("The Hobbit")).toEqual(["001", "002"]);
    });

    it("search document (index is string)", () => {
        const search = new Search();
        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");
        expect(search.search("the lord")).toEqual(["001", "002"]);
    });

    it("search document (index is array)", () => {
        const search = new Search();
        search.index("001", ["fantasy", "epic"]);
        search.index("002", ["fantasy", "epic", "hobbit"]);
        search.index("003", ["The Hobbit", "The Lord of the Rings"]);
        expect(search.search("hobbit")).toEqual(["002", "003"]);
    });

    it("search document (index is object)", () => {
        const search = new Search();
        search.index("001", {
            name: "The Lord of the Rings",
            tag: ["fantasy", "epic"],
        });
        search.index("002", {
            name: "The Hobbit",
            tag: ["fantasy", "hobbit", "epic"],
        });

        expect(search.search("fantasy")).toEqual(["001", "002"]);
        expect(search.search("hobbit")).toEqual(["002"]);
    });
});
