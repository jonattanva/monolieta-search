import { Document } from './document';

export class UnorderedDocument extends Document {
    constructor() {
        super();
    }

    insert(uid: string, tokens: string[]): void {
        const total = tokens.length;
        const cache = new Map<string, Map<string, boolean>>();

        for (let index = 0; index < total; index++) {
            const token = tokens[index];
            if (!this.collection.has(token)) {
                this.collection.set(token, []);
            }

            if (!cache.has(token)) {
                cache.set(token, new Map<string, boolean>());
            }

            const values = this.collection.get(token);
            if (values && !cache.get(token)!.has(uid)) {
                values.push(uid);
                cache.get(token)!.set(uid, true);
            }
        }
    }

    relevance(): void {
        // do nothing
    }
}
