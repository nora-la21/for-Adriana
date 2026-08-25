import { useNavigate } from 'react-router-dom'
import { TIERS } from '../data/tiers'
import { BRAND } from '../data/brand'
import { useActions, useAppState } from '../lib/store'

/**
 * The subscription screen.
 *
 * Prices mirror Body Temple's published offers. In the MVP, choosing a tier
 * simply switches local state so the gating can be walked through end to
 * end; the production build puts Stripe (or RevenueCat, for App Store
 * billing) behind exactly this call.
 */
export function Membership() {
  const state = useAppState()
  const { setTier } = useActions()
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <button className="back" onClick={() => navigate(-1)}>
          ← back
        </button>

        <h1 className="detail__title">Join the temple</h1>
        <p className="detail__blurb">{BRAND.mission}</p>

        <ul className="stack" style={{ marginTop: 26 }}>
          {TIERS.map((tier) => {
            const current = state.tier === tier.id
            return (
              <li key={tier.id}>
                <button
                  className={`tier${current ? ' tier--on' : ''}`}
                  onClick={() => setTier(tier.id)}
                  aria-pressed={current}
                >
                  <div className="tier__head">
                    <span className="tier__name">{tier.name}</span>
                    <span className="tier__price">
                      {tier.price}
                      {tier.cadence && <span>{tier.cadence}</span>}
                    </span>
                  </div>

                  <p className="row__meta" style={{ marginTop: 6 }}>
                    {tier.pitch}
                  </p>

                  <div className="tier__list">
                    {tier.includes.map((line) => (
                      <div className="tier__li" key={line}>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  {tier.terms && (
                    <p className="session__m" style={{ marginTop: 12 }}>
                      {tier.terms}
                    </p>
                  )}

                  <div style={{ marginTop: 16 }}>
                    <span className={`btn ${current ? 'btn--ghost' : 'btn--gold'} btn--block`}>
                      {current ? '✦ your membership' : `choose ${tier.name.toLowerCase()}`}
                    </span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="terms">
          Prototype · no payment is taken and no card is requested. Selecting a tier only
          changes what this demo unlocks.
        </p>
      </div>
    </div>
  )
}
