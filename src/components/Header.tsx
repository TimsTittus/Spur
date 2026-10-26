import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-mono text-sm text-gray-400 transition-colors hover:text-gray-600"
        >
          Spin &amp; Speak
        </Link>
        {/* Reserved for future navigation */}
        <div />
      </div>
    </header>
  )
}
