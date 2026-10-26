import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="text-5xl" aria-hidden="true">
        🤔
      </span>
      <h1 className="mt-6 text-2xl font-bold text-gray-800">Category not found</h1>
      <p className="mt-2 text-sm text-gray-500">
        That category does not exist, or it may have been renamed.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-800"
      >
        ← All categories
      </Link>
    </div>
  )
}
