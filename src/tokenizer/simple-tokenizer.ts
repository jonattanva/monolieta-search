import type { Tokenizer } from './tokenizer';

export class SimpleTokenizer implements Tokenizer {
    tokenize(text: string): string[] {
        const result: string[] = [];
        const elements = text.split(/[^a-zA-ZÀ-ÿ0-9_\-']+/g);
        const total = elements.length;

        for (let index = 0; index < total; index++) {
            const element = elements[index];
            if (element) {
                result.push(element);
            }
        }

        return result;
    }
}
