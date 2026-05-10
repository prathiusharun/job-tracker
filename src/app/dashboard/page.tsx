import { db } from "@/lib/db"
import { auth } from "@/auth"
import Link from "next/link"
import StatusUpdate from "@/components/StatusUpdate"
import DeleteButton from "@/components/DeleteButton"

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


  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
  <div className="border rounded-md p-4 text-center">
    <p className="text-2xl font-bold">{stats.total}</p>
    <p className="text-gray-500 text-sm">Total</p>
  </div>
  <div className="border rounded-md p-4 text-center">
    <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
    <p className="text-gray-500 text-sm">Applied</p>
  </div>
  <div className="border rounded-md p-4 text-center">
    <p className="text-2xl font-bold text-yellow-600">{stats.interview}</p>
    <p className="text-gray-500 text-sm">Interview</p>
  </div>
  <div className="border rounded-md p-4 text-center">
    <p className="text-2xl font-bold text-green-600">{stats.offer}</p>
    <p className="text-gray-500 text-sm">Offer</p>
  </div>
</div>
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
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold">{app.companyName}</h2>
                  <p className="text-gray-600">{app.roleTitle}</p>
                </div>
                <DeleteButton id={app.id} />
              </div>
              <div className="flex gap-2 mt-2 items-center">
                <StatusUpdate id={app.id} currentStatus={app.status} />
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