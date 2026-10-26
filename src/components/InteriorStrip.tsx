import Image from 'next/image'

export default function InteriorStrip() {
  return (
    <section className="relative h-[34vh] md:h-[40vh] min-h-[240px] md:min-h-[280px] overflow-hidden">
      <Image
        src="/images/cla_interior.jpg"
        alt="Interior premium Mercedes CLA"
        fill
        className="object-cover"
        style={{ objectPosition: 'center 48%' }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(5,8,16,0.5) 0%, rgba(5,8,16,0.9) 100%)'
      }} />

      <div className="absolute inset-0 flex items-center justify-end">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full text-right">
          <div className="max-w-lg ml-auto">
            <div className="font-condensed text-xs tracking-[0.3em] uppercase text-[#00B4FF] mb-3">Higienização de Luxo</div>
            <h3 className="font-display text-3xl md:text-5xl text-white mb-2 md:mb-3">
              INTERIOR<br />
              <span className="text-[#00B4FF]">IMPECÁVEL</span>
            </h3>
            <p className="text-[#8898B3] font-light text-sm">
              Limpeza profunda que transforma o interior do seu veículo em uma experiência premium.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
