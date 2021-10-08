export default (text: string): string[] => {
    return text.split(/[^a-zA-Z0-9_\-']+/g)
        .filter((word) => word);
};
