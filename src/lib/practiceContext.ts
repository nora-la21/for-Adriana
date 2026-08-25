import { createContext, useContext } from 'react'
import type { Practice } from '../data/practices'

/**
 * Opening a practice is available from every screen (today's hero, a journey
 * session, the cycle rail), so the player lives once at the app root and
 * screens ask for it through here.
 */
export interface PracticeLauncher {
  /** Opens the player, or the membership screen if the tier does not reach. */
  open: (practice: Practice, journey?: { id: string; session: number }) => void
}

export const PracticeContext = createContext<PracticeLauncher | null>(null)

export function usePracticeLauncher(): PracticeLauncher {
  const ctx = useContext(PracticeContext)
  if (!ctx) throw new Error('usePracticeLauncher must be used inside PracticeContext')
  return ctx
}
