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

export default async function DashboardPage() {
  const session = await auth()

  const applications = await db.jobApplication.findMany({
    where: { userId: session?.user?.id as string },
    orderBy: { createdAt: "desc" },
  })

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    applied: "default",
    interview: "secondary",
    offer: "outline",
    rejected: "destructive",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Tracker</h1>
          <div className="flex gap-3 items-center">
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
                <CardContent className="flex justify-between items-center py-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">{app.companyName}</h2>
                    <p className="text-muted-foreground">{app.roleTitle}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={statusColors[app.status] || "default"}>
                        {app.status}
                      </Badge>
                      <Badge variant="outline">{app.locationType}</Badge>
                      <Badge variant="outline">{app.employmentType}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <StatusUpdate id={app.id} currentStatus={app.status} />
                    <DeleteButton id={app.id} />
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