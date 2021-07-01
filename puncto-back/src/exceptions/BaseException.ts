export class BaseException extends Error {
    type: string;
    statusCode: number;
}