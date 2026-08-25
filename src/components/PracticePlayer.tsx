import { useEffect, useMemo, useRef, useState } from 'react'
import type { Practice } from '../data/practices'
import { timeline } from '../data/practices'
import type { MoonPhase } from '../lib/moon'

interface Props {
  practice: Practice
  phase: MoonPhase
  onClose: () => void
  onComplete: (practice: Practice) => void
}

function clock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

/**
 * The guided practice itself.
 *
 * The MVP walks the written cues on a timer with a breath ring, because the
 * real audio does not exist yet. The structure is the point: stages, a
 * timed spine, and a completion event that writes to the practice log — all
 * of which stay identical once Adriana's recordings are dropped in and the
 * timer becomes an <audio> element's currentTime.
 */
export function PracticePlayer({ practice, phase, onClose, onComplete }: Props) {
  const { stages, total } = useMemo(() => timeline(practice), [practice])
  const [elapsed, setElapsed] = useState(0)
  const [paused, setPaused] = useState(false)
  const [done, setDone] = useState(false)
  const recorded = useRef(false)

  useEffect(() => {
    if (paused || done) return
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= total) {
          setDone(true)
          return total
        }
        return e + 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [paused, done, total])

  // Record exactly once, when the practice actually finishes.
  useEffect(() => {
    if (done && !recorded.current) {
      recorded.current = true
      onComplete(practice)
    }
  }, [done, onComplete, practice])

  // Escape closes, as it would in any sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const stage = useMemo(() => {
    let acc = 0
    for (const s of stages) {
      acc += s.seconds
      if (elapsed < acc) return s
    }
    return stages[stages.length - 1]
  }, [stages, elapsed])

  if (done) {
    return (
      <div className="player" role="dialog" aria-label="Practice complete">
        <div className="player__bar">
          <span />
          <button className="player__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="player__body">
          <div className="complete">
            <div className="complete__mark" aria-hidden="true">
              ✦
            </div>
            <div className="player__stage">Practice complete</div>
            <h2 className="player__cue" style={{ minHeight: 0 }}>
              {phase.invitation}
            </h2>
            <p className="meta" style={{ marginTop: 18 }}>
              {practice.title} · {practice.minutes} min · logged to your altar
            </p>
          </div>
        </div>
        <div className="player__foot">
          <button className="btn btn--gold btn--block" onClick={onClose}>
            close the temple
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="player" role="dialog" aria-label={`${practice.title} practice`}>
      <div className="player__bar">
        <div className="eyebrow eyebrow--dim">{practice.title}</div>
        <button className="player__close" onClick={onClose} aria-label="Leave practice">
          ✕
        </button>
      </div>

      <div className="player__body">
        <div className="player__stage">{stage.label}</div>
        <h2 className="player__cue" aria-live="polite">
          {stage.cue}
        </h2>
        <div className={`breath${paused ? ' breath--paused' : ''}`} aria-hidden="true">
          <div className="breath__core" />
        </div>
      </div>

      <div className="player__foot">
        <div className="player__time">
          {clock(elapsed)} <span style={{ opacity: 0.5 }}>/ {clock(total)}</span>
        </div>
        <div className="player__track">
          <div
            className="progress__fill"
            style={{ width: `${(elapsed / total) * 100}%`, height: '100%' }}
          />
        </div>
        <div className="player__controls">
          <button className="btn btn--ghost btn--block" onClick={() => setPaused((p) => !p)}>
            {paused ? 'resume' : 'pause'}
          </button>
          <button className="btn btn--gold btn--block" onClick={() => setDone(true)}>
            complete
          </button>
        </div>
      </div>
    </div>
  )
}
