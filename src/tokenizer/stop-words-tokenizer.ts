import type { Tokenizer } from './tokenizer';

export type StopWord = Record<string, boolean>;

export class StopWordsTokenizer implements Tokenizer {
    private tokenizer: Tokenizer;
    private stopWord: StopWord;

    constructor(tokenizer: Tokenizer, stopWord: StopWord) {
        this.tokenizer = tokenizer;
        this.stopWord = stopWord;
    }

    tokenize(text: string): string[] {
        const result: string[] = [];
        const elements = this.tokenizer.tokenize(text);
        const total = elements.length;

        for (let index = 0; index < total; index++) {
            const element = elements[index];
            if (!this.stopWord[element.toLowerCase()]) {
                result.push(element);
            }
        }

        return result;
    }
}
