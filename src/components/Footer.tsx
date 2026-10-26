import Image from 'next/image'
import {
  WHATSAPP_URL, TELEFONE, EMAIL, ENDERECO, CIDADE, MAPS_URL,
  IconPin, IconMail, IconWhatsApp,
} from './contato'

export default function Footer() {
  const itens = [
    { icon: IconWhatsApp, l: TELEFONE, href: WHATSAPP_URL, ext: true },
    { icon: IconMail, l: EMAIL, href: `mailto:${EMAIL}`, ext: false },
    { icon: IconPin, l: `${ENDERECO} · ${CIDADE}`, href: MAPS_URL, ext: true },
  ]

  return (
    <footer id="contato" className="border-t border-line pt-10 md:pt-20 pb-24 md:pb-10">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 grid gap-10 md:grid-cols-12 md:gap-10 md:items-center">
        <div className="md:col-span-6 lg:col-span-5">
          <div className="flex items-center justify-between gap-4">
            <Image src="/images/logo_wide.jpg" alt="Logo Shiny Car Studio" width={540} height={240} className="w-[150px] md:w-[190px] h-auto -ml-2" />
            <p className="text-[14px] text-white/65 leading-snug max-w-[20ch] text-right">
              Detalhamento automotivo em Itajaí, Santa Catarina.
            </p>
          </div>

          <ul className="mt-6 border-t border-line">
            {itens.map(({ icon: Icon, l, href, ext }) => (
              <li key={l} className="border-b border-line">
                <a
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3.5 min-h-[54px] text-[15px] text-white/85 hover:text-white transition-colors break-all"
                >
                  <Icon className="w-5 h-5 text-silver shrink-0" />
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[1050/600] w-full max-w-[520px] md:ml-auto rounded-2xl overflow-hidden border border-line">
            <Image
              src="/images/arte_contato.jpg"
              alt={`Cartão Shiny Car Studio: ${TELEFONE}, ${EMAIL}, ${ENDERECO}`}
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="md:col-span-12 text-[13px] text-white/50 border-t border-line pt-6">
          © 2026 Shiny Car Studio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
