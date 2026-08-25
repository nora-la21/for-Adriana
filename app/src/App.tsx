import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'

import { Nav } from './components/Nav'
import { PracticePlayer } from './components/PracticePlayer'
import { PracticeContext } from './lib/practiceContext'
import { getMoonPhase } from './lib/moon'
import { todayKey, useActions } from './lib/store'
import type { Practice } from './data/practices'

import { Today } from './screens/Today'
import { Journeys } from './screens/Journeys'
import { JourneyDetail } from './screens/JourneyDetail'
import { Cycle } from './screens/Cycle'
import { Temple } from './screens/Temple'
import { Altar } from './screens/Altar'
import { Membership } from './screens/Membership'

/** Decorative status bar — only rendered in the desktop handset frame. */
function StatusBar() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="statusbar" aria-hidden="true">
      <span>
        {time.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }).replace(/\s?[ap]m/i, '')}
      </span>
      <span className="statusbar__glyphs">
        <i className="statusbar__dot" />
        <i className="statusbar__dot" />
        <i className="statusbar__dot" />
        <span className="statusbar__bars">
          <i style={{ height: 4 }} />
          <i style={{ height: 6 }} />
          <i style={{ height: 8.5 }} />
          <i style={{ height: 11 }} />
        </span>
      </span>
    </div>
  )
}

/** A new screen should start at the top, the way a native push does. */
function ScrollReset({ target }: { target: React.RefObject<HTMLDivElement> }) {
  const { pathname } = useLocation()
  useEffect(() => {
    target.current?.scrollTo({ top: 0 })
  }, [pathname, target])
  return null
}

function Chrome() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { completePractice, completeSession } = useActions()

  const [active, setActive] = useState<{
    practice: Practice
    journey?: { id: string; session: number }
  } | null>(null)

  const phase = useMemo(() => getMoonPhase(), [])

  const open = useCallback(
    (practice: Practice, journey?: { id: string; session: number }) => {
      setActive({ practice, journey })
    },
    [],
  )

  const launcher = useMemo(() => ({ open }), [open])

  const handleComplete = useCallback(
    (practice: Practice) => {
      completePractice({
        date: todayKey(),
        practiceId: practice.id,
        title: practice.title,
        minutes: practice.minutes,
        moonPhase: phase.name.toLowerCase(),
      })
      if (active?.journey) {
        completeSession(active.journey.id, active.journey.session)
      }
    },
    [active, completePractice, completeSession, phase.name],
  )

  return (
    <PracticeContext.Provider value={launcher}>
      <div className="shell">
        {/* Presentation context — only on a wide screen, i.e. when this is
            being shown rather than used. Invisible on a phone. */}
        <aside className="stage-note" aria-hidden="true">
          <div className="eyebrow">Concept prototype</div>
          <h2 className="stage-note__title">body temple</h2>
          <p className="stage-note__body">
            A branded daily-practice app for Adriana Rizzolo — devotional movement, breath
            and ritual, organised by the moon rather than by a content calendar.
          </p>
          <p className="stage-note__body">
            Everything here is clickable. Enter today's practice, open a journey, move
            through the cycle, or change the membership tier to see what unlocks.
          </p>
          <p className="stage-note__fine">
            Live moon phase · practice logged to the altar · $25 and $44 tiers as published
          </p>
        </aside>

        <div className="shell__device">
          <StatusBar />

          <div className="scroll" ref={scrollRef}>
            <ScrollReset target={scrollRef} />
            <Routes>
              <Route path="/" element={<Today />} />
              <Route path="/journeys" element={<Journeys />} />
              <Route path="/journeys/:id" element={<JourneyDetail />} />
              <Route path="/cycle" element={<Cycle />} />
              <Route path="/temple" element={<Temple />} />
              <Route path="/altar" element={<Altar />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="*" element={<Today />} />
            </Routes>
          </div>

          <Nav />

          {active && (
            <PracticePlayer
              practice={active.practice}
              phase={phase}
              onClose={() => setActive(null)}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </PracticeContext.Provider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Chrome />
    </HashRouter>
  )
}
