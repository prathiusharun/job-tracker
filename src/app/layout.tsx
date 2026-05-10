import type { Metadata } from "next"
import ThemeProvider from "@/components/ThemeProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}