import type { Tokenizer } from "./Tokenizer";

export class CaseSensitiveTokenizer implements Tokenizer {
    private tokenizer: Tokenizer;

    constructor(tokenizer: Tokenizer) {
        this.tokenizer = tokenizer;
    }

    tokenize(text: string): string[] {
        return this.tokenizer.tokenize(text).map((word) => {
            return word.toLocaleLowerCase();
        });
    }
}
