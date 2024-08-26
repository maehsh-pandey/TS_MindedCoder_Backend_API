import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import httpError from '../util/httpError'
import responseMessage from '../constant/responseMessage'
import statusCode from '../constant/statusCode'

export default {
    self: (request: Request, response: Response, next: NextFunction) => {
        try {
            throw new Error('Something went wrong.')
            httpResponse(request, response, statusCode.OK, responseMessage.SUCCESS)
        } catch (error) {
            // response.sendStatus(500);
            httpError(next, error, request, statusCode.INTERNAL_SERVIER_ERROR)
        }
    }
}
