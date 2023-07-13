import { SimpleTokenizer } from './simple-tokenizer';
import { StopWordsTokenizer } from './stop-words-tokenizer';
import { IgnoreAccentTokenizer } from './ignore-accent-tokenizer';
import { CaseInsensitiveTokenizer } from './case-insensitive-tokenizer';

import type { Tokenizer } from './tokenizer';
import type { StopWord } from './stop-words-tokenizer';

export class Configurator {
    public static init(
        caseSensitive: boolean,
        ignoreAccent: boolean,
        stopWord?: StopWord | null
    ): Tokenizer {
        let tokenizer = new SimpleTokenizer();

        if (!caseSensitive) {
            tokenizer = new CaseInsensitiveTokenizer(tokenizer);
        }

        if (ignoreAccent) {
            tokenizer = new IgnoreAccentTokenizer(tokenizer);
        }

        if (stopWord) {
            tokenizer = new StopWordsTokenizer(tokenizer, stopWord);
        }

        return tokenizer;
    }
}
