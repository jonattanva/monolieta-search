import type { Tokenizer } from "./tokenizer";

export class IgnoreAccentTokenizer implements Tokenizer {
    private tokenizer: Tokenizer;

    constructor(tokenizer: Tokenizer) {
        this.tokenizer = tokenizer;
    }

    tokenize(text: string): string[] {
        const result: string[] = [];
        const elements = this.tokenizer.tokenize(text);
        const total = elements.length;

        for (let index = 0; index < total; index++) {
            const element = elements[index];
            result.push(
                element.normalize("NFD").replace(/\p{Diacritic}/gu, "")
            );
        }

        return result;
    }
}
