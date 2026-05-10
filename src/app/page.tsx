import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
        <h1 className="text-5xl font-bold">Job Tracker</h1>
        <p className="text-muted-foreground text-xl max-w-md">
          Track every application. Never lose track of where you stand.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}