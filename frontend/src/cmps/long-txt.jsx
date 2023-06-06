import { useState } from 'react'

export function LongTxt({ txt, length = 100, askShowMore = true }) {
  const [isShowMore, setIsShowMore] = useState(false)

  function handleClick() {
    setIsShowMore((prevState) => !prevState)
  }

  function getTxtToShow() {
    if (txt.length < length) return txt
    else {
      if (isShowMore) return txt
      else return txt.substring(0, length) + '...'
    }
  }

  return (
    <div>
      {getTxtToShow()}
      {
        txt.length > length &&
        askShowMore &&
        (
          <button onClick={handleClick}>
            {!isShowMore ? 'Show More' : 'Show Less'}
          </button>
        )
      }
    </div>
  )
}
