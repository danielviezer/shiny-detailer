import Image from 'next/image'

export default function RodaStrip() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#050810' }}>
      <div className="absolute inset-0 opacity-10">
        <Image src="/images/roda_f250.jpg" alt="" fill className="object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #050810 0%, transparent 50%, #050810 100%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { n: '200+', desc: 'Veículos atendidos', icon: '🚗' },
            { n: '5★', desc: 'Avaliação média', icon: '⭐' },
            { n: '100%', desc: 'Satisfação garantida', icon: '✅' },
            { n: '2+', desc: 'Anos de experiência', icon: '🏆' },
          ].map(s => (
            <div key={s.n}
              className="glass text-center py-8 px-4 rounded-2xl"
              style={{ border: '1px solid rgba(0,180,255,0.1)' }}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-display text-4xl md:text-5xl text-[#00B4FF] mb-2"
                style={{ textShadow: '0 0 20px rgba(0,180,255,0.3)' }}
              >
                {s.n}
              </div>
              <div className="font-condensed text-xs tracking-widest uppercase text-[#8898B3]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
