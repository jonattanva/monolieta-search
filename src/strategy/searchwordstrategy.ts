import { Strategy } from "./strategy";
import type { Document } from "../document";

export class SearchWordStrategy extends Strategy {
    constructor(document: Document) {
        super(document);
    }

    where(token: string[]): [string[], Map<string, number>] {
        const total = token.length;
        const result: string[] = [];
        const information = new Map<string, number>();

        for (let i = 0; i < total; i++) {
            const rows = this.document.find(token[i]);
            const total = rows.length;

            for (let j = 0; j < total; j++) {
                const items = rows[j];
                const total = items.length;

                for (let k = 0; k < total; k++) {
                    const uid = items[k];
                    if (!information.has(uid)) {
                        result.push(uid);
                        information.set(uid, 0);
                    }
                    information.set(uid, (information.get(uid) || 0) + 1);
                }
            }
        }

        return [result, information];
    }
}
