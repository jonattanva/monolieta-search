import { Document } from "./document";

export type Term = {
    idf: number;
    count: number;
};

export type Detail = {
    count: number;
    total: number;
};

// https://es.wikipedia.org/wiki/Okapi_BM25
// https://burakkanber.com/blog/machine-learning-full-text-search-in-javascript-relevance-scoring/
export class BM25Document extends Document {
    private readonly k1 = 1.3;
    private readonly b = 0.75;

    private average: number = 0;
    private totalTerms: number = 0;
    private totalDocuments: number = 0;
    private term: Map<string, Term>;
    private score: Map<string, number>;
    private frequency: Map<string, Map<string, Detail>>;

    constructor() {
        super();
        this.term = new Map();
        this.score = new Map();
        this.frequency = new Map();
    }

    private reset() {
        this.score.clear();
    }

    private calculateInverseDocumentFrequency() {
        for (const [_, value] of this.term) {
            const numerator = this.totalDocuments - value.count + 0.5;
            const denomerator = value.count + 0.5;
            value.idf = Math.max(Math.log10(numerator / denomerator), 0.01);
        }
    }

    insert(uid: string, tokens: string[]): void {
        const total = tokens.length;
        if (total === 0) {
            return;
        }

        this.totalDocuments = this.totalDocuments + 1;
        this.totalTerms = this.totalTerms + tokens.length;
        this.average = this.totalTerms / this.totalDocuments;

        const cache: string[] = [];
        tokens.forEach((token) => {
            if (!this.collection.has(token)) {
                this.collection.set(token, []);
            }

            const collection = this.collection.get(token);
            if (collection && collection.indexOf(uid) === -1) {
                collection.push(uid);
            }

            if (!this.frequency.has(uid)) {
                this.frequency.set(uid, new Map());
            }

            const frequency = this.frequency.get(uid);
            if (frequency) {
                if (!frequency.has(token)) {
                    frequency.set(token, {
                        count: 0,
                        total: total,
                    });
                }

                const term = frequency.get(token);
                if (term) {
                    term.count = term.count + 1;
                }
            }

            if (!this.term.has(token)) {
                this.term.set(token, {
                    idf: 0,
                    count: 0,
                });
            }

            const term = this.term.get(token);
            if (term && cache.indexOf(token) === -1) {
                cache.push(token);
                term.count = term.count + 1;
            }
        });

        this.calculateInverseDocumentFrequency();
    }

    relevance(token: string, uid: string): void {
        if (!this.score.has(uid)) {
            this.score.set(uid, 0);
        }

        const term = this.term.get(token);
        const idf = term!.idf;

        const detail = this.frequency.get(uid);
        const frequency = detail!.get(token);

        const count = frequency!.count;
        const numerator = count * (this.k1 + 1);
        const denomerator =
            count +
            this.k1 * (1 - this.b + (this.b * frequency!.total) / this.average);

        const score = (idf * numerator) / denomerator;
        this.score.set(uid, this.score.get(uid)! + score);
    }

    sort(uid: string[]): string[] {
        uid.sort((a, b) => {
            return this.score.get(b)! - this.score.get(a)!;
        });

        this.reset();
        return uid;
    }
}
