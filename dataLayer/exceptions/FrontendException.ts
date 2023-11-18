export class FrontendException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FrontendException';
    }
}