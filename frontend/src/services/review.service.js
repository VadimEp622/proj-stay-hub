import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove,
  getAverageReview
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getAverageReview(stay) {
  let count = 0
  const totalRate = stay.reviews.reduce((acc, review) => {
    acc += review.rate
    count++
    return acc
  }, 0)
  const averageRate = totalRate / count

  const formattedRate = averageRate % 1 === 0 ? averageRate.toFixed(1) : averageRate.toFixed(2)

  return formattedRate
}
