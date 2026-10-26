'use client'

import type { ColorKey } from '@/types'
import { COLOR_MAP, cn } from '@/lib/utils'

type SpinButtonProps = {
  onSpin: () => void
  spinning: boolean
  hasSpun: boolean
  color: ColorKey
}

export default function SpinButton({ onSpin, spinning, hasSpun, color }: SpinButtonProps) {
  const label = spinning ? 'Spinning...' : hasSpun ? 'Spin again ↻' : 'Spin ✦'

  return (
    <button
      type="button"
      onClick={onSpin}
      disabled={spinning}
      aria-busy={spinning}
      className={cn(
        'w-full rounded-2xl py-4 text-lg font-semibold text-white',
        'transition active:scale-95',
        COLOR_MAP[color].button,
        spinning && 'animate-pulse cursor-not-allowed opacity-60',
      )}
    >
      {label}
    </button>
  )
}
