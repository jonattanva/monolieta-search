export interface Strategy {
    apply(token: string[]): string[];
}
