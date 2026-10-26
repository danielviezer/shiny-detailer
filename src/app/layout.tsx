import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const description =
  'Estúdio de detalhamento automotivo em Itajaí, SC. Higienização interna, lavagem detalhada, coating e polimento. Veja serviços e preços e agende pelo WhatsApp.'

export const metadata: Metadata = {
  title: 'Shiny Car Studio | Detalhamento automotivo em Itajaí',
  description,
  keywords:
    'detalhamento automotivo, higienização interna, lavagem detalhada, coating, polimento, cristalização de para-brisa, lavagem de motor, Itajaí, Santa Catarina',
  icons: { icon: '/images/logo_shiny.jpg', apple: '/images/logo_shiny.jpg' },
  openGraph: {
    title: 'Shiny Car Studio | Detalhamento automotivo em Itajaí',
    description,
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
