import { Document } from "./document";

export class UnorderedDocument extends Document {
    constructor() {
        super();
    }

    insert(uid: string, tokens: string[]): void {
        tokens.forEach((token) => {
            if (!this.collection.has(token)) {
                this.collection.set(token, []);
            }

            const values = this.collection.get(token);
            if (values && values.indexOf(uid) === -1) {
                values.push(uid);
            }
        });
    }

    relevance(): void {}

    sort(uids: string[]): string[] {
        return uids;
    }
}
