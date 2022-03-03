import { Configurator } from "./tokenizer/configurator";
import { BM25Document } from "./document/bm25-document";
import { ExactStrategy } from "./strategy/exact-strategy";
import { PrefixStrategy } from "./strategy/prefix-strategy";
import { UnorderedDocument } from "./document/unordered-document";

import type { Strategy } from "./strategy/strategy";
import type { Document } from "./document/document";
import type { Tokenizer } from "./tokenizer/tokenizer";
import type { StopWord } from "./tokenizer/stop-words-tokenizer";

const TYPE_ARRAY = "array";
const TYPE_OBJECT = "object";

export type Setting = {
    caseSensitive?: boolean;
    exactWordStrategy?: boolean;
    ignoreAccent?: boolean;
    stopWord?: StopWord;
    unorderedDocument?: boolean;
};

export class Search {
    private document: Document;
    private strategy: Strategy;
    private tokenizer: Tokenizer;

    constructor(setting: Setting = {}) {
        const {
            caseSensitive = false,
            exactWordStrategy = false,
            ignoreAccent = true,
            stopWord = null,
            unorderedDocument = true,
        } = setting;

        this.tokenizer = Configurator.init(
            caseSensitive,
            ignoreAccent,
            stopWord
        );

        this.document = unorderedDocument
            ? new UnorderedDocument()
            : new BM25Document();

        this.strategy = !exactWordStrategy
            ? new PrefixStrategy()
            : new ExactStrategy();
    }

    index(uid: string | number, body: any) {
        this.document.insert(`${uid}`, this.strategy.apply(this.prepare(body)));
    }

    search(query: string): string[] {
        return this.document.search(this.tokenizer.tokenize(query));
    }

    isEmpty() {
        return this.document.length === 0;
    }

    private prepare(body: any): string[] {
        let tokens: string[] = [];

        switch (this.getType(body)) {
            case TYPE_ARRAY: {
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

            case TYPE_OBJECT: {
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
            return TYPE_OBJECT;
        }

        if (type === "[object Array]") {
            return TYPE_ARRAY;
        }

        return typeof value;
    }
}
