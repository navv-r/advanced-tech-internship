import { BsStarFill } from "react-icons/bs"

export default function Reviews({ openModal }: { openModal: () => void }) {
  const reviews = [
    {
      name: "Hanna M.",
      text: (
        <>
          This app has been a <b>game-changer</b> for me! It's saved me so much
          time and effort in reading and comprehending books. Highly recommend
          it to all book lovers.
        </>
      ),
    },
    {
      name: "David B.",
      text: (
        <>
          I love this app! It provides <b>concise and accurate summaries</b> of
          books in a way that is easy to understand. It's also very user-friendly
          and intuitive.
        </>
      ),
    },
    {
      name: "Nathan S.",
      text: (
        <>
          This app is a great way to get the main takeaways from a book without
          having to read the entire thing.{" "}
          <b>The summaries are well-written and informative.</b> Definitely worth
          downloading.
        </>
      ),
    },
    {
      name: "Ryan R.",
      text: (
        <>
          If you're a busy person who <b>loves reading but doesn't have the time</b>{" "}
          to read every book in full, this app is for you! The summaries are
          thorough and provide a great overview of the book's content.
        </>
      ),
    },
  ]

  return (
    <section id="reviews">
      <div className="container">
        <div className="section__title">What our members say</div>

        <div className="reviews__wrapper">
          {reviews.map((review, i) => (
            <div className="review" key={i}>
              
              {/* HEADER */}
              <div className="review__header">
                <div className="review__name">{review.name}</div>

                <div className="review__stars">
                  {[...Array(5)].map((_, index) => (
                    <BsStarFill key={index} />
                  ))}
                </div>
              </div>

              {/* BODY */}
              <div className="review__body">{review.text}</div>
            </div>
          ))}
        </div>

        {/* LOGIN BUTTON */}
        <div className="reviews__btn--wrapper">
          <button className="btn home__cta--btn" onClick={openModal}>
            Login
          </button>
        </div>
      </div>
    </section>
  )
}