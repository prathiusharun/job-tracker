"use client"

import { deleteApplication } from "@/app/actions/jobs"
import { useRouter } from "next/navigation"

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        if (confirm("Delete this application?")) {
          await deleteApplication(id)
          router.refresh()
        }
      }}
      className="text-sm text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  )
}