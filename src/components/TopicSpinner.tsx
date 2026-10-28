'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ColorKey } from '@/types'

type TopicSpinnerProps = {
  topics: string[]
  color: ColorKey
  categoryTitle: string
}

const SHUFFLE_INTERVAL_MS = 55
const SHUFFLE_TICKS = 22
const SETTLE_DELAY_MS = 280

function pickRandom(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function TopicSpinner({ topics }: TopicSpinnerProps) {
  // null on first render (server + client must match); set after mount via useEffect
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [spinKey, setSpinKey] = useState(0)
  const [shuffling, setShuffling] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null)
  const [timerRunning, setTimerRunning] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Pick a random starting topic on the client after hydration
  useEffect(() => {
    setCurrentTopic(pickRandom(topics))
  }, [topics])

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
      if (settleRef.current !== null) clearTimeout(settleRef.current)
      if (timerRef.current !== null) clearInterval(timerRef.current)
    }
  }, [])

  const spin = useCallback(() => {
    if (spinning || topics.length === 0) return

    const previousTopic = currentTopic
    const pool =
      topics.length > 1 && previousTopic !== null
        ? topics.filter((t) => t !== previousTopic)
        : topics
    const finalTopic = pickRandom(pool.length > 0 ? pool : topics)

    setSpinning(true)
    setShuffling(true)

    let ticks = 0
    intervalRef.current = setInterval(() => {
      setCurrentTopic(pickRandom(topics))
      setSpinKey((k) => k + 1)
      ticks += 1

      if (ticks < SHUFFLE_TICKS) return

      clearInterval(intervalRef.current!)
      intervalRef.current = null
      setShuffling(false)

      settleRef.current = setTimeout(() => {
        settleRef.current = null
        setCurrentTopic(finalTopic)
        setSpinKey((k) => k + 1)
        setSpinning(false)
        setHasSpun(true)
      }, SETTLE_DELAY_MS)
    }, SHUFFLE_INTERVAL_MS)
  }, [currentTopic, spinning, topics])

  const handleTimer = useCallback(() => {
    if (timerRunning) {
      // Stop
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      setTimerRunning(false)
      setTimerSeconds(null)
      return
    }
    // Start 60s countdown
    setTimerSeconds(60)
    setTimerRunning(true)
    timerRef.current = setInterval(() => {
      setTimerSeconds((s) => {
        if (s === null || s <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          setTimerRunning(false)
          return null
        }
        return s - 1
      })
    }, 1000)
  }, [timerRunning])

  const status = spinning ? 'DRAWING...' : 'READY'

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-6 pb-6 sm:gap-10 sm:pb-12">
      {/* Status label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={status}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-semibold tracking-widest text-amber-500"
        >
          {status}
        </motion.span>
      </AnimatePresence>

      {/* Topic text — slot machine cycles right here */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Current topic"
        className="flex h-40 max-w-2xl items-center justify-center overflow-hidden px-4 text-center sm:h-48 md:h-56 lg:h-64"
      >
        <AnimatePresence mode="wait">
          {currentTopic !== null && (
            <motion.h2
              key={spinKey}
              initial={{ y: shuffling ? 18 : 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: shuffling ? -18 : -12, opacity: 0 }}
              transition={{ duration: shuffling ? 0.055 : 0.18, ease: 'easeOut' }}
              className="font-display text-5xl font-bold leading-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              {currentTopic}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="rounded-full bg-amber-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
        >
          {spinning ? 'Spinning...' : hasSpun ? 'Spin again' : 'Spin'}
        </button>

        <button
          type="button"
          onClick={handleTimer}
          className="rounded-full border border-gray-300 px-7 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-500 hover:text-gray-900 active:scale-95"
        >
          {timerRunning && timerSeconds !== null
            ? `${timerSeconds}s remaining`
            : 'Start 1 min timer'}
        </button>

        {/* Settings / gear — decorative for now */}
        <button
          type="button"
          aria-label="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition hover:border-gray-500 hover:text-gray-700 active:scale-95"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
