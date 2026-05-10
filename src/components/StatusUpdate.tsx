"use client"

import { updateApplicationStatus } from "@/app/actions/jobs"
import { useRouter } from "next/navigation"

type Props = {
  id: string
  currentStatus: string
}

const statuses = ["applied", "interview", "offer", "rejected"]

export default function StatusUpdate({ id, currentStatus }: Props) {
  const router = useRouter()

  return (
    <select
      defaultValue={currentStatus}
      onChange={async (e) => {
        await updateApplicationStatus(id, e.target.value)
        router.refresh()
      }}
      className="text-sm border rounded px-2 py-1"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  )
}