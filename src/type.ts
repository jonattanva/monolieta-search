export type Term = {
    idf: number;
    count: number;
};

export type Detail = {
    count: number;
    total: number;
};

export type StopWord = Record<string, boolean>;

export type Setting = {
    caseSensitive?: boolean;
    exactWordStrategy?: boolean;
    ignoreAccent?: boolean;
    stopWord?: StopWord;
    unorderedDocument?: boolean;
};
