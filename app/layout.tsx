import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-800 antialiased min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      </body>
    </html>
  )
}
