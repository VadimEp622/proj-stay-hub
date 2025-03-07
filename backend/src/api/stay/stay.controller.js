import { isValidObjectId } from 'mongoose'
import { stayService } from './stay.service.js'
import { logger } from '../../service/logger.service.js'
import { cacheUrl } from '../../service/cache.service.ts'
import { BadRequestException } from '../../shared/exeptions/http.exceptions.ts'


// =================== Verified being used ===================
export async function getStays(req, res, next) {
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

    res.status(200).json({ stays, isFinalPage })
  } catch (err) {
    next(err);
  }
}

export async function getWishlistedStayIds(req, res, next) {
  try {
    const userId = req.loggedinUser?._id
    if (!isValidObjectId(userId))
      throw new BadRequestException("Invalid loggedin userId");

    const { where, from, to, capacity, label, page, isalluntilpage: isAllUntilPage } = req.query

    const filterBy = {
      where: '',
      from: '',
      to: '',
      capacity: 0,
      label: '',
      page: 0
    }

    const wishlistFilterBy = {
      isAllUntilPage: false
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

    if (isAllUntilPage === 'true') wishlistFilterBy.isAllUntilPage = true

    const stayIds = await stayService.getStayIdsWishlistedByUserByQuery(userId, filterBy, wishlistFilterBy.isAllUntilPage)
    res.status(200).json(stayIds)
  } catch (err) {
    next(err);
  }
}

export async function getStayById(req, res, next) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    res.status(200).json(stay)
  } catch (err) {
    next(err);
  }
}
// ===================================================================
