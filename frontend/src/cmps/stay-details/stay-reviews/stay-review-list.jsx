// Node modules
import { useState } from 'react'

// Services
import { reviewService } from '../../../services/review.service.js'
import { userService } from '../../../services/user.service.js'

// Components
import { Loader } from '../../_reuseable-cmps/loader.jsx'


export function StayReviewList({ reviewsToDisplay, MAX_LENGTH = 120 }) {
  const [expanded, setExpanded] = useState(reviewsToDisplay.map(() => false))
  const [usedPhotos, setUsedPhotos] = useState([])

  function handleExpand(idx) {
    const newExpanded = [...expanded]
    newExpanded[idx] = !newExpanded[idx]
    setExpanded(newExpanded)
  }

  if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading..</div>

  // const getRandomPhoto = () => {
  //   if (pictureOptions.length === usedPhotos.length) {
  //     // All photos have been used, reset the usedPhotos array
  //     setUsedPhotos([])
  //   }

  //   let randomPhoto
  //   do {
  //     randomPhoto =
  //       pictureOptions[Math.floor(Math.random() * pictureOptions.length)]
  //   } while (usedPhotos.includes(randomPhoto))

  //   setUsedPhotos([...usedPhotos, randomPhoto])
  //   return randomPhoto
  // }

  // const pictureOptions = ['https://a0.muscache.com/im/pictures/user/2bee9197-3606-4745-8f00-add4490e3622.jpg?im_w=240',
  //   'https://a0.muscache.com/im/users/28790715/profile_pic/1425580927/original.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/e66bc189-42bc-4e8f-88a6-cd324b4b818d.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/d271cd90-06f4-48cf-beed-ce0e4ba42707.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/d9b8f156-f8d5-428c-8d39-885fae319366.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/3c7b7aa4-6eac-4c72-8280-21bad7635811.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/d34c6652-f7a2-479c-bf80-1c9447bb9fed.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/ac74ea82-b87b-4c5e-95a4-aa747f7cc0cc.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/a1ecded7-f12c-4cd5-b9e0-626ea42372f2.jpg?im_w=240', 'https://a0.muscache.com/im/users/42998070/profile_pic/1441042539/original.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/d29f898d-9cf0-4305-adc2-2a857fdd7d0a.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/e1c948b3-2b08-4f45-80c1-aee905d96421.jpg?im_w=240', 'https://a0.muscache.com/im/pictures/user/dcf43739-43eb-4315-a3c2-00a31f1a2e86.jpg?im_w=240']

  return (
    <section className='reviews-list'>

      {reviewsToDisplay.map((review, idx) => (
        <article className='review-container flex' key={idx}>

          <section>

            <section className='mini-user flex'>
              <img src={userService.randomHostImg()} alt='host' />
              <section>
                <h4 className='fs16'>{review.by.fullname}</h4>
                <span>{reviewService.formatDateString(review.at)}</span>
              </section>
            </section>

            <section className='description-container fs16'>

              <p>
                {expanded[idx] || review.txt.length <= MAX_LENGTH
                  ? review.txt
                  : review.txt.substring(0, MAX_LENGTH) + '...'}
              </p>

              {review.txt.length > MAX_LENGTH && (
                <button className='show-more fs16' onClick={() => handleExpand(idx)}>

                  {expanded[idx] ? (
                    <>
                      <span>{'< '}</span>
                      <span className='underline'>Show less</span>{' '}
                    </>
                  ) : (
                    <>
                      {' '}
                      <span className='underline'>Show more</span>{' '}
                      <span>{'>'}</span>
                    </>
                  )}

                </button>
              )}
            </section>

          </section>

        </article>
      ))}

    </section>
  )
}