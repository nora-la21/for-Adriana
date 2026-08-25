import { Link, useNavigate, useParams } from 'react-router-dom'
import { getJourney, type Journey, type Session } from '../data/journeys'
import { getPractice, type Practice } from '../data/practices'
import { hasAccess, useAppState } from '../lib/store'
import { usePracticeLauncher } from '../lib/practiceContext'

/**
 * Sessions that do not yet point at a recorded practice still need to open
 * something, so the demo is walkable end to end. This builds a guided shell
 * from the session's own title — replaced the moment real audio exists.
 */
function practiceFromSession(journey: Journey, session: Session): Practice {
  return {
    id: `${journey.id}-${session.n}`,
    title: session.title,
    minutes: session.minutes,
    energy: ['seeding'],
    form: 'meditation',
    blurb: journey.title,
    tier: journey.tier,
    stages: [
      { label: 'Arrive', cue: 'Settle in. Let the practice begin before you are ready.', seconds: 50 },
      { label: journey.title, cue: session.title, seconds: 80 },
      { label: 'Practice', cue: 'Stay with what the body is telling you, not what it should be telling you.', seconds: 80 },
      { label: 'Close', cue: 'Let it land. Come back slowly.', seconds: 45 },
    ],
  }
}

export function JourneyDetail() {
  const { id = '' } = useParams()
  const journey = getJourney(id)
  const state = useAppState()
  const launcher = usePracticeLauncher()
  const navigate = useNavigate()

  if (!journey) {
    return (
      <div className="scroll__inner">
        <Link to="/journeys" className="back">
          ← journeys
        </Link>
        <p className="empty">That journey is not here.</p>
      </div>
    )
  }

  const unlocked = hasAccess(state.tier, journey.tier)
  const done = state.journeyProgress[journey.id] ?? []

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <Link to="/journeys" className="back">
          ← journeys
        </Link>

        <h1 className="detail__title">{journey.title}</h1>
        <p className="row__meta" style={{ marginTop: 8 }}>
          {journey.tagline}
        </p>
        <p className="detail__blurb">{journey.blurb}</p>

        {!unlocked && (
          <div style={{ marginTop: 20 }}>
            <button className="btn btn--gold btn--block" onClick={() => navigate('/membership')}>
              unlock with membership →
            </button>
          </div>
        )}

        {journey.external && (
          <div style={{ marginTop: 20 }}>
            <a
              className="btn btn--ghost btn--block"
              href={journey.external.url}
              target="_blank"
              rel="noreferrer"
            >
              {journey.external.label} →
            </a>
          </div>
        )}

        {journey.sessions.length > 0 ? (
          <>
            <h2 className="label">
              Sessions
              {done.length > 0 && (
                <span style={{ color: 'var(--bt-cream-dim)' }}>
                  {' '}
                  · {done.length} of {journey.sessions.length}
                </span>
              )}
            </h2>
            <ul className="stack">
              {journey.sessions.map((session) => {
                const isDone = done.includes(session.n)
                // The free tier gets the first three sessions of any journey —
                // enough to build the habit before the paywall.
                const sessionOpen = unlocked || session.n <= 3

                return (
                  <li key={session.n}>
                    <button
                      className={`session${isDone ? ' session--done' : ''}`}
                      onClick={() => {
                        if (!sessionOpen) {
                          navigate('/membership')
                          return
                        }
                        const practice =
                          (session.practiceId ? getPractice(session.practiceId) : undefined) ??
                          practiceFromSession(journey, session)
                        launcher.open(practice, { id: journey.id, session: session.n })
                      }}
                    >
                      <span className={`session__n${isDone ? ' session__n--done' : ''}`}>
                        {isDone ? '✦' : session.n}
                      </span>
                      <span className="row__body">
                        <span className="session__t">{session.title}</span>
                        <span className="session__m">
                          {session.minutes} min
                          {!sessionOpen && ' · members'}
                        </span>
                      </span>
                      <span className="row__chev" aria-hidden="true">
                        {sessionOpen ? '▷' : '·'}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <p className="empty">
            Dates for this one are announced to members first. Join the waitlist above and
            you will hear before it goes public.
          </p>
        )}
      </div>
    </div>
  )
}
