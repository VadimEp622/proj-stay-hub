import { useState } from "react";

export function DetailsReviews({ reviewsToDisplay, MAX_LENGTH = 120 }) {
    const [expanded, setExpanded] = useState(reviewsToDisplay.map(() => false));
  
    function handleExpand(idx) {
      const newExpanded = [...expanded];
      newExpanded[idx] = !newExpanded[idx];
      setExpanded(newExpanded);
    }
  
    if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>;
  
    return (
      <div className="reviews-list">
        {reviewsToDisplay.map((review, idx) => (
          <div className="review-container flex" key={idx}>
            <section>
              <section className="mini-user flex">
                <img src={review.by.imgUrl} alt="host image" />
                <section>
                  <h4 className="fs16">{review.by.fullname}</h4>
                  <span>{review.by.date}</span>
                </section>
              </section>
              <div className="description-container fs16">
                <p>
                  {expanded[idx] || review.txt.length <= MAX_LENGTH
                    ? review.txt
                    : review.txt.substring(0, MAX_LENGTH) + '...'}
                </p>
                {review.txt.length > MAX_LENGTH && (
                  <button className="show-more fs16" onClick={() => handleExpand(idx)}>
                    {expanded[idx] ? (
                      <>
                        <span>{'< '}</span>
                        <span className="underline">Show less</span>{' '}
                      </>
                    ) : (
                      <>
                        {' '}
                        <span className="underline">Show more</span>{' '}
                        <span>{'>'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </section>
          </div>
        ))}
      </div>
    );
  }