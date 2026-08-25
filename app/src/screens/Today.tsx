import { Link, useNavigate } from 'react-router-dom'
import { BRAND } from '../data/brand'
import { JOURNEYS } from '../data/journeys'
import { practiceForToday } from '../data/practices'
import { formatWhen, getGatherings, relativeDays } from '../data/gatherings'
import { getMoonPhase } from '../lib/moon'
import { hasAccess, useAppState } from '../lib/store'
import { usePracticeLauncher } from '../lib/practiceContext'

/**
 * The home screen from the mockup: hero practice, journeys rail, gathering
 * tile. Everything on it is derived — the practice from the moon, the
 * gathering from the calendar — so it is never the same screen two weeks
 * running.
 */
export function Today() {
  const phase = getMoonPhase()
  const practice = practiceForToday(phase)
  const state = useAppState()
  const launcher = usePracticeLauncher()
  const navigate = useNavigate()

  const gathering = getGatherings()[0]
  const featured = JOURNEYS.slice(0, 3)
  const unlocked = hasAccess(state.tier, practice.tier)

  return (
    <div className="page-enter">
      <header className="header">
        <h1 className="wordmark">{BRAND.name}</h1>
        <p className="header__sub">{BRAND.strapline}</p>
      </header>

      <div className="scroll__inner" style={{ paddingTop: 0 }}>
        {/* --- Today's practice ------------------------------------ */}
        <section className="hero">
          <div className="hero__orb" aria-hidden="true" />
          <div className="eyebrow">Today's sacred practice</div>
          <h2 className="hero__title">{practice.title}</h2>
          <p className="hero__meta">
            <span>{practice.minutes} min</span>
            <span className="dotsep">moon</span>
            <span className="dotsep">{phase.short}</span>
          </p>

          <div className="hero__cta">
            <button
              className="btn btn--gold"
              onClick={() => (unlocked ? launcher.open(practice) : navigate('/membership'))}
            >
              {unlocked ? 'enter the temple →' : 'unlock this practice →'}
            </button>
          </div>

          <p className="hero__teacher">{phase.invitation}</p>
        </section>

        {/* --- Journeys -------------------------------------------- */}
        <h2 className="label">Journeys</h2>
        <ul className="stack">
          {featured.map((journey) => {
            const done = state.journeyProgress[journey.id]?.length ?? 0
            const pct = journey.sessions.length
              ? Math.round((done / journey.sessions.length) * 100)
              : 0
            return (
              <li key={journey.id}>
                <Link to={`/journeys/${journey.id}`} className="card">
                  <div className="row">
                    <div className="row__body">
                      <div className="row__title">{journey.title}</div>
                      <div className="row__meta">{journey.tagline}</div>
                    </div>
                    <span className="row__chev" aria-hidden="true">
                      →
                    </span>
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

        {/* --- Live community -------------------------------------- */}
        <h2 className="label">The temple is open</h2>
        <Link to="/temple" className="gathering">
          <div className="row">
            <div className="row__body">
              <div className="gathering__title">{gathering.title}</div>
              <div className="gathering__meta">
                {formatWhen(gathering.when)} · {relativeDays(gathering.when)}
              </div>
            </div>
            {gathering.live && (
              <span className="pulse">
                <span className="pulse__dot" aria-hidden="true" />
                live
              </span>
            )}
          </div>
        </Link>

        <p className="demo-note">
          Prototype · practice content is placeholder written in Body Temple's voice.
        </p>
      </div>
    </div>
  )
}
