import { startOfDay } from 'date-fns'
// import { dbService } from '../../service/db.service.js'
import { logger } from '../../service/logger.service.js'
import { StayModel } from '../../model/stay.ts'
import { asyncLocalStorage } from '../../service/als.service.js'
// import mongodb from 'mongodb'
// const { ObjectId } = mongodb

const PAGE_SIZE = 20

export const stayService = {
    query,
    getStayIdsWishlistedByUserByQuery,
    getById,
    // query2,
    // remove,
    // add,
    // update
}


// =================== Verified being used ===================
async function query(filterBy) {
    try {
        const currPage = filterBy.page
        const criteria = _createCriteria(filterBy)
        const stays = await StayModel.find(criteria)
            .skip(currPage * PAGE_SIZE)
            .limit(PAGE_SIZE)

        // add .select({_id: 1,name: 1,type: 1,imgUrls: 1,price: 1,capacity: 1,loc: 1,reviews: 1,availableDates: 1,createdAt: 1})

        const isFinalPage = stays.length < PAGE_SIZE
        return { stays, isFinalPage }
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getStayIdsWishlistedByUserByQuery(userId, filterBy, isAllUntilPage = false) {
    try {
        logger.debug('getStayIdsWishlistedByUserByQuery -> isAllUntilPage', isAllUntilPage)

        const currPage = filterBy.page
        const criteria = _createCriteria(filterBy)
        const stays = await StayModel.aggregate([
            { $match: criteria },
            { $skip: isAllUntilPage ? 0 : currPage * PAGE_SIZE },
            { $limit: isAllUntilPage ? ((currPage + 1) * PAGE_SIZE) : PAGE_SIZE },
            {
                $lookup: {
                    from: "wishlistStay",
                    let: { "id": "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$userId", { $toObjectId: userId }] },
                                        { $eq: ["$stayId", "$$id"] },
                                    ]
                                }
                            }
                        },
                    ],
                    as: "wishlistStay"
                }
            },
            {
                $redact: {
                    $cond: {
                        if: {
                            $gt: [{ $size: "$wishlistStay" }, 0]
                        },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                    }
                }
            },
            { $group: { _id: null, stayIds: { $push: "$_id" } } },
            { $project: { _id: false, stayIds: true } }
        ])

        const stayIds = stays[0]?.stayIds ? stays[0].stayIds : []
        return stayIds
    } catch (err) {
        logger.error('cannot get wishlisted stay ids', err)
        throw err
    }
}

// NOTE: ok, this works (atleast using postman)
// async function query2(filterBy) {
//     try {
//         const currPage = filterBy.page
//         const criteria = _createCriteria(filterBy)
//         const store = asyncLocalStorage.getStore()
//         const userId = store?.loggedinUser?._id ? store?.loggedinUser?._id : null
//         console.log("userId", userId)
//         // TODO: aggregate with user collections's wishlist in the pipeline (for now, later with wishlistStay collection)

//         const stays = await StayModel.aggregate([
//             { $match: criteria },
//             { $skip: currPage * PAGE_SIZE },
//             { $limit: PAGE_SIZE },
//             {
//                 $lookup: {
//                     from: "wishlistStay",
//                     localField: "_id",
//                     foreignField: "stayId",
//                     as: "wishlistStay"
//                 }
//             },
//             {
//                 $addFields: {
//                     isWishlist: {
//                         $cond: {
//                             if: { $ifNull: [userId, false] }, // Check if userId is a non-empty string
//                             then: {
//                                 $gt: [
//                                     {
//                                         $size: {
//                                             $filter: {
//                                                 input: "$wishlistStay",
//                                                 as: "w",
//                                                 cond: {
//                                                     $eq: ["$$w.userId", {
//                                                         $toObjectId: userId
//                                                     }]
//                                                 }
//                                             }
//                                         }
//                                     },
//                                     0
//                                 ]
//                             },
//                             else: false // If guest user (userId is null/empty), default to false
//                         }
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     name: 1,
//                     type: 1,
//                     imgUrls: 1,
//                     price: 1,
//                     capacity: 1,
//                     loc: 1,
//                     reviews: 1,
//                     availableDates: 1,
//                     isWishlist: 1,
//                     createdAt: 1
//                 }
//             }
//         ])

//         const isFinalPage = stays.length < PAGE_SIZE
//         return { stays, isFinalPage }
//     } catch (err) {
//         logger.error('cannot find stays', err)
//         throw err
//     }
// }

async function getById(stayId) {
    try {
        const stay = await StayModel.findById(stayId)
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}
// ===========================================================
// =============== Verified works but Not used ===============
// async function add(stay) {
//     try {
//         const collection = await dbService.getCollection('stay')
//         await collection.insertOne(stay)
//         return stay
//     } catch (err) {
//         logger.error('cannot insert stay', err)
//         throw err
//     }
// }

// async function remove(stayId) {
//     try {
//         const collection = await dbService.getCollection('stay')
//         await collection.deleteOne({ _id: new ObjectId(stayId) })
//         return stayId
//     } catch (err) {
//         logger.error(`cannot remove stay ${stayId}`, err)
//         throw err
//     }
// }

// async function update(stayId, stay) {
//     try {
//         const stayToSave = { ...stay }
//         stayToSave._id = new ObjectId(stayId)

//         const collection = await dbService.getCollection('stay')
//         await collection.updateOne({ _id: new ObjectId(stayId) }, { $set: stayToSave })
//         return stayToSave
//     } catch (err) {
//         logger.error(`cannot update stay ${stayId}`, err)
//         throw err
//     }
// }
// ===========================================================





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
