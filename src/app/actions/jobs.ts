"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function createJobApplication(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }
    const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { applications: true },
  })

  if (!user?.isPro && user!.applications.length >= 10) {
    redirect("/upgrade")
  }

  const companyName = formData.get("companyName") as string
  const roleTitle = formData.get("roleTitle") as string
  const salary = formData.get("salary") as string
  const locationType = formData.get("locationType") as string
  const employmentType = formData.get("employmentType") as string
  const notes = formData.get("notes") as string

  await db.jobApplication.create({
    data: {
      userId: session.user.id,
      companyName,
      roleTitle,
      salary,
      locationType,
      employmentType,
      notes,
      status: "applied",
    },
  })

  redirect("/dashboard")
}
export async function updateApplicationStatus(id: string, status: string) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  await db.jobApplication.update({
    where: { id, userId: session.user.id },
    data: { status },
  })
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