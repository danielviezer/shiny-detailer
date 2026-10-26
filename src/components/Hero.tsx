import Image from 'next/image'
import { WHATSAPP_URL, IconWhatsApp, IconPin, IconList, IconCalendar } from './contato'

const fatos = [
  { icon: IconPin, t: 'Studio em Itajaí, SC' },
  { icon: IconList, t: '15 serviços e 4 pacotes' },
  { icon: IconCalendar, t: 'Agendamento pelo WhatsApp' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative">
      <div className="max-w-[1320px] mx-auto md:px-10 md:pt-24 md:pb-10 md:grid md:grid-cols-12 md:gap-10 md:items-center md:min-h-[min(100svh,860px)]">
        {/* Foto */}
        <div className="relative md:col-span-7 md:col-start-6 md:row-start-1">
          <div className="shine relative aspect-[1260/1170] md:rounded-[28px] overflow-hidden">
            <Image
              src="/images/cla_frente.jpg"
              alt="Mercedes-Benz CLA branco recém-detalhado no Shiny Car Studio"
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="photo-mono object-cover"
              style={{ objectPosition: '50% 60%' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent md:hidden" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent md:hidden" />
          </div>
        </div>

        {/* Texto */}
        <div className="relative z-10 px-4 -mt-24 md:mt-0 md:px-0 md:col-span-5 md:col-start-1 md:row-start-1">
          <h1 className="rise font-wide font-light text-[38px] xs:text-[42px] leading-[1.02] tracking-[-0.02em] md:text-[64px] lg:text-[76px]">
            Onde o detalhe define tudo.
          </h1>
          <p className="rise mt-4 md:mt-6 text-[16px] md:text-[18px] leading-relaxed text-white/75 max-w-[34ch]" style={{ animationDelay: '120ms' }}>
            Detalhamento automotivo em Itajaí: higienização interna, lavagem detalhada, coating e polimento.
          </p>
          <div className="rise mt-6 md:mt-9 flex flex-col sm:flex-row gap-2.5 sm:gap-3" style={{ animationDelay: '220ms' }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <IconWhatsApp /> Agendar no WhatsApp
            </a>
            <a href="#servicos" className="btn-ghost">
              Ver serviços e preços
            </a>
          </div>
        </div>

        {/* Fatos verificáveis */}
        <ul className="mx-4 md:mx-0 mt-7 md:mt-4 md:col-span-12 grid grid-cols-3 border-y border-line md:border-y-0 md:border-t">
          {fatos.map(({ icon: Icon, t }, i) => (
            <li key={t} className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-3 py-4 md:py-5 text-[12.5px] md:text-[14px] leading-snug text-white/80 ${i ? 'pl-3 md:pl-8 border-l border-line' : 'pr-2'}`}>
              <Icon className="w-5 h-5 text-silver shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
