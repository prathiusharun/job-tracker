"use client"

import { updateApplicationStatus } from "@/app/actions/jobs"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  id: string
  currentStatus: string
}

const statuses = ["applied", "interview", "offer", "rejected"]

export default function StatusUpdate({ id, currentStatus }: Props) {
  const router = useRouter()

  const [status, setStatus] = useState(currentStatus)

  return (
    <select
      value={status}
      onChange={async (e) => {
        const newStatus = e.target.value

        setStatus(newStatus)

        await updateApplicationStatus(id, newStatus)

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