import { Search } from "../search";

describe("Search", () => {
    it("search document (case sensitive)", () => {
        const search = new Search({
            caseSensitive: true,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.where("hobbit")).toEqual([]);
        expect(search.where("Hobbit")).toEqual(["002"]);
    });

    it("search document (case insensitive)", () => {
        const search = new Search({
            caseSensitive: false,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.where("hobbit")).toEqual(["002"]);
        expect(search.where("Hobbit")).toEqual(["002"]);
    });

    it("search document (search word strategy)", () => {
        const search = new Search({
            caseSensitive: false,
            searchWordStrategy: true,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.where("o")).toEqual(["001", "002"]);
        expect(search.where("Rings")).toEqual(["001"]);
        expect(search.where("The Hobbit")).toEqual(["001", "002"]);
    });

    it("search document (exact word strategy)", () => {
        const search = new Search({
            caseSensitive: false,
            searchWordStrategy: false,
        });

        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");

        expect(search.where("o")).toEqual([]);
        expect(search.where("Rings")).toEqual(["001"]);
        expect(search.where("The Hobbit")).toEqual(["001", "002"]);
    });

    it("search document (index is string)", () => {
        const search = new Search();
        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");
        expect(search.where("the lord")).toEqual(["001", "002"]);
    });

    it("search document (index is array)", () => {
        const search = new Search();
        search.index("001", ["fantasy", "epic"]);
        search.index("002", ["fantasy", "epic", "hobbit"]);
        search.index("003", ["The Hobbit", "The Lord of the Rings"]);
        expect(search.where("hobbit")).toEqual(["002", "003"]);
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

        expect(search.where("fantasy")).toEqual(["001", "002"]);
        expect(search.where("hobbit")).toEqual(["002"]);
    });
});
