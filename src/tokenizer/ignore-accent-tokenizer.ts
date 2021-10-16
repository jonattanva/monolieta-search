import type { Tokenizer } from "./tokenizer";

export class IgnoreAccentTokenizer implements Tokenizer {
    private tokenizer: Tokenizer;

    constructor(tokenizer: Tokenizer) {
        this.tokenizer = tokenizer;
    }

    tokenize(text: string): string[] {
        return this.tokenizer.tokenize(text).map((word) => {
            return word.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        });
    }
}
