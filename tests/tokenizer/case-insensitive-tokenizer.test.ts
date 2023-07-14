import { SimpleTokenizer } from '../../src/tokenizer/simple-tokenizer';
import { CaseInsensitiveTokenizer } from '../../src/tokenizer/case-insensitive-tokenizer';
import { describe, expect, it } from 'vitest';

describe('Case sesitive tokenizer', () => {
    it('tokenize', () => {
        const simpleTokenizer = new SimpleTokenizer();
        const caseSensitiveTokenizer = new CaseInsensitiveTokenizer(simpleTokenizer);
        expect(caseSensitiveTokenizer.tokenize('Hello')).toEqual(['hello']);
        expect(caseSensitiveTokenizer.tokenize('Hello      ')).toEqual(['hello']);
    });
});
