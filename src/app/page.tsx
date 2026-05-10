import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Job Tracker</h1>
      <p className="text-gray-500 mb-8">Track your job applications in one place</p>
      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  )
}