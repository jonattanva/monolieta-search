import { StopWords } from "./stop-words";
import { SimpleTokenizer } from "./simple-tokenizer";
import { CaseSensitiveTokenizer } from "./case-sensitive-tokenizer";

import type { StopWord } from "./stop-words";
import type { Tokenizer } from "./tokenizer";

export class Factory {
    public static init(
        caseSensitive: boolean,
        stopWord?: StopWord | null
    ): Tokenizer {
        let tokenizer = new SimpleTokenizer();

        if (!caseSensitive) {
            tokenizer = new CaseSensitiveTokenizer(tokenizer);
        }

        if (stopWord) {
            tokenizer = new StopWords(tokenizer, stopWord);
        }

        return tokenizer;
    }
}
