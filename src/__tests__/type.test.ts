import type from "../type";

describe("type", () => {
    it("is object", () => {
        expect(type({})).toBe("object");
    });

    it("is array", () => {
        expect(type([])).toBe("array");
    });

    it("is number", () => {
        expect(type(1)).toBe("number");
        expect(type(1.1)).toBe("number");
        expect(type(0)).toBe("number");
    });

    it("is string", () => {
        expect(type("")).toBe("string");
    });

    it("is boolean", () => {
        expect(type(true)).toBe("boolean");
        expect(type(false)).toBe("boolean");
    });

    it("is ?", () => {
        expect(type(null)).toBe("");
        expect(type(undefined)).toBe("");
    });
});
