import { stayService } from './stay.service.mjs'
import { logger } from '../../services/logger.service.mjs'


// =================== Verified being used ===================
export async function getStays(req, res) {
  logger.debug('Getting Stays:', req.query)
  const { country, city, from, to, capacity, label } = req.query

  const filterBy = {
    country: '',
    city: '',
    from: '',
    to: '',
    capacity: 0,
    label: '',
  }

  if (country) filterBy.country = country
  if (city) filterBy.city = city
  if (from) filterBy.from = +from
  if (to) filterBy.to = +to
  if (capacity) filterBy.capacity = +capacity
  if (label) filterBy.label = label

  if (filterBy.country === 'Flexible') filterBy.country = filterBy.city
  if (filterBy.country === 'Middle East') {
    filterBy.country = 'Turkey'
    filterBy.city = 'Turkey'
  }
  if (filterBy.country === 'South America') {
    filterBy.country = 'Brazil'
    filterBy.city = 'Brazil'
  }

  try {
    const stays = await stayService.query(filterBy)
    logger.info('Getting stays by filterBy:', filterBy)
    res.json(stays)
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function getStayById(req, res) {
  try {
    const stayId = req.params.id
    const stay = await stayService.getById(stayId)
    logger.info('Getting stay by id:', stayId)
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