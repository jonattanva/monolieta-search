import { Strategy } from "./strategy";
import { Document } from "../document/document";

export class ExactWordStrategy extends Strategy {
    constructor(document: Document) {
        super(document);
    }

    search(tokens: string[]): string[] {
        const result: string[] = [];
        const total = tokens.length;

        for (let index = 0; index < total; index++) {
            const token = tokens[index];
            const uids = this.document.get(token);
            this.include(uids, token, result);
        }

        this.reset();
        return this.document.sort(result);
    }
}
