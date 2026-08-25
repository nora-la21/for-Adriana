import { MoonDial } from '../components/MoonDisc'
import { PHASE_ORDER, daysUntilFull, daysUntilNew, getMoonPhase } from '../lib/moon'
import { practicesForPhase } from '../data/practices'
import { hasAccess, useAppState } from '../lib/store'
import { usePracticeLauncher } from '../lib/practiceContext'
import { useNavigate } from 'react-router-dom'

/**
 * The cyclical rail.
 *
 * This is the screen that has no equivalent in a Calm-style app: practice
 * organised by where the moon actually is, not by a release schedule.
 */
export function Cycle() {
  const phase = getMoonPhase()
  const state = useAppState()
  const launcher = usePracticeLauncher()
  const navigate = useNavigate()

  const offered = practicesForPhase(phase.key, phase.energy)
  const toFull = daysUntilFull()
  const toNew = daysUntilNew()

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <header style={{ paddingTop: 22 }}>
          <div className="eyebrow">Where we are</div>
        </header>

        <MoonDial phase={phase} />

        <h1 className="moonphase-name">{phase.name}</h1>
        <p className="moonphase-sub">
          day {Math.floor(phase.age) + 1} of 29 · {Math.round(phase.illumination * 100)}% lit
        </p>

        <p className="detail__blurb" style={{ textAlign: 'center', marginTop: 18 }}>
          {phase.invitation}
        </p>

        {/* The eight-phase rail, with today's segment marked. */}
        <div className="cycle-strip" role="list" aria-label="Lunar cycle">
          {PHASE_ORDER.map((key) => {
            const on = key === phase.key
            return (
              <div
                key={key}
                role="listitem"
                className={`cycle-strip__cell${on ? ' cycle-strip__cell--on' : ''}`}
              >
                <div className="cycle-strip__glyph" aria-hidden="true">
                  {GLYPHS[key]}
                </div>
                <div className="cycle-strip__n">{SHORT[key]}</div>
              </div>
            )
          })}
        </div>

        <div className="stats" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="stat">
            <div className="stat__n">{toFull}</div>
            <div className="stat__k">days to full</div>
          </div>
          <div className="stat">
            <div className="stat__n">{toNew}</div>
            <div className="stat__k">days to new</div>
          </div>
        </div>

        <h2 className="label">Practices for this phase</h2>
        <ul className="stack">
          {offered.map((practice) => {
            const unlocked = hasAccess(state.tier, practice.tier)
            return (
              <li key={practice.id}>
                <button
                  className="card"
                  onClick={() =>
                    unlocked ? launcher.open(practice) : navigate('/membership')
                  }
                >
                  <div className="row">
                    <div className="row__body">
                      <div className="row__title">{practice.title}</div>
                      <div className="row__meta">
                        {practice.minutes} min · {practice.form}
                      </div>
                    </div>
                    {unlocked ? (
                      <span className="row__chev" aria-hidden="true">
                        ▷
                      </span>
                    ) : (
                      <span className="locked">members</span>
                    )}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const GLYPHS: Record<string, string> = {
  new: '🌑',
  'waxing-crescent': '🌒',
  'first-quarter': '🌓',
  'waxing-gibbous': '🌔',
  full: '🌕',
  'waning-gibbous': '🌖',
  'last-quarter': '🌗',
  'waning-crescent': '🌘',
}

const SHORT: Record<string, string> = {
  new: 'new',
  'waxing-crescent': 'cres',
  'first-quarter': 'qtr',
  'waxing-gibbous': 'gib',
  full: 'full',
  'waning-gibbous': 'gib',
  'last-quarter': 'qtr',
  'waning-crescent': 'cres',
}
