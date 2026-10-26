'use client'
import { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER, WHATSAPP_URL, TELEFONE, IconWhatsApp } from './contato'

interface Props {
  servicoSelecionado?: string
  onClear?: () => void
  onJumpToStep2?: (fn: () => void) => void
}

const etapas = ['Seus dados', 'Serviço e data', 'Confirmar']

export default function Agendamento({ servicoSelecionado, onClear, onJumpToStep2 }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nome: '',
    whatsapp: '',
    veiculo: '',
    data: '',
    servico: servicoSelecionado || '',
  })

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  // When a service is pre-selected from a card, sync it into the form
  useEffect(() => {
    if (servicoSelecionado) {
      setForm(p => ({ ...p, servico: servicoSelecionado }))
    }
  }, [servicoSelecionado])

  // Expose jump-to-step-2 function to parent
  useEffect(() => {
    if (onJumpToStep2) {
      // já passou do passo 1? vai pro 2. senão, fica nos dados (serviço já vem escolhido)
      onJumpToStep2(() => setStep(p => (p === 1 ? 1 : 2)))
    }
  }, [onJumpToStep2])

  const [erros, setErros] = useState<Record<string, string>>({})

  const validar = (campos: [string, string, string][]) => {
    const e: Record<string, string> = {}
    campos.forEach(([k, valor, msg]) => { if (!valor.trim()) e[k] = msg })
    setErros(e)
    const primeiro = campos.find(([k]) => e[k])
    if (primeiro) document.getElementById(`ag-${primeiro[0]}`)?.focus()
    return !primeiro
  }

  const irPasso2 = () => {
    if (validar([
      ['nome', form.nome, 'Digite seu nome'],
      ['whats', form.whatsapp, 'Digite seu WhatsApp'],
      ['veiculo', form.veiculo, 'Informe o veículo'],
    ])) setStep(2)
  }

  const irPasso3 = () => {
    if (validar([['servico', form.servico, 'Escolha um serviço']])) setStep(3)
  }

  const confirmar = () => {
    const quando = dataBR ? `para o dia *${dataBR}*` : 'com data a combinar'
    const msg = encodeURIComponent(
      `Olá! Gostaria de agendar o serviço *${form.servico}* ${quando}.\n\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nVeículo: ${form.veiculo}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const dataBR = form.data ? form.data.split('-').reverse().join('/') : ''

  return (
    <section id="agendamento" className="py-11 md:py-28 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 lg:col-span-4">
          <h2 className="font-wide font-light text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.01em]">
            Agendar serviço
          </h2>
          <p className="mt-3 text-[15px] md:text-[16px] text-white/70 leading-relaxed max-w-[38ch]">
            Três passos rápidos. No fim, o WhatsApp abre com a mensagem pronta para enviar.
          </p>
          <p className="hidden md:block mt-10 text-[14px] text-muted">Prefere conversar direto?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex mt-2 items-center gap-2.5 text-[17px] text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white min-h-[44px]"
          >
            <IconWhatsApp /> {TELEFONE}
          </a>
        </div>

        <div className="mt-7 md:mt-0 md:col-span-7 lg:col-span-7 lg:col-start-6">
          {/* Progresso */}
          <ol className="grid grid-cols-3 gap-2 mb-5" aria-label="Etapas do agendamento">
            {etapas.map((e, i) => {
              const n = i + 1
              return (
                <li key={e} aria-current={step === n ? 'step' : undefined}>
                  <span className={`block h-[2px] rounded-full transition-colors duration-300 ${step >= n ? 'bg-white' : 'bg-white/15'}`} />
                  <span className={`mt-2 block text-[12.5px] md:text-[13px] ${step >= n ? 'text-white' : 'text-white/45'}`}>
                    {n}. {e}
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="rounded-3xl border border-line bg-graphite p-5 md:p-8">
            {step === 1 && (
              <div className="expand space-y-4">
                {form.servico && (
                  <p className="rounded-2xl border border-line px-4 py-3 text-[14px] text-white/80">
                    Serviço escolhido: <strong className="text-white font-medium">{form.servico}</strong>
                  </p>
                )}
                <div>
                  <label htmlFor="ag-nome" className="field-label">Nome completo</label>
                  <input id="ag-nome" className="field" placeholder="Seu nome" autoComplete="name" value={form.nome} onChange={e => { set('nome', e.target.value); setErros(x => ({ ...x, nome: '' })) }} aria-invalid={!!erros.nome} />
                  {erros.nome && <p role="alert" className="mt-1.5 text-[13px] text-[#ff8a80]">{erros.nome}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ag-whats" className="field-label">WhatsApp</label>
                    <input id="ag-whats" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="(47) 9 0000-0000" value={form.whatsapp} onChange={e => { set('whatsapp', e.target.value); setErros(x => ({ ...x, whats: '' })) }} aria-invalid={!!erros.whats} />
                    {erros.whats && <p role="alert" className="mt-1.5 text-[13px] text-[#ff8a80]">{erros.whats}</p>}
                  </div>
                  <div>
                    <label htmlFor="ag-veiculo" className="field-label">Veículo</label>
                    <input id="ag-veiculo" className="field" placeholder="Ex: Honda Civic 2023" value={form.veiculo} onChange={e => { set('veiculo', e.target.value); setErros(x => ({ ...x, veiculo: '' })) }} aria-invalid={!!erros.veiculo} />
                    {erros.veiculo && <p role="alert" className="mt-1.5 text-[13px] text-[#ff8a80]">{erros.veiculo}</p>}
                  </div>
                </div>
                <button
                  onClick={irPasso2}
                  className="btn-primary w-full !mt-6"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="expand space-y-4">
                <div>
                  <label htmlFor="ag-servico" className="field-label">Serviço desejado</label>
                  <div className="relative">
                    <select
                      id="ag-servico"
                      className="field appearance-none pr-10 cursor-pointer"
                      value={form.servico}
                      onChange={e => { set('servico', e.target.value); setErros(x => ({ ...x, servico: '' })) }}
                      aria-invalid={!!erros.servico}
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="">Selecione um serviço...</option>
                      <optgroup label="─ Tratamento Interno ─">
                      <option>Higienização Completa</option>
                      <option>Higienização de Bancos de Tecido</option>
                      <option>Higienização e Hidratação de Bancos de Couro</option>
                      <option>Vitrificação de Bancos de Couro</option>
                      <option>Higienização do Teto</option>
                      <option>Oxi-Sanitização</option>
                    </optgroup>
                    <optgroup label="─ Tratamento Externo ─">
                      <option>Lavagem Técnica</option>
                      <option>Lavagem Detalhada</option>
                    </optgroup>
                    <optgroup label="─ Motos ─">
                      <option>Lavagem Técnica (Moto)</option>
                      <option>Lavagem Detalhada (Moto)</option>
                    </optgroup>
                    <optgroup label="─ Inferior & Motor ─">
                      <option>Lavagem Técnica de Motor</option>
                      <option>Limpeza Técnica de Chassi</option>
                    </optgroup>
                    <optgroup label="─ Acabamentos e Detalhes ─">
                      <option>Revitalização de Plásticos</option>
                      <option>Vitrificação de Plásticos</option>
                      <option>Pintura de Rodas</option>
                    </optgroup>
                    <optgroup label="─ Pacotes ─">
                      <option>Higienização (Pacote)</option>
                      <option>Puro-Sangue (Pacote)</option>
                      <option>Mustang (Pacote)</option>
                      <option>Pacote Mensal de Lavagem Técnica</option>
                    </optgroup>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-white/60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {erros.servico && <p role="alert" className="mt-1.5 text-[13px] text-[#ff8a80]">{erros.servico}</p>}
                </div>
                <div>
                  <label htmlFor="ag-data" className="field-label">Data desejada <span className="text-white/40">(opcional)</span></label>
                  <input
                    id="ag-data"
                    type="date"
                    className="field"
                    value={form.data}
                    onChange={e => set('data', e.target.value)}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="flex gap-3 !mt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1">Voltar</button>
                  <button
                    onClick={irPasso3}
                    className="btn-primary flex-[1.4]"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="expand">
                <dl>
                  {[
                    { l: 'Nome', v: form.nome },
                    { l: 'WhatsApp', v: form.whatsapp },
                    { l: 'Veículo', v: form.veiculo },
                    { l: 'Serviço', v: form.servico },
                    { l: 'Data', v: dataBR || 'A combinar' },
                  ].map(r => (
                    <div key={r.l} className="flex justify-between gap-4 py-3 border-b border-line text-[15px]">
                      <dt className="text-muted">{r.l}</dt>
                      <dd className="text-white text-right">{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13px] text-white/60">
                  Ao confirmar, o WhatsApp abre com a mensagem já preenchida.
                </p>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-1">Voltar</button>
                  <button onClick={confirmar} className="btn-primary flex-[1.4]">
                    <IconWhatsApp /> Enviar
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="md:hidden mt-5 text-center text-[14px] text-muted">
            Prefere conversar direto?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 inline-block py-3">
              {TELEFONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
