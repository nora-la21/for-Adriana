import type { MoonPhase } from '../lib/moon'

/**
 * The moon, drawn from the real illuminated fraction rather than picked from
 * a set of eight icons — so the disc on screen matches the one outside.
 */
export function MoonDisc({ phase, size = 104 }: { phase: MoonPhase; size?: number }) {
  return (
    <div className="moondial__disc" style={{ width: size, height: size }}>
      <div
        className={`moondial__lit${phase.waxing ? '' : ' moondial__lit--waning'}`}
        style={{ ['--lit' as string]: String(phase.illumination) }}
      />
      <div className="moondial__shadow" />
    </div>
  )
}

export function MoonDial({ phase }: { phase: MoonPhase }) {
  return (
    <div className="moondial" role="img" aria-label={`${phase.name}, ${Math.round(phase.illumination * 100)}% illuminated`}>
      <MoonDisc phase={phase} />
    </div>
  )
}
