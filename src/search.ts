import { Document } from "./Document";
import { SimpleTokenizer } from "./tokenizer/SimpleTokenizer";
import { CaseSensitiveTokenizer } from "./tokenizer/CaseSensitiveTokenizer";

import { ExactWordStrategy } from "./strategy/ExactWordStrategy";
import { SearchWordStrategy } from "./strategy/SearchWordStrategy";

import type { Setting } from "./Setting";
import type { Strategy } from "./strategy/Strategy";
import type { Tokenizer } from "./tokenizer/Tokenizer";

export class Search {
    private document: Document;
    private strategy: Strategy;
    private tokenizer: Tokenizer;

    constructor(setting: Setting = {}) {
        // prettier-ignore
        const {
            caseSensitive = false,
            searchWordStrategy = true
        } = setting;

        this.document = new Document();
        this.tokenizer = new SimpleTokenizer();
        if (!caseSensitive) {
            this.tokenizer = new CaseSensitiveTokenizer(this.tokenizer);
        }

        this.strategy = searchWordStrategy
            ? new SearchWordStrategy(this.document)
            : new ExactWordStrategy(this.document);
    }

    index(uid: string, body: any) {
        const tokens = this.prepare(body);
        const total = tokens.length;
        for (let i = 0; i < total; i++) {
            this.document.insert(tokens[i], uid);
        }
    }

    where(text: string): string[] {
        const tokens = this.tokenizer.tokenize(text);
        const [collection] = this.strategy.where(tokens);
        return collection;
    }

    private prepare(body: any): string[] {
        let tokens: string[] = [];

        switch (this.getType(body)) {
            case "array": {
                const total = body.length;
                for (let i = 0; i < total; i++) {
                    const result = this.prepare(body[i]);
                    const total = result.length;

                    for (let j = 0; j < total; j++) {
                        tokens.push(result[j]);
                    }
                }
                break;
            }

            case "object": {
                const keys = Object.keys(body);
                const total = keys.length;

                for (let i = 0; i < total; i++) {
                    const key = keys[i];
                    const result = this.prepare(body[key]);
                    const total = result.length;

                    for (let j = 0; j < total; j++) {
                        tokens.push(result[j]);
                    }
                }
                break;
            }

            default: {
                tokens = this.tokenizer.tokenize(String(body));
                break;
            }
        }

        return tokens;
    }

    private getType(value: any): string {
        if (value === null || value === undefined) {
            return "";
        }

        const type = Object.prototype.toString.call(value);
        if (type === "[object Object]") {
            return "object";
        }

        if (type === "[object Array]") {
            return "array";
        }

        return typeof value;
    }
}
