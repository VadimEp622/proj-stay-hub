import { authService } from '../api/auth/auth.service.js'
import { asyncLocalStorage } from '../service/als.service.js'
import { logger } from '../service/logger.service.js'

// NOTE: als, used for remembering a state throughout a request
export async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies || Object.keys(req.cookies).length === 0) return next()

    const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // logger.debug(`setupAsyncLocalStorage -> loggedinUser - ${JSON.stringify(loggedinUser)}`)

    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}

