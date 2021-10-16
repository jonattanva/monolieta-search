import type { Tokenizer } from "./tokenizer";

export class SimpleTokenizer implements Tokenizer {
    tokenize(text: string): string[] {
        return text.split(/[^a-zA-ZÀ-ÿ0-9_\-']+/g)
            .filter((word) => word);
    }
}
