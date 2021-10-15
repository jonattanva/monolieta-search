export abstract class Document {
    protected collection: Map<string, string[]>;

    constructor() {
        this.collection = new Map<string, string[]>();
    }

    abstract insert(uid: string, tokens: string[]): void;

    abstract relevance(token: string, uid: string): void;

    abstract sort(uid: string[]): string[];

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
