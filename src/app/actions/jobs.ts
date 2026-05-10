"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function createJobApplication(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
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