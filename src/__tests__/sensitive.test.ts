import sensitive from "../sensitive";

describe("sensitive", () => {
    it("Is case insensitive", () => {
        expect(sensitive("Hello")).toBe("hello");
    });

    it("Is case sensitive", () => {
        expect(sensitive("Hello", true)).toBe("Hello");
    });
});
