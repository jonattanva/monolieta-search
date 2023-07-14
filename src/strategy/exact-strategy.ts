import { Strategy } from './strategy';

export class ExactStrategy implements Strategy {
    apply(token: string[]): string[] {
        return token;
    }
}
