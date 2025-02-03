import { startOfDay } from 'date-fns'
import { logger } from '../../service/logger.service.js'
import { StayModel } from '../../model/stay.ts'

const PAGE_SIZE = 20

export const stayService = {
    query,
    getStayIdsWishlistedByUserByQuery,
    getById,
}


// =================== Verified being used ===================
async function query(filterBy) {
    try {
        const currPage = filterBy.page
        const criteria = _createCriteria(filterBy)
        const stays = await StayModel.find(criteria)
            .skip(currPage * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .select({ _id: 1, type: 1, imgUrls: 1, price: 1, loc: 1, reviews: 1, availableDates: 1, createdAt: 1 })

        const isFinalPage = stays.length < PAGE_SIZE
        return { stays, isFinalPage }
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getStayIdsWishlistedByUserByQuery(userId, filterBy, isAllUntilPage = false) {
    try {
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

async function getById(stayId) {
    try {
        const stay = await StayModel.findById(stayId)
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}
// ===========================================================================
// ============================ PRIVATE FUNCTIONS ============================
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
