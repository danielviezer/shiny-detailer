'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ratio = largura/altura real da foto, pra não cortar o carro no carrossel
const fotos = [
  { src: '/images/cla_frente.jpg', label: 'Mercedes CLA', sub: 'Coating cerâmico', pos: '50% 60%', ratio: 1260 / 1170, grid: 'md:col-start-2 md:row-start-1' },
  { src: '/images/cla_interior.jpg', label: 'Mercedes CLA', sub: 'Higienização premium', pos: '50% 45%', ratio: 3 / 4, grid: 'md:col-start-1 md:row-start-1 md:row-span-2' },
  { src: '/images/pickup_frente.jpg', label: 'Pick-up Chevrolet', sub: 'Detalhamento completo', pos: '50% 55%', ratio: 1206 / 1044, grid: 'md:col-start-3 md:row-start-1' },
  { src: '/images/pickup_motor.jpg', label: 'Pick-up Chevrolet', sub: 'Lavagem de motor', pos: '50% 55%', ratio: 3 / 4, grid: 'md:col-start-4 md:row-start-1 md:row-span-2' },
  { src: '/images/virtus_frente.jpg', label: 'VW Virtus', sub: 'Lavagem detalhada', pos: '50% 60%', ratio: 1213 / 1134, grid: 'md:col-start-2 md:row-start-2' },
  { src: '/images/fox_frente.jpg', label: 'VW Fox', sub: 'Lavagem artesanal', pos: '50% 60%', ratio: 1260 / 1224, grid: 'md:col-start-3 md:row-start-2' },
]

export default function Galeria() {
  const trilho = useRef<HTMLUListElement>(null)
  const [ativo, setAtivo] = useState(0)

  // No celular, a foto centralizada no carrossel ganha cor
  useEffect(() => {
    const root = trilho.current
    if (!root || !window.matchMedia('(max-width: 767px)').matches) return
    const items = Array.from(root.children) as HTMLElement[]
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setAtivo(items.indexOf(e.target as HTMLElement))
        })
      },
      { root, threshold: 0.75 }
    )
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const irPara = (i: number) => {
    const root = trilho.current
    const el = root?.children[i] as HTMLElement | undefined
    if (root && el) root.scrollTo({ left: el.offsetLeft - root.offsetLeft - 16, behavior: 'smooth' })
  }

  return (
    <section id="galeria" className="py-11 md:py-28 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-wide font-light text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.01em]">
            Trabalhos no studio
          </h2>
          <p className="hidden md:block text-[15px] text-white/60 max-w-[36ch] text-right">
            Passe o mouse para ver a foto em cores.
          </p>
        </div>

        <ul
          ref={trilho}
          className="no-scrollbar mt-6 md:mt-10 -mx-4 px-4 md:mx-0 md:px-0 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4
            md:grid md:gap-4 md:overflow-visible md:[grid-template-columns:1.5fr_1.08fr_1.08fr_1.5fr] md:[grid-template-rows:repeat(2,minmax(0,1fr))] md:h-[min(62vw,640px)]"
          aria-label="Fotos de veículos atendidos"
        >
          {fotos.map((f, i) => (
            <li
              key={f.src}
              data-active={ativo === i}
              className={`photo-reveal group relative shrink-0 snap-start h-[300px] xs:h-[320px] [aspect-ratio:var(--r)] md:h-auto md:aspect-auto rounded-2xl overflow-hidden bg-graphite ${f.grid}`}
              style={{ '--r': f.ratio } as React.CSSProperties}
            >
              <Image
                src={f.src}
                alt={`${f.label}: ${f.sub.toLowerCase()}`}
                fill
                sizes="(min-width: 768px) 30vw, 85vw"
                className="photo-mono object-cover"
                style={{ objectPosition: f.pos }}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
              <div className="absolute left-4 bottom-3.5 right-4">
                <p className="text-[15px] text-white leading-tight">{f.label}</p>
                <p className="text-[13px] text-white/70">{f.sub}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="md:hidden mt-4 flex justify-center gap-1" aria-label="Posição no carrossel">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              onClick={() => irPara(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={ativo === i}
              className="w-7 h-11 flex items-center justify-center"
            >
              <span className={`block h-[2px] rounded-full transition-all duration-300 ${ativo === i ? 'w-6 bg-white' : 'w-3 bg-white/30'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
