import { db } from "@/lib/db"
import { auth } from "@/auth"
import Link from "next/link"
import StatusUpdate from "@/components/StatusUpdate"
import DeleteButton from "@/components/DeleteButton"
import SignOutButton from "@/components/SignOutButton"
import ThemeToggle from "@/components/ThemeToggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const start = Date.now()

export default async function DashboardPage() {
  const session = await auth()
const userId = session?.user?.id as string

const user = await db.user.findUnique({
  where: { id: userId },
})

const [applications, grouped] = await Promise.all([
  db.jobApplication.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  }),

  db.jobApplication.groupBy({
    by: ["status"],
    where: { userId },
    _count: {
      status: true,
    },
  }),
])
const stats = {
  total: 0,
  applied: 0,
  interview: 0,
  offer: 0,
  rejected: 0,
}

for (const item of grouped) {
  const count = item._count.status

  stats.total += count
  stats[item.status as keyof typeof stats] = count
}

  console.log("/dashboard took", Date.now() - start, "ms")
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
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

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{stats.applied}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{stats.interview}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{stats.offer}</p>
            </CardContent>
          </Card>
        </div>

        {!user?.isPro && (
          <Card className="mb-6 border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="flex justify-between items-center py-4">
              <div>
                <p className="font-semibold">Free Plan</p>
                <p className="text-sm text-muted-foreground">
                  {applications.length}/10 applications used
                </p>
              </div>
              <Button asChild variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                <Link href="/upgrade">Upgrade to Pro</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
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
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-lg">{app.companyName}</h2>
                      <p className="text-muted-foreground">{app.roleTitle}</p>
                    </div>
                    <DeleteButton id={app.id} />
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <StatusUpdate id={app.id} currentStatus={app.status} />
                    <Badge variant={app.status === "rejected" ? "destructive" : app.status === "interview" ? "secondary" : "default"}>
                      {app.status}
                    </Badge>
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