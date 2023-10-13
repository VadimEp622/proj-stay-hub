import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


const app = express()
const server = http.createServer(app)
dotenv.config()


// Express App Config
app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://localhost:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}


// routes
import { authRoutes } from './api/auth/auth.routes.mjs'
import { orderRoutes } from './api/orders/order.routes.mjs'
import { reviewRoutes } from './api/review/review.routes.mjs'
import { secretRoutes } from './api/secret/secret.routes.mjs'
import { stayRoutes } from './api/stay/stay.routes.mjs'
import { userRoutes } from './api/user/user.routes.mjs'

import { logger } from './services/logger.service.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/secret', secretRoutes)
app.use('/api/stay', stayRoutes)
app.use('/api/user', userRoutes)

setupSocketAPI(server)



// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/stay/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
    logger.info('REACT_APP_GOOGLE_MAPS_API_KEY: ' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})