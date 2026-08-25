/**
 * Moon cycle engine.
 *
 * The cyclical rail is the thing a Calm-style app structurally cannot do:
 * practice that changes with the moon rather than with a content calendar.
 * Everything downstream (today's practice, the cycle strip, the invitation
 * copy) is derived from this file.
 *
 * Accuracy note: this is a mean-synodic approximation. It tracks the true
 * phase to within a few hours, which is well inside the tolerance of a
 * practice recommendation. A production build would swap in a proper
 * ephemeris if Adriana ever wants exact ritual timing.
 */

/** Mean length of one lunation, in days. */
const SYNODIC_MONTH = 29.530588853

/** A known new moon: 2000-01-06 18:14 UTC. */
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14)

const MS_PER_DAY = 86_400_000

export type PhaseKey =
  | 'new'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent'

export interface MoonPhase {
  key: PhaseKey
  /** Display name, e.g. "Waxing Crescent". */
  name: string
  /** Short lowercase form used inline in metadata rows, e.g. "waxing". */
  short: string
  glyph: string
  /** Days since the last new moon, 0 … 29.53. */
  age: number
  /** Illuminated fraction of the disc, 0 … 1. */
  illumination: number
  /** True between new and full. */
  waxing: boolean
  /** Position in the lunation, 0 … 1. */
  fraction: number
  /** The invitation Adriana's practice makes at this point in the cycle. */
  invitation: string
  /** Practice quality the cycle asks for — drives today's selection. */
  energy: 'inward' | 'seeding' | 'building' | 'expressive' | 'releasing'
}

const PHASES: Record<
  PhaseKey,
  { name: string; short: string; glyph: string; invitation: string; energy: MoonPhase['energy'] }
> = {
  new: {
    name: 'New Moon',
    short: 'new',
    glyph: '●',
    invitation: 'The dark is not empty. Rest here, and let the next thing name itself.',
    energy: 'inward',
  },
  'waxing-crescent': {
    name: 'Waxing Crescent',
    short: 'waxing',
    glyph: '☽',
    invitation: 'Something is beginning in you. Move slowly enough to feel it arrive.',
    energy: 'seeding',
  },
  'first-quarter': {
    name: 'First Quarter',
    short: 'first quarter',
    glyph: '◐',
    invitation: 'Half-lit and still rising. Meet the resistance without hardening against it.',
    energy: 'building',
  },
  'waxing-gibbous': {
    name: 'Waxing Gibbous',
    short: 'waxing',
    glyph: '◕',
    invitation: 'Almost full. Let the body take up the room it has been asking for.',
    energy: 'building',
  },
  full: {
    name: 'Full Moon',
    short: 'full',
    glyph: '○',
    invitation: 'Everything is visible tonight. Dance it, sound it, let it be witnessed.',
    energy: 'expressive',
  },
  'waning-gibbous': {
    name: 'Waning Gibbous',
    short: 'waning',
    glyph: '◔',
    invitation: 'The tide turns. Speak what the fullness showed you before it fades.',
    energy: 'releasing',
  },
  'last-quarter': {
    name: 'Last Quarter',
    short: 'last quarter',
    glyph: '◑',
    invitation: 'Put something down. Grief is allowed to be part of the practice.',
    energy: 'releasing',
  },
  'waning-crescent': {
    name: 'Waning Crescent',
    short: 'waning',
    glyph: '☾',
    invitation: 'Almost dark again. Soften, and let yourself be carried for a day.',
    energy: 'inward',
  },
}

/** Ordered phase keys, starting at the new moon. */
export const PHASE_ORDER: PhaseKey[] = [
  'new',
  'waxing-crescent',
  'first-quarter',
  'waxing-gibbous',
  'full',
  'waning-gibbous',
  'last-quarter',
  'waning-crescent',
]

/** Days since the last new moon. */
export function moonAge(date: Date = new Date()): number {
  const elapsed = (date.getTime() - KNOWN_NEW_MOON) / MS_PER_DAY
  return ((elapsed % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH
}

function phaseKeyFor(fraction: number): PhaseKey {
  // Eight equal segments, each centred on its named phase — so the moon reads
  // as "new" for the day and a half either side of exact new, not just at the
  // instant of it.
  const segment = Math.floor(((fraction + 1 / 16) % 1) * 8) % 8
  return PHASE_ORDER[segment]
}

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const age = moonAge(date)
  const fraction = age / SYNODIC_MONTH
  const key = phaseKeyFor(fraction)

  // Illuminated fraction of the disc.
  const illumination = (1 - Math.cos(2 * Math.PI * fraction)) / 2

  return {
    key,
    ...PHASES[key],
    age,
    illumination,
    waxing: fraction < 0.5,
    fraction,
  }
}

/** Days until the next full moon — used for the gathering countdown. */
export function daysUntilFull(date: Date = new Date()): number {
  const age = moonAge(date)
  const half = SYNODIC_MONTH / 2
  const remaining = age <= half ? half - age : SYNODIC_MONTH - age + half
  return Math.round(remaining)
}

/** Days until the next new moon. */
export function daysUntilNew(date: Date = new Date()): number {
  return Math.round(SYNODIC_MONTH - moonAge(date))
}

/** The date of the next occurrence of a given phase, for scheduling. */
export function nextPhaseDate(key: PhaseKey, from: Date = new Date()): Date {
  const targetFraction = PHASE_ORDER.indexOf(key) / 8
  const current = moonAge(from) / SYNODIC_MONTH
  let delta = targetFraction - current
  if (delta <= 0) delta += 1
  return new Date(from.getTime() + delta * SYNODIC_MONTH * MS_PER_DAY)
}
