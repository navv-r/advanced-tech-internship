export default function Statistics() {
  return (
    <section id="statistics">
      <div className="container">
        <div className="row">
          {/* TOP ROW */}
          <div className="statistics__wrapper">
            {/* LEFT TEXT */}
            <div className="statistics__content--header">
              <div className="statistics__heading">Enhance your knowledge</div>
              <div className="statistics__heading">Achieve greater success</div>
              <div className="statistics__heading">Improve your health</div>
              <div className="statistics__heading">
                Develop better parenting skills
              </div>
              <div className="statistics__heading statistics__heading--active">
                Increase happiness
              </div>
              <div className="statistics__heading">
                Be the best version of yourself!
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="statistics__content--details">
              <div className="statistics__data">
                <div className="statistics__data--number">93%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>significantly increase</b> reading
                  frequency.
                </div>
              </div>

              <div className="statistics__data">
                <div className="statistics__data--number">96%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>

              <div className="statistics__data">
                <div className="statistics__data--number">90%</div>
                <div className="statistics__data--title">
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="statistics__wrapper">
            {/* LEFT BOX */}
            <div className="statistics__content--details statistics__content--details-second">
              <div className="statistics__data">
                <div className="statistics__data--number">91%</div>
                <div className="statistics__data--title">
                  of Summarist members <b>report feeling more productive</b>{" "}
                  after incorporating the service.
                </div>
              </div>

              <div className="statistics__data">
                <div className="statistics__data--number">94%</div>
                <div className="statistics__data--title">
                  have noticed an <b>improvement</b> in comprehension and
                  retention.
                </div>
              </div>

              <div className="statistics__data">
                <div className="statistics__data--number">88%</div>
                <div className="statistics__data--title">
                  feel more informed about current events and trends.
                </div>
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="statistics__content--header statistics__content--header-second">
              <div className="statistics__heading">Expand your learning</div>
              <div className="statistics__heading">Accomplish your goals</div>
              <div className="statistics__heading">
                Strengthen your vitality
              </div>
              <div className="statistics__heading">
                Become a better caregiver
              </div>
              <div className="statistics__heading statistics__heading--active">
                Improve your mood
              </div>
              <div className="statistics__heading">Maximize your abilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
