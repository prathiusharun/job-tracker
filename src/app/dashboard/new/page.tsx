import { createJobApplication } from "@/app/actions/jobs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"

export default function NewApplicationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm">
            Back to Dashboard
          </Link>
          <ThemeToggle />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Add Job Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createJobApplication} className="flex flex-col gap-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                required
                className="border rounded-md p-2 bg-background text-foreground"
              />
              <input
                type="text"
                name="roleTitle"
                placeholder="Role Title"
                required
                className="border rounded-md p-2 bg-background text-foreground"
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary (optional)"
                className="border rounded-md p-2 bg-background text-foreground"
              />
              <select
                name="locationType"
                className="border rounded-md p-2 bg-background text-foreground"
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <select
                name="employmentType"
                className="border rounded-md p-2 bg-background text-foreground"
              >
                <option value="full-time">Full Time</option>
                <option value="contract">Contract</option>
              </select>
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                className="border rounded-md p-2 bg-background text-foreground"
                rows={3}
              />
              <Button type="submit" className="w-full">
                Add Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}