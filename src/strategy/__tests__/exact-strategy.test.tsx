import { ExactStrategy } from '../exact-strategy';

describe('Exact strategy', () => {
    it('apply', () => {
        const exactStrategy = new ExactStrategy();
        expect(exactStrategy.apply(['the', 'person'])).toEqual(['the', 'person']);
    });
});
