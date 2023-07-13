export abstract class Document {
    protected collection: Map<string, string[]>;

    constructor() {
        this.collection = new Map<string, string[]>();
    }

    abstract insert(uid: string, tokens: string[]): void;

    abstract relevance(token: string, uid: string): void;

    remove(token: string) {
        for (const [_, value] of this.collection) {
            const index = value.indexOf(token);
            if (index !== -1) {
                value.splice(index, 1);
            }
        }
    }

    search(tokens: string[]): string[] {
        const result: string[] = [];
        const total = tokens.length;
        const included = new Map<string, boolean>();

        for (let index = 0; index < total; index++) {
            const token = tokens[index];
            const uids = this.get(token);

            const total = uids.length;
            for (let k = 0; k < total; k++) {
                const uid = uids[k];
                this.relevance(token, uid);

                if (!included.has(uid)) {
                    result.push(uid);
                    included.set(uid, true);
                }
            }
        }

        included.clear();
        return this.sort(result);
    }

    sort(uid: string[]): string[] {
        return uid;
    }

    get length() {
        return this.collection.size;
    }

    get(token: string): string[] {
        if (this.collection.has(token)) {
            const values = this.collection.get(token);
            if (values && values.length > 0) {
                return values;
            }
            this.collection.delete(token);
        }
        return [];
    }
}
