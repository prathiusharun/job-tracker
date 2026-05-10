import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { upgradeToProAction } from "@/app/actions/jobs"
import ThemeToggle from "@/components/ThemeToggle"
import Link from "next/link"

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upgrade to Pro</CardTitle>
            <CardDescription>Unlock unlimited job applications</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited job applications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced analytics</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$9<span className="text-muted-foreground text-lg">/month</span></p>
            </div>
            <form action={upgradeToProAction}>
              <Button type="submit" className="w-full">
                Upgrade Now
              </Button>
            </form>
            <Link href="/dashboard" className="text-center text-sm text-muted-foreground hover:text-foreground">
              Maybe later
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}