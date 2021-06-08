export default class InvalidCompanyRequestError extends Error {
    responseStatusCode: number
    constructor() {
        super()
        this.message = "The company data send in the request has some invalid value."
        this.name = "InvalidCompanyRequest"
        this.responseStatusCode = 400
    }
}