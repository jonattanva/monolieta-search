import { Strategy } from "./strategy";
import { Document } from "../document/document";

export class SearchWordStrategy extends Strategy {
    constructor(document: Document) {
        super(document);
    }

    where(tokens: string[]): string[] {
        const result: string[] = [];
        const total = tokens.length;

        for (let index = 0; index < total; index++) {
            const token = tokens[index];
            const document = this.document.find(token);

            const total = document.length;
            for (let k = 0; k < total; k++) {
                const uids = document[k];
                this.include(uids, token, result);
            }
        }

        this.reset();
        return this.document.sort(result);
    }
}
