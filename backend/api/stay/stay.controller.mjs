import { stayService } from './stay.service.mjs'
import { logger } from '../../services/logger.service.mjs'

export async function getStays(req, res) {
  try {
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
    // console.log('hi before query')
    const stays = await stayService.query(filterBy)
    // console.log('hi after query')
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
    res.json(stay)
  } catch (err) {
    logger.error('Failed to get stay', err)
    res.status(400).send({ err: 'Failed to get stay' })
  }
}

export async function addStay(req, res) {
  const { loggedinUser } = req

  try {
    const stay = req.body
    stay.owner = loggedinUser
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(400).send({ err: 'Failed to add stay' })
  }
}


export async function updateStay(req, res) {
  try {
    const stay = req.body
    const updatedStay = await stayService.update(stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(400).send({ err: 'Failed to update stay' })

  }
}

export async function removeStay(req, res) {
  try {
    const stayId = req.params.id
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(400).send({ err: 'Failed to remove stay' })
  }
}

export async function addStayMsg(req, res) {
  const { loggedinUser } = req
  try {
    const stayId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await stayService.addStayMsg(stayId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(400).send({ err: 'Failed to update stay' })

  }
}

export async function removeStayMsg(req, res) {
  const { loggedinUser } = req
  try {
    const stayId = req.params.id
    const { msgId } = req.params

    const removedId = await stayService.removeStayMsg(stayId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay msg', err)
    res.status(400).send({ err: 'Failed to remove stay msg' })

  }
}


