import { startOfDay } from 'date-fns'
import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 40

// =================== Verified being used ===================
async function query(filterBy) {
    try {
        const currPage = filterBy.page
        const criteria = _createCriteria(filterBy)
        const collection = await dbService.getCollection('stay')
        const stays = await collection
            .find(criteria)
            .skip(currPage * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray()

        const isFinalPage = stays.length < PAGE_SIZE
        return { stays, isFinalPage }
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = await collection.findOne({ _id: new ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}
// ===========================================================
// =============== Verified works but Not used ===============
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

async function update(stayId, stay) {
    try {
        const stayToSave = { ...stay }
        stayToSave._id = new ObjectId(stayId)

        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: new ObjectId(stayId) }, { $set: stayToSave })
        return stayToSave
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}
// ===========================================================



export const stayService = {
    remove,
    query,
    getById,
    add,
    update
}



function _createCriteria(filterBy) {
    const criteria = {
        $and: [{
            $or: [
                { 'loc.country': { $regex: filterBy.where, $options: 'i' } },
                { 'loc.city': { $regex: filterBy.where, $options: 'i' } },
                { 'loc.countryCode': { $regex: filterBy.where, $options: 'i' } },
                { 'loc.address': { $regex: filterBy.where, $options: 'i' } }
            ]
        }]
    }

    if (filterBy.from && filterBy.to) {
        const DAY = 1000 * 60 * 60 * 24
        const date = new Date()
        const today = Date.parse(startOfDay(date))
        const diffFrom = (filterBy.from - today) / DAY
        const diffTo = (filterBy.to - today) / DAY
        console.log('diffFrom', diffFrom)
        console.log('diffTo', diffTo)

        criteria.$and.push({
            'availableDates': {
                $elemMatch: {
                    daysFromToday: { $lte: diffFrom },
                    until: { $gte: diffTo }
                }
            }
        })
    }

    if (filterBy.capacity > 0) {
        criteria.$and.push({ 'capacity': { $gte: filterBy.capacity } })
    }

    if (filterBy.label) {
        criteria.$and.push({ 'type': filterBy.label })
    }

    return criteria
}
