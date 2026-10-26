import CategoryCard from '@/components/CategoryCard'
import { getAllCategories } from '@/lib/mdx'

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <section className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          Pick a topic. Start talking.
        </h1>
        <p className="mt-4 max-w-md text-gray-500">
          Spin a random prompt from any category and practice thinking on your feet.
        </p>
      </section>

      <section className="mt-12 sm:mt-16">
        <h2 className="mb-6 text-xs uppercase tracking-widest text-gray-400">
          Choose a category
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  )
}
