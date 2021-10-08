export default (value: any): string => {
    if (value === null || value === undefined) {
        return "";
    }

    const type = Object.prototype.toString.call(value);
    if (type === "[object Object]") {
        return "object";
    }

    if (type === "[object Array]") {
        return "array";
    }

    return typeof value;
};
