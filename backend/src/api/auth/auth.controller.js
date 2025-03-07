import { authService } from './auth.service.js'
import { logger } from '../../service/logger.service.js'

export async function login(req, res, next) {
    try {
        const { username, password } = req.body
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        // logger.info('User login: ', user._id)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    } catch (err) {
        next(err);
    }
}

export async function signup(req, res, next) {
    try {
        const credentials = req.body
        // Never log passwords
        // logger.debug(credentials)
        const account = await authService.signup(credentials)
        // logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(credentials.username, credentials.password)
        // logger.info('User signup:', user._id)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    } catch (err) {
        next(err);
    }
}

export async function logout(req, res, next) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        next(err);
    }
}

