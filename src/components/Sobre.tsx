import Image from 'next/image'

const frentes = [
  { t: 'Interior', d: 'Higienização completa, bancos de tecido e couro, teto e oxi-sanitização.' },
  { t: 'Exterior', d: 'Lavagem técnica e detalhada, coating, polimento e cristalização do para-brisa.' },
  { t: 'Motor, chassi e motos', d: 'Lavagem técnica do cofre do motor, limpeza de chassi e lavagem de motos.' },
]

export default function Sobre() {
  return (
    <section id="sobre" className="border-t border-line">
      <div className="max-w-[1320px] mx-auto md:px-10 md:py-28 md:grid md:grid-cols-12 md:gap-10 md:items-center">
        <div className="relative aspect-[1600/914] md:col-span-6 overflow-hidden">
          <Image
            src="/images/arte_shiny.jpg"
            alt="Arte da marca Shiny com a traseira de um carro escuro"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="px-4 pt-7 pb-11 md:p-0 md:col-span-6 lg:col-span-5 lg:col-start-8">
          <h2 className="font-wide font-light text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.01em]">
            Sobre o studio
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white/75 max-w-[52ch]">
            A Shiny Car Studio é um estúdio de detalhamento automotivo em Itajaí. Cada carro recebe atenção
            em cada detalhe, do interior ao cofre do motor, para ficar limpo, protegido e bem conservado.
          </p>
          <dl className="mt-7 border-t border-line">
            {frentes.map(f => (
              <div key={f.t} className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[10rem_1fr] gap-4 py-3.5 border-b border-line">
                <dt className="text-[14px] text-white">{f.t}</dt>
                <dd className="text-[14px] leading-relaxed text-white/65">{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
