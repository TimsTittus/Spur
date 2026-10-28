import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import TopicSpinner from '@/components/TopicSpinner'
import { getAllSlugs, getCategoryBySlug } from '@/lib/mdx'

export const instant = false

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category not found — Spin & Speak' }
  }

  return {
    title: `${category.title} — Spin & Speak`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      {/* Minimal top nav */}
      <nav className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm text-gray-400 transition-colors hover:text-gray-700"
        >
          ← All categories
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">{category.emoji}</span>
          <span className="text-sm text-gray-400">{category.title}</span>
        </div>
      </nav>

      {/* Spinner fills remaining height — Suspense boundary required for PPR/Math.random */}
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center">
            <span className="text-xs font-semibold tracking-widest text-gray-300">
              LOADING...
            </span>
          </div>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <TopicSpinner
            topics={category.topics}
            color={category.color}
            categoryTitle={category.title}
          />
        </div>
      </Suspense>
    </div>
  )
}
