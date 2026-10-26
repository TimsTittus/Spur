import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopicSpinner from '@/components/TopicSpinner'
import { getAllSlugs, getCategoryBySlug } from '@/lib/mdx'
import { COLOR_MAP, cn } from '@/lib/utils'

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

  const colors = COLOR_MAP[category.color]

  return (
    <div className={cn('w-full', colors.gradient)}>
      <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-10 sm:py-14">
        <div className="w-full">
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-800"
          >
            ← All categories
          </Link>
        </div>

        <header className="mt-8 flex flex-col items-center text-center">
          <span className="text-6xl" aria-hidden="true">
            {category.emoji}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{category.title}</h1>
          <p className="mt-2 max-w-xs text-gray-500">{category.description}</p>
          <span
            className={cn(
              'mt-4 rounded-full border px-3 py-1 text-xs font-medium',
              colors.badge,
            )}
          >
            {category.topicCount} topics
          </span>
        </header>

        <div className="mt-10 w-full">
          <TopicSpinner
            topics={category.topics}
            color={category.color}
            categoryTitle={category.title}
          />
        </div>
      </div>
    </div>
  )
}
