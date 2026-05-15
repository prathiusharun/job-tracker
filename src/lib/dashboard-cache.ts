import { unstable_cache } from "next/cache"
import { db } from "@/lib/db"

type Status = "applied" | "interview" | "offer" | "rejected"

/**
 * Cached dashboard stats per user
 */
export function getDashboardStats(userId: string) {
  return unstable_cache(
    async () => {
      const grouped = await db.jobApplication.groupBy({
        by: ["status"],
        where: { userId },
        _count: {
          _all: true,
        },
      })

      const stats: Record<Status | "total", number> = {
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      }

      for (const item of grouped) {
        const count = item._count._all
        const status = item.status as Status

        stats[status] = count
        stats.total += count
      }

      return stats
    },
    [`dashboard-stats-${userId}`],
    {
      revalidate: 60, // cache lasts 60 seconds
      tags: [`user-${userId}`],
    }
  )()
}

/**
 * Cached applications list
 */
export function getDashboardApplications(userId: string) {
  return unstable_cache(
    async () => {
      return db.jobApplication.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    },
    [`dashboard-apps-${userId}`],
    {
      revalidate: 60,
      tags: [`user-${userId}`],
    }
  )()
}