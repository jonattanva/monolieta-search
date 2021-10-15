import { Strategy } from "./strategy";
import { Document } from "../document/document";

export class SearchWordStrategy extends Strategy {
    constructor(document: Document) {
        super(document);
    }

    where(tokens: string[]): string[] {
        const result: string[] = [];
        tokens.forEach((token) => {
            this.document.find(token).forEach((uids) => {
                this.include(uids, token, result);
            });
        });

        this.reset();
        return this.document.sort(result);
    }
}
