import Search from "../search";

describe("Search", () => {
    it("search document [index is empty]", () => {
        const search = new Search();
        expect(search.where("the lord")).toEqual([]);
    });

    it("search document [index is string]", () => {
        const search = new Search();
        search.index("001", "The Lord of the Rings");
        search.index("002", "The Hobbit");
        expect(search.where("the lord")).toEqual(["001", "002"]);
    });

    it("search document [index is array]", () => {
        const search = new Search();
        search.index("001", ["fantasy", "epic"]);
        search.index("002", ["fantasy", "epic", "hobbit"]);
        search.index("003", ["The Hobbit", "The Lord of the Rings"]);
        expect(search.where("hobbit")).toEqual(["002", "003"]);
    });

    it("search document [index is object]", () => {
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
