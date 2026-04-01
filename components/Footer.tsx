export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row">

          <div className="footer__wrapper">

            {/* COLUMN 1 */}
            <div className="footer__column">
              <div className="footer__title">Actions</div>
              <div className="footer__link">Login</div>
              <div className="footer__link">Sign Up</div>
              <div className="footer__link">Start Reading</div>
            </div>

            {/* COLUMN 2 */}
            <div className="footer__column">
              <div className="footer__title">Useful Links</div>
              <div className="footer__link">Pricing</div>
              <div className="footer__link">FAQ</div>
              <div className="footer__link">Contact</div>
            </div>

            {/* COLUMN 3 */}
            <div className="footer__column">
              <div className="footer__title">Company</div>
              <div className="footer__link">About</div>
              <div className="footer__link">Careers</div>
              <div className="footer__link">Blog</div>
            </div>

            {/* COLUMN 4 */}
            <div className="footer__column">
              <div className="footer__title">Other</div>
              <div className="footer__link">Terms</div>
              <div className="footer__link">Privacy</div>
              <div className="footer__link">Help</div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="footer__bottom">
            Copyright © 2026 Summarist.
          </div>

        </div>
      </div>
    </footer>
  )
}