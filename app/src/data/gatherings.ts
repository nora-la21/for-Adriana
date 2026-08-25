/**
 * Live gatherings — the community rail.
 *
 * The reason a branded app beats a content platform: the live room is the
 * retention engine, and it can only live somewhere Adriana owns. Recurring
 * gatherings compute their next occurrence so the demo is never stale.
 */

import { nextPhaseDate } from '../lib/moon'
import type { Tier } from '../lib/store'

export interface Gathering {
  id: string
  title: string
  /** Where it happens. */
  place: string
  /** Resolved date of the next occurrence. */
  when: Date
  minutes: number
  tier: Tier
  blurb: string
  /** Shows the live pulse indicator. */
  live: boolean
}

/** Next occurrence of a weekday (0 = Sunday) at a given local hour. */
function nextWeekday(weekday: number, hour: number, from: Date = new Date()): Date {
  const d = new Date(from)
  d.setHours(hour, 0, 0, 0)
  let delta = (weekday - d.getDay() + 7) % 7
  if (delta === 0 && d.getTime() <= from.getTime()) delta = 7
  d.setDate(d.getDate() + delta)
  return d
}

function atHour(date: Date, hour: number): Date {
  const d = new Date(date)
  d.setHours(hour, 0, 0, 0)
  return d
}

export function getGatherings(now: Date = new Date()): Gathering[] {
  const list: Gathering[] = [
    {
      id: 'temple-gathering',
      title: 'Temple gathering',
      place: 'Live · online',
      when: nextWeekday(0, 17, now), // Sundays, 5pm local
      minutes: 75,
      tier: 'seeker',
      live: true,
      blurb:
        'The weekly room. Practice together, then stay for the conversation afterwards. Recorded for anyone who cannot make it live.',
    },
    {
      id: 'full-moon-dance',
      title: 'Full Moon Body Temple Dance',
      place: 'Live · online',
      when: atHour(nextPhaseDate('full', now), 19),
      minutes: 90,
      tier: 'shakti',
      live: true,
      blurb:
        'The full moon ritual. Movement, sound and being witnessed, held as ceremony. The one gathering people plan their month around.',
    },
    {
      id: 'new-moon-circle',
      title: 'New Moon Circle',
      place: 'Live · online',
      when: atHour(nextPhaseDate('new', now), 18),
      minutes: 60,
      tier: 'seeker',
      live: true,
      blurb:
        'Quiet, seated, and slow. Naming what is beginning, in company. Cameras optional.',
    },
    {
      id: 'ojai-in-person',
      title: 'Body Temple · in person',
      place: 'Ojai, California',
      when: nextWeekday(6, 10, now), // Saturdays
      minutes: 180,
      tier: 'seeker',
      live: false,
      blurb:
        'The in-person room in Ojai. Same practice, different nervous system — bodies in a shared space do something the screen cannot.',
    },
  ]

  return list.sort((a, b) => a.when.getTime() - b.when.getTime())
}

export function getGathering(id: string, now: Date = new Date()): Gathering | undefined {
  return getGatherings(now).find((g) => g.id === id)
}

/** "Sunday · 5:00 pm" — short, human, no year. */
export function formatWhen(date: Date): string {
  const day = date.toLocaleDateString(undefined, { weekday: 'long' })
  const time = date
    .toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    .toLowerCase()
  return `${day} · ${time}`
}

/** "in 3 days" / "today" / "tomorrow". */
export function relativeDays(date: Date, now: Date = new Date()): string {
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const days = Math.round((startOf(date) - startOf(now)) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days < 7) return `in ${days} days`
  const weeks = Math.round(days / 7)
  return weeks === 1 ? 'in a week' : `in ${weeks} weeks`
}
