import type from "./type";
import Document from "./document";
import tokenizer from "./tokenizer";
import sensitive from "./sensitive";
import corpus, { words } from "./stopwords";

export default class Search {
    private document: Document;
    private caseSensitive: boolean;
    private stopwords: { [key in string]: boolean };

    // TODO: change arguments to object
    // TODO: Exact match or substring matching
    constructor(caseSensitive: boolean = false, language: string = "en") {
        this.document = new Document();
        this.stopwords = words(language);
        this.caseSensitive = caseSensitive;
    }

    /**
     * Add a document to the search index.
     */
    index(uid: string, body: any) {
        const token = this.prepare(body);
        const total = token.length;
        for (let i = 0; i < total; i++) {
            this.document.insert(token[i], uid);
        }
    }

    /**
     * Search all documents for ones matching the specified query text.
     */
    where(text: string): string[] {
        if (this.document.length === 0) {
            return [];
        }

        const token = corpus(
            tokenizer(sensitive(String(text), this.caseSensitive)),
            this.stopwords
        );
        const total = token.length;

        const result = [];
        const included: { [key in string]: boolean } = {};

        for (let i = 0; i < total; i++) {
            const rows = this.document.get(token[i]);
            const total = rows.length;

            for (let j = 0; j < total; j++) {
                const uid = rows[j];
                if (!included[uid]) {
                    result.push(uid);
                    included[uid] = true;
                }
            }
        }

        return result;
    }

    private prepare(body: any): string[] {
        switch (type(body)) {
            case "array": {
                const token = [];
                const total = body.length;

                for (let i = 0; i < total; i++) {
                    const result = this.prepare(body[i]);
                    const total = result.length;

                    for (let j = 0; j < total; j++) {
                        token.push(result[j]);
                    }
                }

                return token;
            }
            case "object": {
                const token = [];
                const keys = Object.keys(body);
                const total = keys.length;

                for (let i = 0; i < total; i++) {
                    const key = keys[i];
                    const result = this.prepare(body[key]);
                    const total = result.length;

                    for (let j = 0; j < total; j++) {
                        token.push(result[j]);
                    }
                }

                return token;
            }
            default: {
                return corpus(
                    tokenizer(sensitive(String(body), this.caseSensitive)),
                    this.stopwords
                );
            }
        }
    }
}
