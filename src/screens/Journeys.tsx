import { Link } from 'react-router-dom'
import { JOURNEYS } from '../data/journeys'
import { hasAccess, useAppState } from '../lib/store'

export function Journeys() {
  const state = useAppState()

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <header style={{ paddingTop: 22 }}>
          <div className="eyebrow">The shelf</div>
          <h1 className="detail__title">Journeys</h1>
          <p className="detail__blurb">
            Containers rather than classes. Each one has a beginning and an end, and holds
            you for the length of it.
          </p>
        </header>

        <ul className="stack" style={{ marginTop: 26 }}>
          {JOURNEYS.map((journey) => {
            const done = state.journeyProgress[journey.id]?.length ?? 0
            const pct = journey.sessions.length
              ? Math.round((done / journey.sessions.length) * 100)
              : 0
            const unlocked = hasAccess(state.tier, journey.tier)

            return (
              <li key={journey.id}>
                <Link to={`/journeys/${journey.id}`} className="card">
                  <div className="row">
                    <div className="row__body">
                      <div className="row__title">{journey.title}</div>
                      <div className="row__meta">{journey.tagline}</div>
                    </div>
                    {unlocked ? (
                      <span className="row__chev" aria-hidden="true">
                        →
                      </span>
                    ) : (
                      <span className="locked">members</span>
                    )}
                  </div>
                  {done > 0 && (
                    <div className="progress" aria-label={`${pct}% complete`}>
                      <div className="progress__fill" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
