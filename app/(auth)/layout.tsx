import type React from "react"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">{children}</div>
}
