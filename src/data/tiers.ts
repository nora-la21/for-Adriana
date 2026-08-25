/**
 * Membership tiers.
 *
 * Prices and terms mirror Body Temple's published offers — $44/month for the
 * membership on a six-month commitment, $25/month for Temple of Shakti —
 * so the demo shows Adriana her own economics rather than a generic
 * subscription screen.
 *
 * The free tier is the app's own addition: a real doorway costs nothing and
 * is what converts podcast and Instagram traffic into daily-habit users.
 */

import type { Tier } from '../lib/store'

export interface TierDef {
  id: Tier
  name: string
  price: string
  cadence: string
  pitch: string
  includes: string[]
  terms?: string
}

export const TIERS: TierDef[] = [
  {
    id: 'seeker',
    name: 'Seeker',
    price: 'Free',
    cadence: '',
    pitch: 'The doorway. Enough practice to build a real habit.',
    includes: [
      'A daily practice, chosen by the moon',
      'Return to Earth · first 3 days',
      'Moon Cycle Practice',
      'Weekly Temple gathering, live and recorded',
    ],
  },
  {
    id: 'shakti',
    name: 'Temple of Shakti',
    price: '$25',
    cadence: '/month',
    pitch: 'The training path. Lineage teaching and the deeper containers.',
    includes: [
      'Everything in Seeker',
      'Temple of Shakti training · all 8 sessions',
      'Sacred Sexuality Series',
      'Grief + Aliveness and the full practice library',
      'Full Moon Dance ritual, live',
    ],
    terms: '6-month commitment, then monthly.',
  },
  {
    id: 'temple',
    name: 'Body Temple',
    price: '$44',
    cadence: '/month',
    pitch: 'The whole church. Every class, every workshop, yours to keep.',
    includes: [
      'Everything in Temple of Shakti',
      'All Body Temple classes and workshops',
      'Body Temple Dance · new ritual each moon',
      'Every session live, recorded, and yours to keep',
      '50% off online retreats',
      'Members-only access to in-person places',
    ],
    terms:
      '6-month commitment, then monthly. Cancel any time after six months by emailing support@bodytemple.church.',
  },
]

export function getTierDef(id: Tier): TierDef {
  return TIERS.find((t) => t.id === id) ?? TIERS[0]
}
