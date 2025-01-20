import { UserModel } from '../../model/user.ts'
import { logger } from '../../service/logger.service.js'


export const userService = {
    // ====================== Confirmed Being Used ======================
    getById,
    getByUsername,
    create,
    addTrip,
    // ==================================================================
    // =================== Confirmed works but unused ===================
    // query,
    remove,
    // update,
}

// ====================== Confirmed Being Used ======================
async function getById(userId) {
    try {
        const user = await UserModel.findById(userId)
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const user = await UserModel.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function create(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            imgUrl: user.imgUrl
        }
        await UserModel.create(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

async function addTrip(userId, orderId) {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $push: { trip: { orderId } } }, { returnOriginal: false })
        return updatedUser
    } catch (err) {
        logger.error(`failed to add order ${orderId} to user ${userId}`, err)
        throw err
    }
}


// ==================================================================
// =================== Confirmed works but unused ===================
// async function query(filterBy = {}) {
//     const criteria = _buildCriteria(filterBy)
//     try {
//         const collection = await dbService.getCollection('user')
//         var users = await collection.find(criteria).toArray()
//         users = users.map(user => {
//             delete user.password
//             user.createdAt = ObjectId(user._id).getTimestamp()
//             return user
//         })
//         return users
//     } catch (err) {
//         logger.error('cannot find users', err)
//         throw err
//     }
// }

// async function update(userId, user) {
//     try {
//         const { fullname, imgUrl } = user
//         const userToSave = {}
//         if (fullname) userToSave.fullname = fullname
//         if (imgUrl) userToSave.imgUrl = imgUrl

//         const collection = await dbService.getCollection('user')
//         await collection.updateOne({ _id: ObjectId(userId) }, { $set: userToSave })
//         return userToSave
//     } catch (err) {
//         logger.error(`cannot update user ${userId}`, err)
//         throw err
//     }
// }

async function remove(userId) {
    try {
        await UserModel.deleteOne({ _id: userId })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}
// ==================================================================



// private functions
function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}