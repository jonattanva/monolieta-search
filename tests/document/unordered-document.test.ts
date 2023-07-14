import { UnorderedDocument } from '../../src/document/unordered-document';
import { describe, expect, it } from 'vitest';

describe('Unordered', () => {
    it('document is empty', () => {
        const document = new UnorderedDocument();
        expect(document.get('Hobbit')).toEqual([]);
    });

    it('create document', () => {
        const document = new UnorderedDocument();
        document.insert('002', ['The']);
        document.insert('002', ['Hobbit']);
        document.insert('003', ['The']);
        expect(document.length).toEqual(2);
    });

    it('get document', () => {
        const document = new UnorderedDocument();
        document.insert('002', ['The']);
        document.insert('002', ['Hobbit']);
        document.insert('003', ['The']);
        document.insert('003', ['Lord']);

        expect(document.length).toEqual(3);
        expect(document.get('The')).toEqual(['002', '003']);
        expect(document.get('Hobbit')).toEqual(['002']);
        expect(document.get('Lord')).toEqual(['003']);
    });

    it('remove', () => {
        const document = new UnorderedDocument();
        document.insert('002', ['The']);
        document.insert('002', ['Hobbit']);
        document.insert('003', ['The']);
        document.insert('003', ['Lord']);

        expect(document.length).toEqual(3);
        expect(document.get('The')).toEqual(['002', '003']);
        expect(document.get('Hobbit')).toEqual(['002']);
        expect(document.get('Lord')).toEqual(['003']);

        document.remove('002');

        expect(document.get('The')).toEqual(['003']);
        expect(document.get('Hobbit')).toEqual([]);
        expect(document.get('Lord')).toEqual(['003']);
    });
});
