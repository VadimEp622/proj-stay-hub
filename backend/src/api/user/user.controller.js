import { isValidObjectId } from 'mongoose'
import { userService } from './user.service.js'
import { BadRequestException } from '../../shared/exeptions/http.exceptions.ts'


// ====================== Confirmed Being Used ======================
export async function getUser(req, res, next) {
    try {
        const userId = req.params.id
        if (!isValidObjectId(userId)) throw new BadRequestException('Invalid userId')
        const user = await userService.getById(userId)
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}


export async function addUserTrip(req, res, next) {
    try {
        const userId = req.params.id
        if (!isValidObjectId(userId)) throw new BadRequestException('Invalid userId')
        const orderId = req.body.orderId
        if (!isValidObjectId(orderId)) throw new BadRequestException('Invalid orderId')

        const updatedUser = await userService.addTrip(userId, orderId)
        res.status(200).send(updatedUser)
    } catch (err) {
        next(err)
    }
}
// ==================================================================
// =================== Confirmed works but unused ===================
export async function getUsers(req, res, next) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        next(err)
    }
}

export async function updateUser(req, res, next) {
    try {
        const userId = req.params.id
        const user = req.body
        const savedUser = await userService.update(userId, user)
        res.send(savedUser)
    } catch (err) {
        next(err)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id
        await userService.remove(userId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        next(err)
    }
}
// ==================================================================