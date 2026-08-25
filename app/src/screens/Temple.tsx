import { useNavigate } from 'react-router-dom'
import { formatWhen, getGatherings, relativeDays } from '../data/gatherings'
import { hasAccess, useActions, useAppState } from '../lib/store'

/**
 * The live room.
 *
 * A branded app's real retention advantage over a content platform: the
 * gathering happens somewhere Adriana owns, and attendance is visible.
 */
export function Temple() {
  const gatherings = getGatherings()
  const state = useAppState()
  const { toggleAttending } = useActions()
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      <div className="scroll__inner">
        <header style={{ paddingTop: 22 }}>
          <div className="eyebrow">Gather</div>
          <h1 className="detail__title">The temple is open</h1>
          <p className="detail__blurb">
            Practice alone is a habit. Practice together is a church. Every gathering is
            live, recorded, and yours to keep.
          </p>
        </header>

        <ul className="stack" style={{ marginTop: 26 }}>
          {gatherings.map((g) => {
            const unlocked = hasAccess(state.tier, g.tier)
            const attending = state.attending.includes(g.id)

            return (
              <li key={g.id} className="card">
                <div className="row">
                  <div className="row__body">
                    <div className="row__title">{g.title}</div>
                    <div className="row__meta">
                      {formatWhen(g.when)} · {relativeDays(g.when)}
                    </div>
                  </div>
                  {g.live && (
                    <span className="pulse">
                      <span className="pulse__dot" aria-hidden="true" />
                      live
                    </span>
                  )}
                </div>

                <p className="detail__blurb" style={{ marginTop: 12, fontSize: 13.5 }}>
                  {g.blurb}
                </p>

                <p className="row__meta" style={{ marginTop: 10 }}>
                  {g.place} · {g.minutes} min
                </p>

                <div style={{ marginTop: 14 }}>
                  {unlocked ? (
                    <button
                      className={`btn ${attending ? 'btn--ghost' : 'btn--gold'} btn--block`}
                      onClick={() => toggleAttending(g.id)}
                    >
                      {attending ? '✦ you are coming' : 'save my place'}
                    </button>
                  ) : (
                    <button
                      className="btn btn--ghost btn--block"
                      onClick={() => navigate('/membership')}
                    >
                      members only →
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
