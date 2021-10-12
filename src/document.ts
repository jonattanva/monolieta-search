export class Document {
    private collection: Map<string, string[]>;

    constructor() {
        this.collection = new Map();
    }

    insert(token: string, uid: string) {
        if (!this.collection.has(token)) {
            this.collection.set(token, []);
        }

        const values = this.collection.get(token);
        if (values && values.indexOf(uid) === -1) {
            values.push(uid);
        }
    }

    remove(uid: string) {
        for (const [_, values] of this.collection) {
            const index = values.indexOf(uid);
            if (index !== -1) {
                values.splice(index, 1);
            }
        }
    }

    get(token: string): string[] {
        if (this.collection.has(token)) {
            const values = this.collection.get(token);
            if (values) {
                return values;
            }
        }
        return [];
    }

    find(token: string): string[][] {
        const results = [];
        for (const [key, values] of this.collection) {
            if (key.includes(token)) {
                results.push(values);
            }
        }
        return results;
    }

    get length() {
        return this.collection.size;
    }
}
