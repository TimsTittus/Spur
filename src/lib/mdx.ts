import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Category, ColorKey } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'categories')

const COLOR_KEYS: readonly ColorKey[] = [
  'amber', 'purple', 'teal', 'coral',
  'blue', 'green', 'pink', 'indigo',
]

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isColorKey(value: unknown): value is ColorKey {
  return typeof value === 'string' && (COLOR_KEYS as readonly string[]).includes(value)
}

function isTopicList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((topic) => typeof topic === 'string' && topic.trim().length > 0)
  )
}

/** Turns one file's frontmatter into a Category, or null when a field is missing or malformed. */
function parseCategory(slug: string, source: string): Category | null {
  const data = matter(source).data as Record<string, unknown>
  const { title, description, emoji, color, topicCount, topics } = data

  if (typeof title !== 'string' || title.length === 0) return null
  if (typeof description !== 'string' || description.length === 0) return null
  if (typeof emoji !== 'string' || emoji.length === 0) return null
  if (!isColorKey(color)) return null
  if (typeof topicCount !== 'number' || !Number.isFinite(topicCount)) return null
  if (!isTopicList(topics)) return null

  return { slug, title, description, emoji, color, topicCount, topics }
}

function readCategoryFile(slug: string): Category | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return parseCategory(slug, fs.readFileSync(filePath, 'utf8'))
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getAllCategories(): Category[] {
  return getAllSlugs()
    .map((slug) => readCategoryFile(slug))
    .filter((category): category is Category => category !== null)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getCategoryBySlug(slug: string): Category | null {
  if (!SLUG_PATTERN.test(slug)) return null
  return readCategoryFile(slug)
}
