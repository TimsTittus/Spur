'use client'

import { AnimatePresence, motion } from 'framer-motion'

const MAX_VISIBLE = 8

export default function TopicHistory({ history }: { history: string[] }) {
  if (history.length === 0) return null

  const visible = history.slice(0, MAX_VISIBLE)

  return (
    <div className="w-full">
      <p className="mb-2 text-xs text-gray-400">Previous topics</p>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {visible.map((topic, index) => (
            <motion.span
              key={`${topic}-${history.length - index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 line-through"
            >
              {topic}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
