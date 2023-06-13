import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        const criteria = {
            $and: [{
                $or: [
                    { 'loc.country': { $regex: filterBy.country, $options: 'i' } },
                    { 'loc.city': { $regex: filterBy.city, $options: 'i' } }
                ]
            }]
        }

        if (filterBy.from && filterBy.to) {
            criteria.$and.push({
                'availableDates': {
                    $elemMatch: {
                        $or: [
                            { from: { $lte: filterBy.to }, to: { $gte: filterBy.from } },
                            { from: { $gte: filterBy.from }, to: { $lte: filterBy.to } }
                        ]
                    }
                }
            })
        }

        if (filterBy.capacity > 0) {
            criteria.$and.push({ 'capacity': { $gte: filterBy.capacity } });
        }

        if (filterBy.label) {
            criteria.$and.push({ 'type': filterBy.label });
        }


        const collection = await dbService.getCollection('stay44')
        var stays = await collection.find(criteria)
            .limit(20)
            .toArray()


        // db.students.find().skip(10)



        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        // const stay = collection.findOne({ _id: ObjectId(stayId) })
        const stay = collection.findOne({ _id: stayId })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: stayId })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: stay._id }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: stayId }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: stayId }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

export const stayService = {
    remove,
    query,
    getById,
    add,
    update,
    addStayMsg,
    removeStayMsg
}
