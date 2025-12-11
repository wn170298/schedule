import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Sapienza Schedule',
  description: 'Class schedule application for Sapienza University of Rome',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white py-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">📚 Sapienza Schedule</h1>
            <p className="text-blue-100 text-sm">Your class schedule for Sapienza University</p>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>&copy; 2024 Sapienza Schedule. Built with Next.js, Supabase, and Vercel.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
