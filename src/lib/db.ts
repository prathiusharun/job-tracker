import { PrismaClient } from "../generated/prisma"
import { PrismaNeon } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}