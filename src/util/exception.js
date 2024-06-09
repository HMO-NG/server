export default class Exception extends Error {
    status

    constructor(message, status) {
        super(message);
        this.status = status
    }
}