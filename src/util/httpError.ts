import { NextFunction, Request } from 'express'
import errorObject from './errorObject'
import statusCode from '../constant/statusCode'
export default (
    nextFunc: NextFunction,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    err: Error | unknown,
    request: Request,
    errorStatusCode: number = statusCode.INTERNAL_SERVIER_ERROR
): void => {
    const errorObj = errorObject(err, request, errorStatusCode)

    return nextFunc(errorObj)
}
