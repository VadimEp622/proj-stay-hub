import { startOfDay } from 'date-fns'
import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        const criteria = _createCriteria(filterBy)
        const collection = await dbService.getCollection('stay')
        const stays = await collection
            .find(criteria)
            .limit(20)
            .toArray()

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
        const stay = await collection.findOne({ _id: new ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: new ObjectId(stayId) })
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
        // update specific keys in stay object(!!)
        const stayToSave = {
            // vendor: stay.vendor,
            // price: stay.price
        }
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

// for adding key fields into all documents (development/DB improvement)
async function updateStays() {
    try {
        // const collection = await dbService.getCollection('stay')
        // const documents = await collection.find({}).toArray()

        // // for adding random dynamic future dates, in relation to visiting user's "today"
        // for (const document of documents) {
        //     const firstSpanStart = utilService.getRandomInt(0, 20)
        //     const firstSpanEnd = utilService.getRandomInt(firstSpanStart + 1, firstSpanStart + 20)
        //     // length of 10 days (stay inactive duration) between stay availabilities
        //     const secondSpanStart = utilService.getRandomInt(firstSpanEnd + 10, firstSpanEnd + 30)
        //     const secondSpanEnd = utilService.getRandomInt(secondSpanStart + 1, secondSpanStart + 55)

        //     const updateData = [
        //         { daysFromToday: firstSpanStart, until: firstSpanEnd },
        //         { daysFromToday: secondSpanStart, until: secondSpanEnd },
        //     ]

        //     const filter = { _id: document._id } // Assuming _id is the unique identifier
        //     const update = {
        //         $set: { availableDatesImproved: updateData }
        //     }

        //     const result = await collection.updateOne(filter, update)
        //     console.log(`Document updated: ${result.matchedCount} matched, ${result.modifiedCount} modified`)
        // }

        // logger.info('database updated')
    } catch (err) {
        logger.error(`cannot update stays`, err)
        throw err
    }
}

// Not Yet In Use
async function addStayMsg(stayId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stayId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add stay msg ${stayId}`, err)
        throw err
    }
}

// Not Yet In Use
async function removeStayMsg(stayId, msgId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stayId) }, { $pull: { msgs: { id: msgId } } })
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
    updateStays,
    addStayMsg,
    removeStayMsg
}



function _createCriteria(filterBy) {
    const criteria = {
        $and: [{
            $or: [
                { 'loc.country': { $regex: filterBy.country, $options: 'i' } },
                { 'loc.city': { $regex: filterBy.city, $options: 'i' } }
            ]
        }]
    }

    // OLD
    // if (filterBy.from && filterBy.to) {
    //     criteria.$and.push({
    //         'availableDates': {
    //             $elemMatch: {
    //                 $or: [
    //                     { from: { $lte: filterBy.to }, to: { $gte: filterBy.from } },
    //                     { from: { $gte: filterBy.from }, to: { $lte: filterBy.to } }
    //                 ]
    //             }
    //         }
    //     })
    // }


    // NEW, WORKS, but not for adjacent to->from
    if (filterBy.from && filterBy.to) {
        const DAY = 1000 * 60 * 60 * 24
        const date = new Date()
        const today = Date.parse(startOfDay(date))
        const diffFrom = (filterBy.from - today) / DAY
        const diffTo = (filterBy.to - today) / DAY
        console.log('diffFrom', diffFrom)
        console.log('diffTo', diffTo)

        criteria.$and.push({
            'availableDatesImproved': {
                $elemMatch: {
                    daysFromToday: { $lte: diffFrom },
                    until: { $gte: diffTo }
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
    return criteria
}
