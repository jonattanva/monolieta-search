import { SimpleTokenizer } from '../../src/tokenizer/simple-tokenizer';
import { describe, expect, it } from 'vitest';

describe('Simple tokenizer', () => {
    it('single', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('a')).toEqual(['a']);
    });

    it('multiple', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('a b')).toEqual(['a', 'b']);
    });

    it('hyphens', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('a-b-c')).toEqual(['a-b-c']);
    });

    it('trim', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('   a   ')).toEqual(['a']);
    });

    it('punctuation', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('a,b.c')).toEqual(['a', 'b', 'c']);
    });

    it('accent', () => {
        const simpleTokenizer = new SimpleTokenizer();
        expect(simpleTokenizer.tokenize('áéíóú')).toEqual(['áéíóú']);
    });
});
