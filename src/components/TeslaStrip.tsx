import Image from 'next/image'

export default function TeslaStrip() {
  return (
    <section className="relative h-[50vh] min-h-[300px] overflow-hidden">
      <Image
        src="/images/tesla.jpg"
        alt="Tesla detailing"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.7) 50%, rgba(5,8,16,0.85) 100%)'
      }} />
      {/* Scan line */}
      <div className="absolute top-1/2 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #00B4FF, transparent)' }}
      />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-xl">
            <div className="font-condensed text-xs tracking-[0.3em] uppercase text-[#00B4FF] mb-3">Tecnologia & Proteção</div>
            <h3 className="font-display text-4xl md:text-6xl text-white mb-4">
              PROTEÇÃO<br />
              <span className="text-[#00B4FF]">CERÂMICA</span>
            </h3>
            <p className="text-[#8898B3] font-light text-sm md:text-base max-w-md">
              O coating cerâmico de última geração cria uma barreira protetora impermeável,
              protegendo a pintura contra riscos, raios UV, chuva ácida e contaminantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
