import Link from 'next/link'
import type { Category } from '@/types'
import { COLOR_MAP, cn } from '@/lib/utils'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center',
        'transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md',
        COLOR_MAP[category.color].card,
      )}
    >
      <span className="text-4xl" aria-hidden="true">
        {category.emoji}
      </span>
      <span className="line-clamp-2 text-sm font-semibold text-gray-800">
        {category.title}
      </span>
      <span className="text-xs text-gray-500">{category.topicCount} topics</span>
    </Link>
  )
}
