import type { Tokenizer } from "./tokenizer";

export type StopWord = {
    [word in string]: boolean;
};

export class StopWordsTokenizer implements Tokenizer {
    private tokenizer: Tokenizer;
    private stopWord: StopWord;

    constructor(tokenizer: Tokenizer, stopWord: StopWord) {
        this.tokenizer = tokenizer;
        this.stopWord = stopWord;
    }

    tokenize(text: string): string[] {
        return this.tokenizer
            .tokenize(text)
            .filter((word) => !this.stopWord[word.toLowerCase()]);
    }
}
