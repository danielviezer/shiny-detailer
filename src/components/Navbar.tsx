'use client'
import { useState, useEffect } from 'react'
import { WHATSAPP_URL, TELEFONE, IconWhatsApp, Wordmark } from './contato'

const links = [
  { label: 'Serviços e preços', short: 'Serviços', href: '#servicos' },
  { label: 'Trabalhos', short: 'Trabalhos', href: '#galeria' },
  { label: 'Sobre', short: 'Sobre', href: '#sobre' },
  { label: 'Agendar', short: 'Agendar', href: '#agendamento' },
  { label: 'Contato', short: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
          scrolled || open ? 'bg-black/85 backdrop-blur-md border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="max-w-[1320px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between" aria-label="Principal">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); go('#inicio') }} className="py-2 -my-2" aria-label="Shiny Car Studio, início">
            <Wordmark />
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.slice(0, 3).map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); go(l.href) }}
                  className="px-4 py-3 text-[14px] text-white/75 hover:text-white transition-colors"
                >
                  {l.short}
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a
                href="#agendamento"
                onClick={(e) => { e.preventDefault(); go('#agendamento') }}
                className="btn-primary !min-h-[42px] !px-5 !text-[14px]"
              >
                Agendar
              </a>
            </li>
          </ul>

          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden -mr-2 w-12 h-12 flex items-center justify-center gap-2 text-[14px] text-white"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            <span className="relative w-6 h-3">
              <span className={`absolute left-0 right-0 h-[1.5px] bg-white transition-transform duration-300 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 right-0 h-[1.5px] bg-white transition-transform duration-300 ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="menu-mobile"
        className={`md:hidden fixed inset-0 z-40 bg-black transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
        {...(!open ? { inert: '' as unknown as boolean } : {})}
      >
        <div className="h-full flex flex-col px-4 pt-20 pb-8">
          <ul>
            {links.map(l => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); go(l.href) }}
                  className="flex items-center justify-between py-5 font-wide text-[22px] font-light text-white"
                >
                  {l.label}
                  <span className="text-muted text-base" aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              <IconWhatsApp /> Chamar no WhatsApp
            </a>
            <p className="text-center text-sm text-muted">{TELEFONE}</p>
          </div>
        </div>
      </div>
    </>
  )
}
