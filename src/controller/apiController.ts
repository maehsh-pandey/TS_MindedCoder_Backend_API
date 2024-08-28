import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import httpError from '../util/httpError'
import responseMessage from '../constant/responseMessage'
import statusCode from '../constant/statusCode'
import quicker from '../util/quicker'

export default {
    self: (request: Request, response: Response, next: NextFunction) => {
        try {
            httpResponse(request, response, statusCode.OK, responseMessage.SUCCESS)
        } catch (error) {
            // response.sendStatus(500);
            httpError(next, error, request, statusCode.INTERNAL_SERVIER_ERROR)
        }
    },
    health: (request: Request, response: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timeStamp: Date.now()
            }
            httpResponse(request, response, statusCode.OK, responseMessage.SUCCESS, healthData)
        } catch (error) {
            // response.sendStatus(500);
            httpError(next, error, request, statusCode.INTERNAL_SERVIER_ERROR)
        }
    }
}
