import { Strategy } from "./strategy";
import { Document } from "../document/document";

export class ExactWordStrategy extends Strategy {
    constructor(document: Document) {
        super(document);
    }

    where(tokens: string[]): string[] {
        const result: string[] = [];
        tokens.forEach((token) => {
            const uids = this.document.get(token);
            this.include(uids, token, result);
        });

        this.reset();
        return this.document.sort(result);
    }
}
