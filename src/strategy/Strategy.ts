import type { Document } from "../document";

export abstract class Strategy {
    protected document: Document;

    constructor(document: Document) {
        this.document = document;
    }

    abstract where(token: string[]): [string[], Map<string, number>];
}
