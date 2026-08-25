import { Link } from 'react-router-dom'
import { BRAND } from '../data/brand'
import { getTierDef } from '../data/tiers'
import { currentStreak, todayKey, useActions, useAppState } from '../lib/store'

/** The last seven days, oldest first, for the streak row. */
function lastSevenDays(): { key: string; letter: string }[] {
  const out: { key: string; letter: string }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    out.push({ key: todayKey(d), letter: d.toLocaleDateString(undefined, { weekday: 'narrow' }) })
  }
  return out
}

export function Altar() {
  const state = useAppState()
  const { reset } = useActions()

  const streak = currentStreak(state.devotionDates)
  const minutes = state.log.reduce((sum, r) => sum + r.minutes, 0)
  const week = lastSevenDays()
  const tier = getTierDef(state.tier)
  const practisedToday = state.devotionDates.includes(todayKey())

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <header style={{ paddingTop: 22 }}>
          <div className="eyebrow">Your altar</div>
          <h1 className="detail__title">
            {practisedToday ? 'You practised today.' : 'The mat is waiting.'}
          </h1>
          <p className="detail__blurb">
            Kept quietly, and only for you. No leaderboards, no streak guilt — if you miss a
            day, the practice is still yours.
          </p>
        </header>

        <div className="stats">
          <div className="stat">
            <div className="stat__n">{streak}</div>
            <div className="stat__k">day streak</div>
          </div>
          <div className="stat">
            <div className="stat__n">{state.log.length}</div>
            <div className="stat__k">devotions</div>
          </div>
          <div className="stat">
            <div className="stat__n">{minutes}</div>
            <div className="stat__k">minutes</div>
          </div>
        </div>

        <h2 className="label">This week</h2>
        <div className="streak">
          {week.map((day) => (
            <div
              key={day.key}
              className={`streak__d${state.devotionDates.includes(day.key) ? ' streak__d--on' : ''}`}
              title={day.key}
            >
              {day.letter}
            </div>
          ))}
        </div>

        <h2 className="label">Membership</h2>
        <Link to="/membership" className="card">
          <div className="row">
            <div className="row__body">
              <div className="row__title">{tier.name}</div>
              <div className="row__meta">
                {tier.price}
                {tier.cadence} · {tier.pitch}
              </div>
            </div>
            <span className="row__chev" aria-hidden="true">
              →
            </span>
          </div>
        </Link>

        <h2 className="label">Practice log</h2>
        {state.log.length === 0 ? (
          <p className="empty">
            Nothing here yet. Your first practice will be written down the moment you
            finish it.
          </p>
        ) : (
          <ul className="stack">
            {state.log.slice(0, 12).map((record, i) => (
              <li key={`${record.date}-${record.practiceId}-${i}`} className="card">
                <div className="row">
                  <div className="row__body">
                    <div className="session__t">{record.title}</div>
                    <div className="session__m">
                      {record.date} · {record.minutes} min · {record.moonPhase}
                    </div>
                  </div>
                  <span className="row__chev" aria-hidden="true">
                    ✦
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className="label">Body Temple</h2>
        <ul className="stack">
          <li>
            <a className="card" href={BRAND.links.web} target="_blank" rel="noreferrer">
              <div className="row">
                <div className="row__body">
                  <div className="session__t">bodytemple.church</div>
                  <div className="session__m">Retreats, trainings and 1:1 sessions</div>
                </div>
                <span className="row__chev" aria-hidden="true">↗</span>
              </div>
            </a>
          </li>
          <li>
            <a className="card" href={BRAND.links.substack} target="_blank" rel="noreferrer">
              <div className="row">
                <div className="row__body">
                  <div className="session__t">Mother of the Sword</div>
                  <div className="session__m">The podcast and letters</div>
                </div>
                <span className="row__chev" aria-hidden="true">↗</span>
              </div>
            </a>
          </li>
          <li>
            <a className="card" href={BRAND.links.instagram} target="_blank" rel="noreferrer">
              <div className="row">
                <div className="row__body">
                  <div className="session__t">@artofloving</div>
                  <div className="session__m">Instagram</div>
                </div>
                <span className="row__chev" aria-hidden="true">↗</span>
              </div>
            </a>
          </li>
        </ul>

        <p className="demo-note">
          {BRAND.teacherBio}
          <br />
          <br />
          Prototype · practice state is stored on this device only.
        </p>

        <div style={{ marginTop: 14 }}>
          <button className="btn btn--ghost btn--block" onClick={reset}>
            reset the demo
          </button>
        </div>
      </div>
    </div>
  )
}
