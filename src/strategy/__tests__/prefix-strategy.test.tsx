import { PrefixStrategy } from '../prefix-strategy';

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
