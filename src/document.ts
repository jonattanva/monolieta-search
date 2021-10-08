export default class Document {
    private items: number = 0;
    private row: {
        [token in string]: { [key in string]: boolean };
    };

    constructor() {
        this.row = {};
    }

    /**
     * Inserts a new token into the document.
     */
    insert(token: string, uid: string) {
        if (!this.row[token]) {
            this.row[token] = {};
            this.items = this.items + 1;
        }
        this.row[token][uid] = true;
    }

    /**
     * Get rows of the document.
     */
    get(token: string): string[] {
        if (this.items > 0) {
            return Object.keys(this.row[token] || {});
        }
        return [];
    }

    /**
     * Get the number of token in the document.
     */
    get length() {
        return this.items;
    }
}
