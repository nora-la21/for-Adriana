/**
 * Journeys — the multi-session containers.
 *
 * These map onto Body Temple's real catalogue (Return to Earth, Temple of
 * Shakti, Sacred Sexuality, Body Temple Dance) rather than to invented
 * product names, so the demo reads as Adriana's own shelf.
 *
 * PLACEHOLDER CONTENT: session titles are written in Body Temple's register
 * to show structure. Adriana's real curriculum replaces them.
 */

import type { Tier } from '../lib/store'

export interface Session {
  n: number
  title: string
  minutes: number
  /** Optional pointer into the practice library. */
  practiceId?: string
}

export interface Journey {
  id: string
  title: string
  /** Shown in the row under the title, e.g. "flagship · 21 days · devotional". */
  tagline: string
  kind: 'course' | 'cycle' | 'series' | 'training'
  blurb: string
  tier: Tier
  sessions: Session[]
  /** Live cohort programmes link out rather than playing in-app. */
  external?: { label: string; url: string }
}

export const JOURNEYS: Journey[] = [
  {
    id: 'return-to-earth',
    title: 'Return to Earth',
    tagline: 'flagship · 21 days · devotional',
    kind: 'course',
    tier: 'seeker',
    blurb:
      'The doorway course. Twenty-one days of coming back into the body — weight, breath, contact, and the slow work of belonging to yourself again. Trauma-informed throughout; nothing here asks you to push.',
    sessions: [
      { n: 1, title: 'The floor is holding you', minutes: 16, practiceId: 'return-to-earth' },
      { n: 2, title: 'Where the breath stops', minutes: 18, practiceId: 'devotional-flow-breath' },
      { n: 3, title: 'Weight, and letting it go', minutes: 16 },
      { n: 4, title: 'The front of the body', minutes: 20 },
      { n: 5, title: 'What the hips are keeping', minutes: 22 },
      { n: 6, title: 'Rest as a practice, not a reward', minutes: 28, practiceId: 'yoga-nidra-evening' },
      { n: 7, title: 'First week · witness', minutes: 24 },
      { n: 8, title: 'Sound before language', minutes: 19 },
      { n: 9, title: 'The armour you built for good reason', minutes: 21 },
      { n: 10, title: 'Grief lives somewhere specific', minutes: 22, practiceId: 'grief-and-aliveness' },
      { n: 11, title: 'Aliveness, in the same body', minutes: 20 },
      { n: 12, title: 'Moving without performing', minutes: 25 },
      { n: 13, title: 'The spine as a channel', minutes: 20, practiceId: 'shakti-rising' },
      { n: 14, title: 'Second week · witness', minutes: 24 },
      { n: 15, title: 'Appetite is information', minutes: 18 },
      { n: 16, title: 'Boundaries as a body sensation', minutes: 21 },
      { n: 17, title: 'Being touched by your own hands', minutes: 19 },
      { n: 18, title: 'The holiness of the ordinary body', minutes: 23 },
      { n: 19, title: 'Devotion without self-improvement', minutes: 25, practiceId: 'devotional-flow-breath' },
      { n: 20, title: 'What you will keep doing', minutes: 20 },
      { n: 21, title: 'Return · closing ritual', minutes: 32 },
    ],
  },
  {
    id: 'moon-cycle',
    title: 'Moon Cycle Practice',
    tagline: '28 days · honour the rhythm',
    kind: 'cycle',
    tier: 'seeker',
    blurb:
      'A full lunation of practice that changes as the moon does. Inward at the dark, building through the waxing, expressive at full, releasing on the way down. Begin on any day — the app finds your place in the cycle.',
    sessions: [
      { n: 1, title: 'Dark moon · descent', minutes: 18, practiceId: 'dark-moon-descent' },
      { n: 2, title: 'New moon · seeding the cycle', minutes: 14, practiceId: 'morning-seed' },
      { n: 3, title: 'Waxing crescent · something beginning', minutes: 16, practiceId: 'return-to-earth' },
      { n: 4, title: 'Waxing · devotional flow', minutes: 25, practiceId: 'devotional-flow-breath' },
      { n: 5, title: 'First quarter · meeting resistance', minutes: 20, practiceId: 'shakti-rising' },
      { n: 6, title: 'Waxing gibbous · taking up room', minutes: 22 },
      { n: 7, title: 'Full moon · body temple dance', minutes: 32, practiceId: 'body-temple-dance' },
      { n: 8, title: 'Waning gibbous · speaking it', minutes: 20 },
      { n: 9, title: 'Last quarter · putting it down', minutes: 22, practiceId: 'grief-and-aliveness' },
      { n: 10, title: 'Waning crescent · being carried', minutes: 28, practiceId: 'yoga-nidra-evening' },
    ],
  },
  {
    id: 'temple-of-shakti',
    title: 'Temple of Shakti',
    tagline: 'training · tantric lineage · 6 months',
    kind: 'training',
    tier: 'shakti',
    blurb:
      'The training container. The goddesses of the tantric tradition, somatic and trauma healing, ceremony and ritual craft — for practitioners going deeper, and for those on the path to teaching.',
    sessions: [
      { n: 1, title: 'Meeting Shakti · what the word actually means', minutes: 46 },
      { n: 2, title: 'Kali · the one who ends things', minutes: 52 },
      { n: 3, title: 'Lalita · sweetness as a discipline', minutes: 48 },
      { n: 4, title: 'Durga · boundaries and the protective body', minutes: 50 },
      { n: 5, title: 'Saraswati · voice, sound, and the throat', minutes: 44 },
      { n: 6, title: 'Ceremony craft · holding a room safely', minutes: 58 },
      { n: 7, title: 'Trauma-informed facilitation', minutes: 62 },
      { n: 8, title: 'Closing ceremony · initiation', minutes: 70 },
    ],
  },
  {
    id: 'sacred-sexuality',
    title: 'Sacred Sexuality Series',
    tagline: 'series · adult education · 8 sessions',
    kind: 'series',
    tier: 'shakti',
    blurb:
      'Adult sex education from a somatic, trauma-informed and devotional frame. Consent, boundaries, appetite, shame, and pleasure as a legitimate part of spiritual life. Members only, and paced so you can stop at any point.',
    sessions: [
      { n: 1, title: 'Shame, and where it was learned', minutes: 38 },
      { n: 2, title: 'Consent as an ongoing body conversation', minutes: 42 },
      { n: 3, title: 'The nervous system in intimacy', minutes: 40 },
      { n: 4, title: 'Appetite, wanting, and permission', minutes: 36 },
      { n: 5, title: 'Boundaries that are felt, not argued', minutes: 39 },
      { n: 6, title: 'Pleasure without performance', minutes: 41 },
      { n: 7, title: 'Repair after rupture', minutes: 44 },
      { n: 8, title: 'Right relationship · closing', minutes: 46 },
    ],
  },
  {
    id: 'body-temple-dance',
    title: 'Body Temple Dance',
    tagline: 'signature ritual · ongoing',
    kind: 'series',
    tier: 'temple',
    blurb:
      "Adriana's dance healing ritual — movement, sound and imagination, held as ceremony rather than class. New rituals released each moon, live and recorded.",
    sessions: [
      { n: 1, title: 'Shake · the first ten minutes', minutes: 28, practiceId: 'body-temple-dance' },
      { n: 2, title: 'Sound · letting it be ugly', minutes: 30 },
      { n: 3, title: 'Imagination · dancing as someone else', minutes: 34 },
      { n: 4, title: 'Witness · being seen while moving', minutes: 36 },
      { n: 5, title: 'Full moon ritual · live recording', minutes: 52 },
    ],
  },
  {
    id: 'unleashed-nyc',
    title: 'Unleashed · NYC',
    tagline: 'in person · retreat · 2026',
    kind: 'course',
    tier: 'seeker',
    blurb:
      'The in-person retreat. Three days of dance, ceremony and somatic work in New York. Places are limited and released to members first.',
    external: { label: 'Join the waitlist', url: 'https://www.bodytemple.church/waitlist-2026' },
    sessions: [],
  },
]

export function getJourney(id: string): Journey | undefined {
  return JOURNEYS.find((j) => j.id === id)
}
