import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
const server = http.createServer(app)


// Express App Config
app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3030',
            'http://127.0.0.1:3030',
            'http://localhost:5173',
            'http://127.0.0.1:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}


// routes
import { healthcheckRoutes } from './api/healthcheck/healthcheck.routes.mjs'
import { authRoutes } from './api/auth/auth.routes.mjs'
import { orderRoutes } from './api/order/order.routes.mjs'
import { secretRoutes } from './api/secret/secret.routes.mjs'
import { stayRoutes } from './api/stay/stay.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'

import { logger } from './services/logger.service.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'

app.all('*', setupAsyncLocalStorage)

app.use('/api/healthcheck', healthcheckRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/secret', secretRoutes)
app.use('/api/stay', stayRoutes)
app.use('/api/user', userRoutes)

setupSocketAPI(server)


// ***************** Graceful shutdown *****************
process.on('SIGTERM', () => {
    logger.warn('SIGTERM received, shutting down server...')
    server.close(() => {
        logger.warn('SIGTERM received, server closed')
        process.exit(0)
    })
})

process.on('SIGINT', () => {
    logger.warn('SIGINT received, shutting down server...')
    server.close(() => {
        logger.warn('SIGINT received, server closed')
        process.exit(0)
    })
})




// ***************** Get static React app *****************
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


// ***************** Run Server *****************
const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})