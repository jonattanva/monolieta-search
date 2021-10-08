export default (text: string, sensitive: boolean = false) => {
    return !sensitive ? text.trim().toLocaleLowerCase() : text.trim();
};
