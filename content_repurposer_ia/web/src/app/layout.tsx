import './globals.css'
import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Auto Social - AI Content Repurposer',
  description: 'Transformez vos vidéos en contenu viral avec l\'intelligence artificielle. Transcription automatique, génération de posts sociaux, et analyse de contenu révolutionnaire.',
  keywords: ['IA', 'content creation', 'video transcription', 'social media', 'artificial intelligence'],
  authors: [{ name: 'Auto Social Team' }],
  openGraph: {
    title: 'Auto Social - AI Content Repurposer',
    description: 'Transformez vos vidéos en contenu viral avec l\'IA',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Social - AI Content Repurposer',
    description: 'Transformez vos vidéos en contenu viral avec l\'IA',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}