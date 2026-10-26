'use client'
import { useState } from 'react'

const categories = [
  { id: 'pacotes', label: 'Pacotes' },
  { id: 'interno', label: 'Tratamento Interno' },
  { id: 'externo', label: 'Tratamento Externo' },
  { id: 'motos', label: 'Motos' },
  { id: 'inferior', label: 'Inferior & Motor' },
  { id: 'acabamentos', label: 'Acabamentos e Detalhes' },
]

interface Servico {
  nome: string
  desc: string
  preco: string
  badge?: string
  precos?: { label: string; valor: string }[]
  indicado?: string[]
}

const services: Record<string, Servico[]> = {
  interno: [
    {
      nome: 'Higienização Completa',
      desc: 'Limpeza profunda de todo o interior do veículo, removendo sujeiras, manchas, odores e microrganismos, deixando o ambiente mais limpo, saudável e agradável.',
      preco: 'A partir de R$550',
    },
    {
      nome: 'Higienização de Bancos de Tecido',
      desc: 'Remove manchas, ácaros, odores e sujeiras impregnadas, renovando o aspecto e a higiene dos estofados.',
      preco: 'A partir de R$400',
    },
    {
      nome: 'Higienização e Hidratação de Bancos de Couro',
      desc: 'Cuidado que limpa profundamente, remove sujeiras e repõe a maciez do couro, prevenindo ressecamento, rachaduras e desgaste precoce.',
      preco: 'A partir de R$300',
    },
    {
      nome: 'Vitrificação de Bancos de Couro',
      desc: 'Aplicação de um protetor resistente que cria uma barreira contra sujeira e desgaste, preservando a aparência e a durabilidade do couro por mais tempo.',
      preco: 'A partir de R$280',
    },
    {
      nome: 'Higienização do Teto',
      desc: 'Limpeza cuidadosa do forro interno para remover manchas, poeira e odores, preservando o material e melhorando o aspecto do interior do veículo.',
      preco: 'A partir de R$100',
    },
    {
      nome: 'Oxi-Sanitização',
      desc: 'Utilizamos um gerador de ozônio para eliminar bactérias, fungos, vírus e odores do interior do veículo, deixando o ambiente mais puro e saudável.',
      preco: 'A partir de R$150',
    },
  ],
  externo: [
    {
      nome: 'Lavagem Técnica',
      desc: 'Lavagem interna e externa, aplicação de proteção externa.',
      preco: 'A partir de R$120',
    },
    {
      nome: 'Lavagem Detalhada',
      desc: 'Lavagem interna e externa, com máxima atenção a todos os detalhes do veículo. Aplicação de proteção externa.',
      preco: '',
      precos: [
        { label: 'Hatch', valor: 'R$160' },
        { label: 'Sedan', valor: 'R$180' },
        { label: 'SUV', valor: 'R$210' },
      ],
    },
  ],
  motos: [
    {
      nome: 'Lavagem Técnica',
      desc: 'Limpeza das partes externas da moto, removendo sujeira e resíduos sem danificar componentes sensíveis.',
      preco: 'A partir de R$70',
    },
    {
      nome: 'Lavagem Detalhada',
      desc: 'Limpeza minuciosa que alcança áreas difíceis, removendo sujeiras acumuladas e realçando o acabamento da moto.',
      preco: 'A partir de R$130',
    },
  ],
  inferior: [
    {
      nome: 'Lavagem Técnica de Motor',
      desc: 'Limpeza cuidadosa do cofre do motor, removendo óleo, poeira e resíduos sem danificar componentes elétricos, melhorando o aspecto e a conservação.',
      preco: 'A partir de R$200',
    },
    {
      nome: 'Limpeza Técnica de Chassi',
      desc: 'Remoção de barro, graxa e sujeiras acumuladas na parte inferior do veículo, ajudando na conservação das peças e na prevenção de corrosão.',
      preco: 'A partir de R$250',
    },
  ],
  acabamentos: [
    {
      nome: 'Revitalização de Plásticos',
      desc: 'Tratamento para restaurar a cor, o aspecto original e a proteção de plásticos internos e externos, devolvendo aparência de novo e protegendo contra ressecamento.',
      preco: 'A partir de R$55',
    },
    {
      nome: 'Vitrificação de Plásticos',
      desc: 'Aplicação de um protetor de alta durabilidade que cria uma camada resistente contra sol, sujeira e desbotamento, mantendo o acabamento por muito mais tempo.',
      preco: 'A partir de R$300',
    },
    {
      nome: 'Pintura de Rodas',
      desc: 'Renova a cor e o acabamento, corrigindo desgastes, riscos e imperfeições para deixar as rodas com aparência de novas.',
      preco: 'A partir de R$300',
    },
  ],
  pacotes: [
    {
      nome: 'Higienização',
      desc: 'O pacote Higienização é focado no cuidado completo do interior do veículo, unindo higienização interna e limpeza detalhada. Ele remove sujeiras profundas, odores e resíduos acumulados, devolvendo sensação de carro novo, mais conforto e um ambiente interno realmente limpo e saudável.',
      preco: 'A partir de R$650',
      indicado: [
        'Para quem usa o carro diariamente e sente que o interior já está com aspecto de uso, poeira e manchas.',
        'Para veículos que transportam crianças, pets ou passam muito tempo fechados, acumulando odores e sujeiras invisíveis.',
        'Para quem quer recuperar a sensação de limpeza profunda e bem-estar ao entrar no carro.',
      ],
    },
    {
      nome: 'Puro-Sangue',
      desc: 'O pacote inicial da Shiny Car Studio reúne os cuidados essenciais para elevar o padrão do seu veículo: lavagem detalhada, Coating de 12 meses e cristalização do para-brisa. Um conjunto de serviços pensado para limpar profundamente, proteger a pintura e melhorar a visibilidade, entregando mais estética, proteção e segurança no dia a dia.',
      preco: 'A partir de R$450',
      indicado: [
        'Quem quer manter o carro sempre limpo, protegido e com aparência de bem cuidado no dia a dia.',
        'Veículos que ficam muito tempo expostos ao sol, chuva e sujeira, precisando de proteção extra na pintura.',
        'Quem deseja dar um up no visual do carro sem partir para serviços mais complexos.',
      ],
    },
    {
      nome: 'Mustang',
      desc: 'O pacote Mustang entrega um cuidado completo, unindo lavagem detalhada, polimento comercial, higienização interna e cristalização do para-brisa. É um serviço que renova o visual, recupera o brilho da pintura, limpa profundamente o interior e ainda garante proteção e visibilidade, elevando o padrão estético e de conservação do veículo.',
      preco: 'A partir de R$1.250',
      indicado: [
        'Quem quer renovar o carro como um todo, melhorando aparência externa e conforto interno de uma só vez.',
        'Veículos com pintura opaca, micro riscos e interior precisando de limpeza profunda.',
        'Quem busca um resultado visivelmente mais sofisticado, valorizando o veículo.',
      ],
    },
    {
      nome: 'Pacote Mensal de Lavagem Técnica',
      desc: '3 lavagens técnicas mensais com valor sob avaliação, onde será analisado o perfil do cliente e definido o plano ideal. Ideal para manter o veículo sempre impecável com a regularidade de uma assinatura.',
      preco: 'Sob avaliação',
      badge: 'Plano Mensal',
      indicado: [
        'Para quem quer manter o carro sempre limpo e bem cuidado todo mês.',
        'Motoristas que valorizam praticidade e atendimento recorrente.',
        'Plano personalizado conforme o perfil e necessidade do cliente.',
      ],
    },
  ],
}

const mensalItens = ['3 lavagens por mês', 'Plano personalizado', 'Assinatura recorrente', 'Atendimento prioritário']

// Nome igual ao da opção no formulário de agendamento
function nomeAgendamento(cat: string, s: Servico) {
  if (cat === 'pacotes') return s.badge ? s.nome : `${s.nome} (Pacote)`
  if (cat === 'motos') return `${s.nome} (Moto)`
  return s.nome
}

function precoPartes(s: Servico): { prefixo: string; valor: string } {
  if (s.precos) {
    const vals = s.precos.map(p => p.valor.replace('R$', ''))
    return { prefixo: 'Hatch a SUV', valor: `R$${vals[0]}–${vals[vals.length - 1]}` }
  }
  if (s.preco.startsWith('A partir de ')) return { prefixo: 'A partir de', valor: s.preco.replace('A partir de ', '') }
  return { prefixo: '', valor: s.preco }
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
    >
      <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Servicos({ onAgendar }: { onAgendar: (s: string) => void }) {
  const [cat, setCat] = useState('pacotes')
  const [aberto, setAberto] = useState<number | null>(null)
  const lista = services[cat]

  const trocar = (id: string) => {
    setCat(id)
    setAberto(null)
  }

  return (
    <section id="servicos" className="pt-10 pb-11 md:py-28 md:border-t md:border-line">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-24 md:self-start">
          <h2 className="font-wide font-light text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.01em]">
            Serviços e preços
          </h2>
          <p className="mt-3 text-[15px] text-white/70 leading-relaxed max-w-[36ch]">
            Toque em um serviço para ver os detalhes e agendar.
          </p>

          <div
            role="tablist"
            aria-label="Categorias de serviço"
            className="no-scrollbar mt-6 md:mt-10 -mx-4 px-4 md:mx-0 md:px-0 flex md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-visible md:border-t md:border-line"
          >
            {categories.map(c => {
              const ativo = cat === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={ativo}
                  aria-controls="painel-servicos"
                  onClick={() => trocar(c.id)}
                  className={`shrink-0 min-h-[44px] px-4 rounded-full border text-[14px] whitespace-nowrap transition-colors
                    md:rounded-none md:border-0 md:border-b md:border-line md:px-0 md:py-4 md:flex md:items-center md:justify-between md:text-[15px]
                    ${ativo
                      ? 'bg-white text-black border-white md:bg-transparent md:text-white'
                      : 'border-white/20 text-white/75 hover:text-white hover:border-white/50 md:text-white/55'}`}
                >
                  <span className="md:flex md:items-center md:gap-3">
                    <span className={`hidden md:inline-block h-px bg-white transition-all duration-300 ${ativo ? 'w-6' : 'w-0'}`} aria-hidden="true" />
                    {c.label}
                  </span>
                  <span className={`ml-2 tabular-nums text-[12px] ${ativo ? 'text-black/55 md:text-white/60' : 'text-white/45'}`}>
                    {services[c.id].length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <ul
          id="painel-servicos"
          role="tabpanel"
          aria-labelledby={`tab-${cat}`}
          className="mt-5 md:mt-0 md:col-span-8 lg:col-span-8 lg:col-start-5 border-t border-line"
        >
          {lista.map((s, i) => {
            const open = aberto === i
            const { prefixo, valor } = precoPartes(s)
            const id = `serv-${cat}-${i}`
            return (
              <li key={cat + s.nome} className={`border-b border-line transition-colors ${open ? 'bg-white/[0.03]' : ''}`}>
                <button
                  onClick={() => setAberto(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={id}
                  className="w-full min-h-[64px] md:min-h-[76px] flex items-center gap-4 text-left py-3.5 md:py-5 md:px-4 group"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block text-[16px] md:text-[19px] leading-snug text-white group-hover:text-white">
                      {s.nome}
                    </span>
                    {s.badge && (
                      <span className="mt-1.5 inline-block rounded-full border border-white/30 px-2.5 py-0.5 text-[12px] text-silver">
                        {s.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-right shrink-0">
                    {prefixo && <span className="block text-[11.5px] text-muted leading-tight">{prefixo}</span>}
                    <span className="block font-semiwide text-[16px] md:text-[18px] font-medium tabular-nums whitespace-nowrap">{valor}</span>
                  </span>
                  <Chevron open={open} />
                </button>

                {open && (
                  <div id={id} className="expand pb-5 md:px-4 md:pb-7 md:pr-16">
                    <p className="text-[15px] leading-relaxed text-white/75 max-w-[62ch]">{s.desc}</p>

                    {s.precos && (
                      <dl className="mt-4 grid grid-cols-3 gap-2 max-w-sm">
                        {s.precos.map(p => (
                          <div key={p.label} className="rounded-xl border border-line px-3 py-2.5">
                            <dt className="text-[12px] text-muted">{p.label}</dt>
                            <dd className="font-semiwide text-[16px] font-medium tabular-nums">{p.valor}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {s.badge && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {mensalItens.map(f => (
                          <li key={f} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] text-white/85">{f}</li>
                        ))}
                      </ul>
                    )}

                    {s.indicado && (
                      <div className="mt-5">
                        <h3 className="text-[13px] text-muted mb-2">Indicado para</h3>
                        <ul className="space-y-2">
                          {s.indicado.map(item => (
                            <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-white/75 max-w-[60ch]">
                              <span className="mt-[0.7em] h-px w-3 bg-white/50 shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button onClick={() => onAgendar(nomeAgendamento(cat, s))} className="btn-primary mt-5 w-full xs:w-auto">
                      {s.badge ? 'Agendar avaliação' : cat === 'pacotes' ? 'Agendar este pacote' : 'Agendar este serviço'}
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
