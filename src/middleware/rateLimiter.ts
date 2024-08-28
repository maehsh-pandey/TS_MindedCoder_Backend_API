import { Request, Response, NextFunction } from 'express'
import { rateLimiterMongo } from '../config/rateLimiter'
import httpError from '../util/httpError'
import responseMessage from '../constant/responseMessage'
// import { EApplicationEnvironment } from '../constant/application';
// import config from '../config/config';
import statusCode from '../constant/statusCode'

export default (req: Request, _: Response, next: NextFunction) => {
    //    if(config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    //      next();
    //    }

    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next()
            })
            .catch(() => {
                httpError(next, new Error(responseMessage.TOO_MANY_REQUEST), req, statusCode.TOO_MANY_REQUESTS)
            })
    }
}
