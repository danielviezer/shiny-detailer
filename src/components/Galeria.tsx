'use client'
import Image from 'next/image'

const fotos = [
  { src: '/images/virtus_frente.jpg', label: 'VW Virtus', sub: 'Lavagem Detalhada', pos: 'center' },
  { src: '/images/cla_frente.jpg', label: 'Mercedes CLA', sub: 'Coating Cerâmico', pos: 'center' },
  { src: '/images/pickup_frente.jpg', label: 'Pick-up Preta', sub: 'Detalhamento Completo', pos: 'center' },
  { src: '/images/pickup_motor.jpg', label: 'Pick-up Preta', sub: 'Lavagem de Motor', pos: 'center 55%' },
  { src: '/images/cla_interior.jpg', label: 'Mercedes CLA', sub: 'Higienização Premium', pos: 'center 48%' },
  { src: '/images/fox_frente.jpg', label: 'VW Fox', sub: 'Lavagem Artesanal', pos: 'center 60%' },
]

export default function Galeria() {
  return (
    <section id="galeria" className="py-20 md:py-32" style={{ background: '#080D1A' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="mb-12">
          <div className="neon-line mb-4" />
          <h2 className="font-display text-4xl md:text-6xl text-white mb-3">NOSSOS TRABALHOS</h2>
          <p className="text-[#8898B3] font-light">Cada projeto tratado com obsessão pelos detalhes.</p>
        </div>

        {/* Grid uniforme 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {fotos.map(f => (
            <div
              key={f.src}
              className="relative overflow-hidden rounded-xl group aspect-[4/3]"
            >
              <Image
                src={f.src}
                alt={f.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: f.pos }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
              {/* Neon border on hover */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[rgba(0,180,255,0.3)] transition-all duration-300" />
              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <div className="font-condensed font-semibold text-white text-sm tracking-wide">{f.label}</div>
                <div className="font-condensed text-[#00B4FF] text-xs tracking-widest uppercase">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
