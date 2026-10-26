'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Servicos from '@/components/Servicos'
import Galeria from '@/components/Galeria'
import Sobre from '@/components/Sobre'
import Agendamento from '@/components/Agendamento'
import Footer from '@/components/Footer'
import MobileBar from '@/components/MobileBar'

export default function Home() {
  const [servicoAgendamento, setServicoAgendamento] = useState('')
  const jumpToStep2Ref = useRef<(() => void) | null>(null)

  const handleAgendar = (servico: string) => {
    setServicoAgendamento(servico)
    const el = document.getElementById('agendamento')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    // Jump to step 2 after scroll animation
    setTimeout(() => {
      if (jumpToStep2Ref.current) jumpToStep2Ref.current()
    }, 500)
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicos onAgendar={handleAgendar} />
        <Galeria />
        <Sobre />
        <Agendamento servicoSelecionado={servicoAgendamento} onJumpToStep2={(fn) => { jumpToStep2Ref.current = fn }} />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
