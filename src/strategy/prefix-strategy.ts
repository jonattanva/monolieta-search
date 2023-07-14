import { Strategy } from './strategy';

export class PrefixStrategy implements Strategy {
    apply(token: string[]): string[] {
        const result: string[] = [];
        const total = token.length;

        for (let index = 0; index < total; index++) {
            const element = token[index];

            const total = element.length;
            for (let prefix = 1; prefix <= total; prefix++) {
                result.push(element.substring(0, prefix));
            }
        }

        return result;
    }
}
