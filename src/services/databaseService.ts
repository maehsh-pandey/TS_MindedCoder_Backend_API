import { connect, connection } from 'mongoose'
import config from '../config/config'
import logger from '../util/logger'
// import config from '../config/config';

// connection to db
export default {
    connect: async () => {
        try {
            await connect(config.DATABASE_URL as string)

            return connection
        } catch (error) {
            console.error('Error ============ ON DB Connection')
            logger.error(error)
        }
    }
}
