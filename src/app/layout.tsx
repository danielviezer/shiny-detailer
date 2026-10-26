import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shiny Car Studio | Detalhamento Automotivo Premium',
  description: 'Detalhamento automotivo premium em Itajaí. Higienização, lavagem detalhada, coating e proteção para o seu veículo.',
  keywords: 'detailing, detalhamento, higienização, lavagem detalhada, coating, polimento, Itajaí, Santa Catarina',
  openGraph: {
    title: 'Shiny Car Studio | Detalhamento Automotivo Premium',
    description: 'Detalhamento automotivo premium em Itajaí.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/logo_shiny.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
