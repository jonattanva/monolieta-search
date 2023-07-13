import { SimpleTokenizer } from '../simple-tokenizer';
import { CaseInsensitiveTokenizer } from '../case-insensitive-tokenizer';

describe('Case sesitive tokenizer', () => {
    it('tokenize', () => {
        const simpleTokenizer = new SimpleTokenizer();
        const caseSensitiveTokenizer = new CaseInsensitiveTokenizer(simpleTokenizer);
        expect(caseSensitiveTokenizer.tokenize('Hello')).toEqual(['hello']);
        expect(caseSensitiveTokenizer.tokenize('Hello      ')).toEqual(['hello']);
    });
});
