"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import { AiOutlineCheck } from "react-icons/ai"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import Footer from "@/components/Footer"

const faqs = [
  {
    q: "How does the free 7-day trial work?",
    a: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    q: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    a: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    q: "What's included in the Premium plan?",
    a: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    q: "Can I cancel during my trial or subscription?",
    a: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
]

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { user, openModal } = useAuth()
  const router = useRouter()

  const handleSubscribe = () => {
    if (!user) {
      openModal("login")
      return
    }
    // Stripe integration placeholder
    alert(`Subscribing to ${selectedPlan} plan — integrate Stripe here!`)
  }

  return (
    <div className="choose-plan__page">
      {/* TOP NAV — minimal, no sidebar */}
      <div className="choose-plan__nav">
        <img src="/assets/logo.png" alt="Summarist" className="choose-plan__logo" />
      </div>

      <div className="choose-plan__wrapper">
        {/* HERO */}
        <div className="choose-plan__hero">
          <h1 className="choose-plan__hero--title">
            Get unlimited access to many amazing books to read
          </h1>
          <p className="choose-plan__hero--sub">
            Turn ordinary moments into amazing learning opportunities
          </p>
          <div className="choose-plan__hero--img--wrapper">
            <Image
              src="/assets/pricing-top.png"
              alt="Pricing"
              width={340}
              height={240}
              onError={() => {}}
              className="choose-plan__hero--img"
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="choose-plan__features">
          <div className="choose-plan__feature">
            <AiOutlineCheck className="choose-plan__check" />
            <span><b>Key ideas in few min</b> with many books to read</span>
          </div>
          <div className="choose-plan__feature">
            <AiOutlineCheck className="choose-plan__check" />
            <span><b>3 million</b> people growing with Summarist everyday</span>
          </div>
          <div className="choose-plan__feature">
            <AiOutlineCheck className="choose-plan__check" />
            <span><b>Precise recommendations</b> collections curated by experts</span>
          </div>
        </div>

        {/* PLAN SELECTOR */}
        <h2 className="choose-plan__section--title">Choose the plan that fits you</h2>

        <div className="choose-plan__plans">
          {/* YEARLY */}
          <div
            className={`choose-plan__plan${selectedPlan === "yearly" ? " choose-plan__plan--selected" : ""}`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <div className="choose-plan__plan--radio">
              <div className={`choose-plan__radio--dot${selectedPlan === "yearly" ? " choose-plan__radio--dot--active" : ""}`} />
            </div>
            <div className="choose-plan__plan--info">
              <div className="choose-plan__plan--name">Premium Plus Yearly</div>
              <div className="choose-plan__plan--price">$99.99/year</div>
              <div className="choose-plan__plan--trial">7-day free trial included</div>
            </div>
          </div>

          <div className="choose-plan__or">or</div>

          {/* MONTHLY */}
          <div
            className={`choose-plan__plan${selectedPlan === "monthly" ? " choose-plan__plan--selected" : ""}`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <div className="choose-plan__plan--radio">
              <div className={`choose-plan__radio--dot${selectedPlan === "monthly" ? " choose-plan__radio--dot--active" : ""}`} />
            </div>
            <div className="choose-plan__plan--info">
              <div className="choose-plan__plan--name">Premium Monthly</div>
              <div className="choose-plan__plan--price">$9.99/month</div>
              <div className="choose-plan__plan--trial">No trial included</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="choose-plan__cta">
          <button className="btn choose-plan__btn" onClick={handleSubscribe}>
            {selectedPlan === "yearly" ? "Start your free 7-day trial" : "Get Premium Monthly"}
          </button>
          {selectedPlan === "yearly" && (
            <p className="choose-plan__cancel--note">
              Cancel your trial at any time before it ends, and you won&apos;t be charged.
            </p>
          )}
        </div>

        {/* FAQ ACCORDION */}
        <div className="choose-plan__faq">
          {faqs.map((faq, i) => (
            <div key={i} className="choose-plan__faq--item">
              <button
                className="choose-plan__faq--question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                {openFaq === i ? <BiChevronUp /> : <BiChevronDown />}
              </button>
              {openFaq === i && (
                <div className="choose-plan__faq--answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
