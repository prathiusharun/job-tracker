import { db } from "@/lib/db"
import { auth } from "@/auth"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  const applications = await db.jobApplication.findMany({
    where: { userId: session?.user?.id as string },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Link
          href="/dashboard/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet. Add one!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-md p-4">
              <h2 className="font-bold">{app.companyName}</h2>
              <p className="text-gray-600">{app.roleTitle}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {app.status}
                </span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {app.locationType}
                </span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {app.employmentType}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}