import { db } from "@/lib/db"
import { auth } from "@/auth"
import Link from "next/link"
import StatusUpdate from "@/components/StatusUpdate"
import DeleteButton from "@/components/DeleteButton"
import SignOutButton from "@/components/SignOutButton"
import ThemeToggle from "@/components/ThemeToggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getDashboardStats,
  getDashboardApplications,
} from "@/lib/dashboard-cache"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return (
      <div className="p-8">
        <p>Please log in</p>
      </div>
    )
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  })

const stats = await getDashboardStats(userId)
const applications = await getDashboardApplications(userId)

  type Status = "applied" | "interview" | "offer" | "rejected"

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Job Tracker</h1>
            {user?.isPro && (
              <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                Pro
              </Badge>
            )}
          </div>

          <div className="flex gap-3 items-center">
            {!user?.isPro && (
              <Link
                href="/upgrade"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Upgrade to Pro
              </Link>
            )}

            <ThemeToggle />
            <SignOutButton />

            <Button asChild>
              <Link href="/dashboard/new">Add Application</Link>
            </Button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-5 gap-4 mb-8">
  <Card>
    <CardContent className="py-4">
      <p className="text-sm text-muted-foreground">Total</p>
      <p className="text-2xl font-bold">{stats.total}</p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="py-4">
      <p className="text-sm text-muted-foreground">Applied</p>
      <p className="text-2xl font-bold">{stats.applied}</p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="py-4">
      <p className="text-sm text-muted-foreground">Interview</p>
      <p className="text-2xl font-bold">{stats.interview}</p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="py-4">
      <p className="text-sm text-muted-foreground">Offer</p>
      <p className="text-2xl font-bold">{stats.offer}</p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="py-4">
      <p className="text-sm text-muted-foreground">Rejected</p>
      <p className="text-2xl font-bold">{stats.rejected}</p>
    </CardContent>
  </Card>
</div>

        {/* LIST */}
        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No applications yet</p>
              <Button asChild>
                <Link href="/dashboard/new">Add your first application</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-semibold">{app.companyName}</h2>
                      <p className="text-muted-foreground">{app.roleTitle}</p>
                    </div>
                    <DeleteButton id={app.id} />
                  </div>

                  <div className="flex gap-2 mt-2">
                    <StatusUpdate id={app.id} currentStatus={app.status} />
                    <Badge>{app.status}</Badge>
                    <Badge variant="outline">{app.locationType}</Badge>
                    <Badge variant="outline">{app.employmentType}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}