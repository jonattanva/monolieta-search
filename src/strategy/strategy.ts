import { Document } from "../document/document";

export abstract class Strategy {
    protected document: Document;
    private init: Map<string, boolean>;

    constructor(document: Document) {
        this.document = document;
        this.init = new Map<string, boolean>();
    }

    abstract where(tokens: string[]): string[];

    reset() {
        this.init.clear();
    }

    include(uids: string[], token: string, result: string[]): string[] {
        const total = uids.length;
        for (let index = 0; index < total; index++) {
            const uid = uids[index];
            this.document.relevance(token, uid);

            if (!this.init.has(uid)) {
                result.push(uid);
                this.init.set(uid, true);
            }
        }
        return result;
    }
}
