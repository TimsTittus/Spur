'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import SpinButton from '@/components/SpinButton'
import TopicHistory from '@/components/TopicHistory'
import type { ColorKey } from '@/types'
import { COLOR_MAP, cn } from '@/lib/utils'

type TopicSpinnerProps = {
  topics: string[]
  color: ColorKey
  categoryTitle: string
}

const SHUFFLE_INTERVAL_MS = 60
const SHUFFLE_TICKS = 18
const SETTLE_DELAY_MS = 300

function pickRandom(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function TopicSpinner({ topics, color, categoryTitle }: TopicSpinnerProps) {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [spinKey, setSpinKey] = useState(0)
  const [shuffling, setShuffling] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Stop a spin that is still running when the user navigates away.
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
      if (settleRef.current !== null) clearTimeout(settleRef.current)
    }
  }, [])

  const spin = useCallback(() => {
    if (spinning || topics.length === 0) return

    const previousTopic = currentTopic
    // Never land on the topic that is already showing.
    const pool =
      topics.length > 1 && previousTopic !== null
        ? topics.filter((topic) => topic !== previousTopic)
        : topics
    const finalTopic = pickRandom(pool.length > 0 ? pool : topics)

    setSpinning(true)
    setShuffling(true)

    let ticks = 0
    intervalRef.current = setInterval(() => {
      setCurrentTopic(pickRandom(topics))
      setSpinKey((key) => key + 1)
      ticks += 1

      if (ticks < SHUFFLE_TICKS) return

      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setShuffling(false)

      settleRef.current = setTimeout(() => {
        settleRef.current = null
        setCurrentTopic(finalTopic)
        setSpinKey((key) => key + 1)
        if (previousTopic !== null) {
          setHistory((past) => [previousTopic, ...past])
        }
        setSpinning(false)
        setHasSpun(true)
      }, SETTLE_DELAY_MS)
    }, SHUFFLE_INTERVAL_MS)
  }, [currentTopic, spinning, topics])

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div
        role="status"
        aria-live="polite"
        aria-label={`Random ${categoryTitle} topic`}
        className={cn(
          'flex min-h-40 w-full max-w-md items-center justify-center px-6 py-8',
          'rounded-3xl border-2 border-dashed bg-gray-50',
          COLOR_MAP[color].spinner,
        )}
      >
        <AnimatePresence mode="wait">
          {currentTopic === null ? (
            <motion.span
              key="placeholder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.12 }}
              className="text-center text-sm italic text-gray-300"
            >
              Hit spin to get a topic
            </motion.span>
          ) : (
            <motion.span
              key={spinKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.12 }}
              className={cn(
                'text-center text-2xl font-bold text-gray-800',
                shuffling && 'blur-sm',
              )}
            >
              {currentTopic}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md">
        <SpinButton onSpin={spin} spinning={spinning} hasSpun={hasSpun} color={color} />
      </div>

      <div className="w-full max-w-md">
        <TopicHistory history={history} />
      </div>

      <p className="text-xs text-gray-300">{topics.length} topics in this category</p>
    </div>
  )
}
