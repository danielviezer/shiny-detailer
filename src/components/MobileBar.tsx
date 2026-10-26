'use client'
import { useEffect, useState } from 'react'
import { WHATSAPP_URL, IconWhatsApp } from './contato'

// Barra fixa no celular: aparece depois do hero, onde o CTA principal já saiu da tela
export default function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Some enquanto o formulário de agendamento está na tela, pra não cobrir os botões dele
    let noForm = false
    const update = () => setShow(window.scrollY > window.innerHeight * 0.6 && !noForm)
    const form = document.getElementById('agendamento')
    const io = new IntersectionObserver(([e]) => { noForm = e.isIntersecting; update() }, { threshold: 0.15 })
    if (form) io.observe(form)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => { window.removeEventListener('scroll', update); io.disconnect() }
  }, [])

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 px-4 pt-3 bg-gradient-to-t from-black via-black/90 to-transparent transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="btn-primary w-full shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
      >
        <IconWhatsApp /> Agendar no WhatsApp
      </a>
    </div>
  )
}
