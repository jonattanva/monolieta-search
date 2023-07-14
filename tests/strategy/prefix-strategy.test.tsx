import { PrefixStrategy } from '../../src/strategy/prefix-strategy';
import { describe, expect, it } from 'vitest';

describe('Prefix strategy', () => {
    it('apply', () => {
        const prefixStrategy = new PrefixStrategy();
        expect(prefixStrategy.apply(['the', 'person'])).toEqual([
            't',
            'th',
            'the',
            'p',
            'pe',
            'per',
            'pers',
            'perso',
            'person'
        ]);
    });
});
