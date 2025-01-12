import { stayService } from './stay.service.js'
import { logger } from '../../service/logger.service.js'


// =================== Verified being used ===================
export async function getStays(req, res) {
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

  try {
    const { stays, isFinalPage } = await stayService.query(filterBy)
    // const { stays, isFinalPage } = await stayService.query2(filterBy)
    res.json({ stays, isFinalPage })
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function getStayIdsWishlistedByUser(req, res) {
  try {
    const userId = req.loggedinUser?._id
    if (!userId) throw new Error('logged in userId is not valid')

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

    const stayIds = await stayService.getStayIdsWishlistedByUserByQuery(userId, filterBy)
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
// ===========================================================
// =============== Verified works but Not used ===============
export async function addStay(req, res) {
  const stay = req.body
  try {
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(400).send({ err: 'Failed to add stay' })
  }
}

export async function removeStay(req, res) {
  const stayId = req.params.id
  try {
    await stayService.remove(stayId)
    res.send(`Successfully removed stay: ${stayId}`)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(400).send({ err: 'Failed to remove stay' })
  }
}

export async function updateStay(req, res) {
  const stayId = req.params.id
  const stay = req.body
  try {
    const updatedStay = await stayService.update(stayId, stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(400).send({ err: 'Failed to update stay' })
  }
}
// ===========================================================