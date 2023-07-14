import { ExactStrategy } from '../../src/strategy/exact-strategy';
import { describe, expect, it } from 'vitest';

describe('Exact strategy', () => {
    it('apply', () => {
        const exactStrategy = new ExactStrategy();
        expect(exactStrategy.apply(['the', 'person'])).toEqual(['the', 'person']);
    });
});
