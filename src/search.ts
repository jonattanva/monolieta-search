import { BM25Document } from './document/bm25-document';
import { Configurator } from './tokenizer/configurator';
import { ExactStrategy } from './strategy/exact-strategy';
import { PrefixStrategy } from './strategy/prefix-strategy';
import { UnorderedDocument } from './document/unordered-document';

import type { Document } from './document/document';
import type { Setting } from './type';
import type { Strategy } from './strategy/strategy';
import type { Tokenizer } from './tokenizer/tokenizer';

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
            unorderedDocument = true
        } = setting;

        this.tokenizer = Configurator.init(caseSensitive, ignoreAccent, stopWord);

        this.document = unorderedDocument ? new UnorderedDocument() : new BM25Document();

        this.strategy = !exactWordStrategy ? new PrefixStrategy() : new ExactStrategy();
    }

    index(uid: string | number, body: unknown) {
        this.document.insert(`${uid}`, this.strategy.apply(this.prepare(body)));
    }

    search(query: string): string[] {
        return this.document.search(this.tokenizer.tokenize(query));
    }

    remove(uid: string | number): void {
        this.document.remove(`${uid}`);
    }

    isEmpty() {
        return this.document.length === 0;
    }

    private prepare(body: unknown): string[] {
        let tokens: string[] = [];
        if (!body) {
            return tokens;
        }

        if (Array.isArray(body)) {
            const total = body.length;
            for (let i = 0; i < total; i++) {
                const result = this.prepare(body[i]);
                const total = result.length;

                for (let j = 0; j < total; j++) {
                    tokens.push(result[j]);
                }
            }
        } else if (typeof body === 'object') {
            const keys = Object.keys(body);
            const total = keys.length;

            for (let i = 0; i < total; i++) {
                const key = keys[i];
                const result = this.prepare(body[key as keyof unknown]);
                const total = result.length;

                for (let j = 0; j < total; j++) {
                    tokens.push(result[j]);
                }
            }
        } else {
            tokens = this.tokenizer.tokenize(String(body));
        }
        return tokens;
    }
}
