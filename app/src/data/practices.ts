/**
 * The daily practice library.
 *
 * Each practice declares the cycle energy it serves. Today's practice is
 * chosen by reading the moon first and the library second — which is the
 * inversion that makes this a ritual app rather than a content app. A
 * content app asks "what's next in the feed"; this asks "where is she in
 * the cycle, and what does that ask for".
 *
 * PLACEHOLDER CONTENT: titles, cues and durations are modelled on Body
 * Temple's public catalogue and voice, not transcribed from Adriana's
 * recordings. Real audio and real cue scripts replace this wholesale.
 */

import type { MoonPhase, PhaseKey } from '../lib/moon'
import type { Tier } from '../lib/store'

export interface Practice {
  id: string
  title: string
  minutes: number
  /** Which cycle energies this practice serves. */
  energy: MoonPhase['energy'][]
  form: 'dance' | 'breath' | 'meditation' | 'nidra' | 'sound' | 'ritual'
  /** One line, shown under the title. */
  blurb: string
  /** Guided cues, walked through in the player. */
  stages: { label: string; cue: string; seconds: number }[]
  tier: Tier
}

export const PRACTICES: Practice[] = [
  {
    id: 'devotional-flow-breath',
    title: 'Devotional Flow + Breath',
    minutes: 25,
    energy: ['seeding', 'building'],
    form: 'breath',
    blurb: 'Slow movement married to breath, until the body stops arguing.',
    tier: 'seeker',
    stages: [
      { label: 'Arrive', cue: 'Put both feet on the floor. Nothing has to happen yet.', seconds: 40 },
      { label: 'Breath', cue: 'In through the nose, low into the belly. Let the out-breath be longer than the in.', seconds: 60 },
      { label: 'Breath', cue: 'Follow the breath down. Notice where it stops, and do not force it past.', seconds: 60 },
      { label: 'Move', cue: 'Let the spine begin to move with the breath. Small. Unimpressive. Yours.', seconds: 70 },
      { label: 'Move', cue: 'Open the front of the body. This is the part we armour first.', seconds: 70 },
      { label: 'Devotion', cue: 'Hands to the centre of the chest. Say inwardly: this body is not a project.', seconds: 55 },
      { label: 'Rest', cue: 'Stop moving. Stay upright. Let the practice finish itself in you.', seconds: 45 },
    ],
  },
  {
    id: 'dark-moon-descent',
    title: 'Dark Moon Descent',
    minutes: 18,
    energy: ['inward'],
    form: 'meditation',
    blurb: 'A held, quiet practice for the days when nothing wants to begin.',
    tier: 'seeker',
    stages: [
      { label: 'Arrive', cue: 'Lie down. Let the floor take more of your weight than usual.', seconds: 50 },
      { label: 'Descend', cue: 'Attention travels down: throat, chest, belly, hips. No commentary.', seconds: 70 },
      { label: 'Descend', cue: 'Find the place that is tired. Stay there without trying to fix it.', seconds: 70 },
      { label: 'Dark', cue: 'The dark moon is not absence. Something is being made where you cannot see it.', seconds: 60 },
      { label: 'Rest', cue: 'Nothing to carry out of here. Rest is the whole practice tonight.', seconds: 50 },
    ],
  },
  {
    id: 'body-temple-dance',
    title: 'Body Temple Dance · Full Moon',
    minutes: 32,
    energy: ['expressive'],
    form: 'dance',
    blurb: "Adriana's signature dance ritual. Movement, sound, and being witnessed.",
    tier: 'shakti',
    stages: [
      { label: 'Open', cue: 'Stand. Feel the floor. Ask the room for permission and give it to yourself.', seconds: 45 },
      { label: 'Shake', cue: 'Shake the hands, then the arms, then everything. Let it be ugly.', seconds: 75 },
      { label: 'Sound', cue: 'Let a sound come out on the exhale. Not a pretty one. A true one.', seconds: 65 },
      { label: 'Dance', cue: 'Now move the way the body actually wants to. Follow the impulse, not the choreography.', seconds: 90 },
      { label: 'Dance', cue: 'Full moon light makes everything visible. Let yourself be seen, even alone.', seconds: 90 },
      { label: 'Still', cue: 'Come to standing. Do not shake it off. Let it stay in you.', seconds: 55 },
      { label: 'Close', cue: 'Hands to the belly. Thank the body for doing that.', seconds: 40 },
    ],
  },
  {
    id: 'grief-and-aliveness',
    title: 'Grief + Aliveness',
    minutes: 22,
    energy: ['releasing'],
    form: 'ritual',
    blurb: 'For putting something down. Grief-literate, trauma-informed, unhurried.',
    tier: 'shakti',
    stages: [
      { label: 'Arrive', cue: 'Sit however you can actually stay for twenty minutes.', seconds: 45 },
      { label: 'Name', cue: 'Name one thing you are carrying. You do not have to say it out loud.', seconds: 65 },
      { label: 'Hold', cue: 'Put a hand where you feel it. Grief lives somewhere specific in the body.', seconds: 70 },
      { label: 'Breathe', cue: 'Breathe underneath it, not into it. You are making room, not pushing.', seconds: 70 },
      { label: 'Release', cue: 'On the next out-breath, let a little of it leave. Only a little. There is time.', seconds: 65 },
      { label: 'Aliveness', cue: 'Now find one place that feels alive. Both are true at once.', seconds: 60 },
      { label: 'Close', cue: 'Come back slowly. Drink water. Be gentle with the next hour.', seconds: 45 },
    ],
  },
  {
    id: 'yoga-nidra-evening',
    title: 'Yoga Nidra · Evening',
    minutes: 28,
    energy: ['inward', 'releasing'],
    form: 'nidra',
    blurb: 'Deep rest, lying down. The practice you can do on your worst day.',
    tier: 'seeker',
    stages: [
      { label: 'Settle', cue: 'Lie down and get properly comfortable. Blanket. Pillow under the knees.', seconds: 55 },
      { label: 'Intention', cue: 'One sentence, present tense, kind. Say it inwardly three times.', seconds: 60 },
      { label: 'Body', cue: 'Attention moves: right hand, right arm, right shoulder. Slow rotation.', seconds: 85 },
      { label: 'Body', cue: 'Left side now. Then the whole back body against the floor.', seconds: 85 },
      { label: 'Breath', cue: 'Count breaths backwards from twenty-one. If you lose count, begin again.', seconds: 70 },
      { label: 'Rest', cue: 'Neither asleep nor awake. Stay at the edge. This is the practice.', seconds: 75 },
    ],
  },
  {
    id: 'shakti-rising',
    title: 'Shakti Rising',
    minutes: 20,
    energy: ['building', 'expressive'],
    form: 'sound',
    blurb: 'Breath, sound and spine. Energy up the channel, from the tantric lineages.',
    tier: 'shakti',
    stages: [
      { label: 'Ground', cue: 'Sit tall. Root down through the sitting bones before anything rises.', seconds: 50 },
      { label: 'Breath', cue: 'Sharp exhales through the nose, belly drawing in. Twenty of them, then stop.', seconds: 65 },
      { label: 'Sound', cue: 'Hum on the out-breath. Feel the vibration move up: belly, chest, throat.', seconds: 75 },
      { label: 'Rise', cue: 'Let the sound climb. The spine is a channel, not a column.', seconds: 75 },
      { label: 'Hold', cue: 'Silence. Do not move. Feel what is now circulating.', seconds: 55 },
      { label: 'Close', cue: 'Palms down on the thighs. Let the charge settle back into the ground.', seconds: 40 },
    ],
  },
  {
    id: 'morning-seed',
    title: 'Seeding the Cycle',
    minutes: 14,
    energy: ['seeding'],
    form: 'ritual',
    blurb: 'A short new-moon rite for naming what you are actually beginning.',
    tier: 'seeker',
    stages: [
      { label: 'Arrive', cue: 'Sit facing a window if you have one. Morning light helps.', seconds: 45 },
      { label: 'Empty', cue: 'Three long breaths. Put down what yesterday was about.', seconds: 55 },
      { label: 'Listen', cue: 'Ask the body, not the mind: what is beginning? Wait for the answer.', seconds: 75 },
      { label: 'Name', cue: 'Give it one word. Hold the word in the chest, not the head.', seconds: 60 },
      { label: 'Plant', cue: 'Hands to the belly. This is where things gestate before they are ready.', seconds: 50 },
    ],
  },
  {
    id: 'under-the-full-moon',
    title: 'Under the Full Moon',
    minutes: 21,
    energy: ['expressive'],
    form: 'ritual',
    blurb: 'A standing full-moon rite. Short, and best done where you can see the sky.',
    tier: 'seeker',
    stages: [
      { label: 'Stand', cue: 'Stand where the light reaches you, even through glass.', seconds: 50 },
      { label: 'Open', cue: 'Turn the palms out. Uncover the front of the body on purpose.', seconds: 65 },
      { label: 'Sound', cue: 'One long tone on the out-breath. Let it be louder than is comfortable.', seconds: 70 },
      { label: 'Move', cue: 'Sway. Nothing choreographed — just refuse to stay still.', seconds: 80 },
      { label: 'Witness', cue: 'Everything is visible tonight. Let yourself be seen, even alone.', seconds: 70 },
      { label: 'Close', cue: 'Hands over the heart. Keep what the fullness showed you.', seconds: 45 },
    ],
  },
  {
    id: 'return-to-earth',
    title: 'Return to Earth',
    minutes: 16,
    energy: ['inward', 'seeding', 'releasing'],
    form: 'meditation',
    blurb: 'Ground practice from the Return to Earth course. Weight, contact, belonging.',
    tier: 'seeker',
    stages: [
      { label: 'Contact', cue: 'Feel every point where your body touches something solid.', seconds: 55 },
      { label: 'Weight', cue: 'Stop holding yourself up. The ground has been doing it the whole time.', seconds: 70 },
      { label: 'Earth', cue: 'Breathe as if the breath came from underneath you.', seconds: 70 },
      { label: 'Belong', cue: 'You are not a visitor here. Let that be a body sensation, not an idea.', seconds: 65 },
      { label: 'Close', cue: 'Press the hands into the floor. Come up slowly.', seconds: 40 },
    ],
  },
]

/**
 * Today's practice.
 *
 * Deterministic per calendar day: it must not reshuffle on every render, and
 * two people in the same cycle phase on the same day should be able to talk
 * about the same practice.
 *
 * The daily practice is always free. It is the doorway the podcast and
 * Instagram traffic walks through, and a paywall on day one costs more in
 * habit than it earns in conversion — the depth is what gets charged for,
 * on the Journeys and Cycle screens.
 */
export function practiceForToday(phase: MoonPhase, date: Date = new Date()): Practice {
  const eligible = PRACTICES.filter(
    (p) => p.energy.includes(phase.energy) && p.tier === 'seeker',
  )
  const pool = eligible.length > 0 ? eligible : PRACTICES.filter((p) => p.tier === 'seeker')

  const daySeed =
    date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()

  return pool[daySeed % pool.length]
}

/** Practices offered for a phase, for the cycle screen. */
export function practicesForPhase(phaseKey: PhaseKey, energy: MoonPhase['energy']): Practice[] {
  void phaseKey
  return PRACTICES.filter((p) => p.energy.includes(energy))
}

export function getPractice(id: string): Practice | undefined {
  return PRACTICES.find((p) => p.id === id)
}

/** Total seconds of a guided practice, from its cue stages. */
export function stagesDuration(practice: Practice): number {
  return practice.stages.reduce((sum, s) => sum + s.seconds, 0)
}

export interface TimelineStage {
  label: string
  cue: string
  /** Seconds this cue is held, scaled to the practice's stated length. */
  seconds: number
}

/**
 * The cue stages, stretched to fill the practice's advertised duration.
 *
 * The written stages carry relative pacing, not absolute timing — a cue
 * weighted 80 should be held roughly twice as long as one weighted 40. This
 * scales them so the clock in the player matches the "25 min" the card
 * promised, rather than running the raw sum of the placeholder weights.
 */
export function timeline(practice: Practice): { stages: TimelineStage[]; total: number } {
  const total = practice.minutes * 60
  const raw = stagesDuration(practice)
  const scale = raw > 0 ? total / raw : 1

  const stages = practice.stages.map((s) => ({ ...s, seconds: s.seconds * scale }))
  return { stages, total }
}
