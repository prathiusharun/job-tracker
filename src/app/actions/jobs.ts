"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"


export async function createJobApplication(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await db.user.findUnique({

    where: { id: session.user.id },
    include: { applications: true },
  })
      if (!user) {
  redirect("/login")
}

  console.log("USER PRO STATUS:", user?.isPro)
  console.log("APPLICATION COUNT:", user?.applications.length)

  if (!user?.isPro && user.applications.length >= 10) {
    redirect("/upgrade")
  }

  await db.jobApplication.create({
    data: {
      companyName: formData.get("companyName") as string,
      roleTitle: formData.get("roleTitle") as string,
      salary: formData.get("salary") as string,
      locationType: formData.get("locationType") as string,
      employmentType: formData.get("employmentType") as string,
      notes: formData.get("notes") as string,
      userId: session.user.id,
    },
  })

  revalidateTag(`user-${session.user.id}`, "max")

  redirect("/dashboard")
}

export async function updateApplicationStatus(
  id: string,
  status: string
) {
  console.time("total-action")

  console.time("auth")
  const session = await auth()
  console.timeEnd("auth")

  if (!session?.user?.id) {
    redirect("/login")
  }

  console.time("db-update")

  const result = await db.jobApplication.updateMany({
    where: {
      id,
      userId: session.user.id,
    },
    data: { status },
  })

  console.timeEnd("db-update")

 revalidateTag(`user-${session.user.id}`, "max")

  console.timeEnd("total-action")

  console.log("UPDATE RESULT:", result)
}
export async function deleteApplication(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  await db.jobApplication.delete({
    where: { id, userId: session.user.id },
  })
}
export async function upgradeToProAction() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { isPro: true },
  })

  redirect("/dashboard")
}