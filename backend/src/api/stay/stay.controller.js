import { stayService } from './stay.service.js'
import { logger } from '../../service/logger.service.js'
import { cacheUrl } from '../../service/cache.service.ts'


// =================== Verified being used ===================
export async function getStays(req, res) {
  try {
    const { where, from, to, capacity, label, page } = req.query

    const filterBy = {
      where: '',
      from: '',
      to: '',
      capacity: 0,
      label: '',
      page: 0
    }

    if (where) filterBy.where = where
    if (from) filterBy.from = +from
    if (to) filterBy.to = +to
    if (capacity) filterBy.capacity = +capacity
    if (label) filterBy.label = label
    if (page) filterBy.page = +page

    if (filterBy.where === 'Flexible') filterBy.where = ''
    if (filterBy.where === 'Middle East') filterBy.where = 'Turkey'
    if (filterBy.where === 'South America') filterBy.where = 'Brazil'

    if (filterBy.label === 'All') filterBy.label = ''


    const { stays, isFinalPage } = await stayService.query(filterBy)

    cacheUrl.set(req.originalUrl, { stays, isFinalPage })
    logger.info(`Cache set - ${req.originalUrl}`)

    res.json({ stays, isFinalPage })
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function getWishlistedStayIdsPerPage(req, res) {
  try {
    const userId = req.loggedinUser?._id
    if (!userId) throw new Error('logged in userId is not valid')
    // TODO: make sure userId is valid mongo object id

    const { where, from, to, capacity, label, page } = req.query

    const filterBy = {
      where: '',
      from: '',
      to: '',
      capacity: 0,
      label: '',
      page: 0
    }

    if (where) filterBy.where = where
    if (from) filterBy.from = +from
    if (to) filterBy.to = +to
    if (capacity) filterBy.capacity = +capacity
    if (label) filterBy.label = label
    if (page) filterBy.page = +page

    if (filterBy.where === 'Flexible') filterBy.where = ''
    if (filterBy.where === 'Middle East') filterBy.where = 'Turkey'
    if (filterBy.where === 'South America') filterBy.where = 'Brazil'

    if (filterBy.label === 'All') filterBy.label = ''

    const stayIds = await stayService.getStayIdsWishlistedByUserByQuery(userId, filterBy)
    res.json(stayIds)
  } catch (err) {
    logger.error('Failed to get wishlisted stay ids', err)
    res.status(400).send({ err: 'Failed to get wishlisted stay ids' })
  }
}

export async function getWishlistedStayIdsUntilPage(req, res) {
  try {
    const userId = req.loggedinUser?._id
    if (!userId) throw new Error('logged in userId is not valid')
    // TODO: make sure userId is valid mongo object id

    const { where, from, to, capacity, label, page } = req.query

    const filterBy = {
      where: '',
      from: '',
      to: '',
      capacity: 0,
      label: '',
      page: 0
    }

    if (where) filterBy.where = where
    if (from) filterBy.from = +from
    if (to) filterBy.to = +to
    if (capacity) filterBy.capacity = +capacity
    if (label) filterBy.label = label
    if (page) filterBy.page = +page

    if (filterBy.where === 'Flexible') filterBy.where = ''
    if (filterBy.where === 'Middle East') filterBy.where = 'Turkey'
    if (filterBy.where === 'South America') filterBy.where = 'Brazil'

    if (filterBy.label === 'All') filterBy.label = ''

    const stayIds = await stayService.getStayIdsWishlistedByUserByQuery(userId, filterBy, true)
    res.json(stayIds)
  } catch (err) {
    logger.error('Failed to get wishlisted stay ids', err)
    res.status(400).send({ err: 'Failed to get wishlisted stay ids' })
  }
}

export async function getStayById(req, res) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(400).send({ err: 'Failed to get stay' })
  }
}
// ===================================================================