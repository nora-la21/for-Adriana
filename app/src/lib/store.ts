/**
 * Practice state — streak, completed sessions, membership tier.
 *
 * MVP persistence is localStorage: the demo runs with no backend and no
 * sign-in, so Adriana can open the link on her phone and the app remembers
 * her. The shape below is deliberately the shape a real API would return,
 * so swapping `load`/`save` for fetch calls is the only change needed when
 * this graduates to accounts and Stripe.
 */

import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'body-temple:v1'

export type Tier = 'seeker' | 'shakti' | 'temple'

export interface PracticeRecord {
  /** Local calendar date, YYYY-MM-DD. */
  date: string
  practiceId: string
  title: string
  minutes: number
  moonPhase: string
}

export interface State {
  tier: Tier
  /** ISO dates on which at least one practice was completed. */
  devotionDates: string[]
  /** Most recent first. */
  log: PracticeRecord[]
  /** journeyId -> completed session numbers. */
  journeyProgress: Record<string, number[]>
  /** Gathering ids the member has said yes to. */
  attending: string[]
}

const EMPTY: State = {
  tier: 'seeker',
  devotionDates: [],
  log: [],
  journeyProgress: {},
  attending: [],
}

export function todayKey(d: Date = new Date()): string {
  // Local date, not UTC — a practice at 11pm should count for that day.
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function load(): State {
  if (typeof localStorage === 'undefined') return EMPTY
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<State>
    return { ...EMPTY, ...parsed }
  } catch {
    // Private windows and cleared site data both land here.
    return EMPTY
  }
}

let state: State = load()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function commit(next: State) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage can be unavailable; the session still works in memory.
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function snapshot(): State {
  return state
}

export function useAppState(): State {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY)
}

/** Longest run of consecutive days ending today (or yesterday). */
export function currentStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const set = new Set(dates)
  const cursor = new Date()

  // A streak survives until the end of the following day, so someone who
  // practised yesterday but not yet today still sees their count.
  if (!set.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!set.has(todayKey(cursor))) return 0
  }

  let n = 0
  while (set.has(todayKey(cursor))) {
    n += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return n
}

export function useActions() {
  const completePractice = useCallback((record: PracticeRecord) => {
    const dates = state.devotionDates.includes(record.date)
      ? state.devotionDates
      : [...state.devotionDates, record.date]

    commit({
      ...state,
      devotionDates: dates,
      log: [record, ...state.log].slice(0, 120),
    })
  }, [])

  const completeSession = useCallback((journeyId: string, session: number) => {
    const done = state.journeyProgress[journeyId] ?? []
    if (done.includes(session)) return
    commit({
      ...state,
      journeyProgress: {
        ...state.journeyProgress,
        [journeyId]: [...done, session].sort((a, b) => a - b),
      },
    })
  }, [])

  const setTier = useCallback((tier: Tier) => {
    commit({ ...state, tier })
  }, [])

  const toggleAttending = useCallback((gatheringId: string) => {
    const on = state.attending.includes(gatheringId)
    commit({
      ...state,
      attending: on
        ? state.attending.filter((id) => id !== gatheringId)
        : [...state.attending, gatheringId],
    })
  }, [])

  const reset = useCallback(() => commit(EMPTY), [])

  return { completePractice, completeSession, setTier, toggleAttending, reset }
}

/** Tier ranking, for gating content. */
const RANK: Record<Tier, number> = { seeker: 0, shakti: 1, temple: 2 }

export function hasAccess(tier: Tier, required: Tier): boolean {
  return RANK[tier] >= RANK[required]
}
