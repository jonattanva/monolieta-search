import { IgnoreAccentTokenizer } from '../../src/tokenizer/ignore-accent-tokenizer';
import { SimpleTokenizer } from '../../src/tokenizer/simple-tokenizer';
import { describe, expect, it } from 'vitest';

describe('Ignore accent', () => {
    it('tokenize', () => {
        const simpleTokenizer = new SimpleTokenizer();
        const ignoreAccentTokenizer = new IgnoreAccentTokenizer(simpleTokenizer);
        expect(ignoreAccentTokenizer.tokenize('áéíóú')).toEqual(['aeiou']);
    });
});
