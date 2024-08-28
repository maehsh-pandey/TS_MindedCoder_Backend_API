import express, { Request, Response, NextFunction, Application } from 'express'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
import statusCode from './constant/statusCode'

//Initialization
const app: Application = express()

//Middleware
app.use(helmet())
// app.use(helmet.hidePoweredBy())

app.use(
    cors({
        methods: ['GET', 'POST'],
        origin: ['https://example.com'],
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public'))) //Register public folder

//Routers
app.use('/api/v1', router)

//404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error, req, statusCode.NOT_FOUND)
    }
})

//Global Error Handler
app.use(globalErrorHandler)

export default app
