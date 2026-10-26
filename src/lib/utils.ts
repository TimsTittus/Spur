import type { ColorKey } from '@/types'

type ColorClasses = {
  card: string
  badge: string
  spinner: string
  button: string
  gradient: string
}

export const COLOR_MAP: Record<ColorKey, ColorClasses> = {
  amber: {
    card: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    spinner: 'border-amber-300',
    button: 'bg-amber-500 hover:bg-amber-600',
    gradient: 'bg-gradient-to-b from-amber-50 to-white',
  },
  purple: {
    card: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
    spinner: 'border-purple-300',
    button: 'bg-purple-500 hover:bg-purple-600',
    gradient: 'bg-gradient-to-b from-purple-50 to-white',
  },
  teal: {
    card: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
    badge: 'bg-teal-100 text-teal-800 border-teal-200',
    spinner: 'border-teal-300',
    button: 'bg-teal-500 hover:bg-teal-600',
    gradient: 'bg-gradient-to-b from-teal-50 to-white',
  },
  coral: {
    card: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
    badge: 'bg-rose-100 text-rose-800 border-rose-200',
    spinner: 'border-rose-300',
    button: 'bg-rose-500 hover:bg-rose-600',
    gradient: 'bg-gradient-to-b from-rose-50 to-white',
  },
  blue: {
    card: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    spinner: 'border-blue-300',
    button: 'bg-blue-500 hover:bg-blue-600',
    gradient: 'bg-gradient-to-b from-blue-50 to-white',
  },
  green: {
    card: 'bg-green-50 hover:bg-green-100 border-green-200',
    badge: 'bg-green-100 text-green-800 border-green-200',
    spinner: 'border-green-300',
    button: 'bg-green-500 hover:bg-green-600',
    gradient: 'bg-gradient-to-b from-green-50 to-white',
  },
  pink: {
    card: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
    badge: 'bg-pink-100 text-pink-800 border-pink-200',
    spinner: 'border-pink-300',
    button: 'bg-pink-500 hover:bg-pink-600',
    gradient: 'bg-gradient-to-b from-pink-50 to-white',
  },
  indigo: {
    card: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    spinner: 'border-indigo-300',
    button: 'bg-indigo-500 hover:bg-indigo-600',
    gradient: 'bg-gradient-to-b from-indigo-50 to-white',
  },
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
