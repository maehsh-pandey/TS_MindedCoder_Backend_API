import { Request, Response, NextFunction } from 'express'
import { THttpError } from '../types/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: THttpError, _: Request, response: Response, __: NextFunction) => {
    response.status(err.statusCode).json(err)
}
