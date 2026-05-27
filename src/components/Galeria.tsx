'use client'
import Image from 'next/image'

const fotos = [
  { src: '/images/corvette_de_costas.jpg', label: 'Corvette', sub: 'Lavagem Detalhada' },
  { src: '/images/tesla.jpg', label: 'Tesla', sub: 'Coating Cerâmico' },
  { src: '/images/frente_f250.jpg', label: 'Ford F-250', sub: 'Detalhamento Completo' },
  { src: '/images/roda_f250.jpg', label: 'F-250 Detail', sub: 'Proteção de Rodas' },
  { src: '/images/interior_f250.jpg', label: 'F-250 Interior', sub: 'Higienização Premium' },
  { src: '/images/frente_nivus_preta.jpg', label: 'Nivus', sub: 'Lavagem Artesanal' },
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

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {fotos.map((f, i) => (
            <div
              key={f.src}
              className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
            >
              <Image
                src={f.src}
                alt={f.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
