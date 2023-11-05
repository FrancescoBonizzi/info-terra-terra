export class UnauthorizedException extends Error {
    constructor(message: string = 'Autenticazione fallita') {
        super(message);
        this.name = 'UnauthorizedException';
    }
}