'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const WHATSAPP_NUMBER = '5547997478717'

interface Props {
  servicoSelecionado?: string
  onClear?: () => void
  onJumpToStep2?: (fn: () => void) => void
}

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
      onJumpToStep2(() => setStep(2))
    }
  }, [onJumpToStep2])

  const confirmar = () => {
    const msg = encodeURIComponent(
      `Olá! Gostaria de agendar o serviço *${form.servico}* para o dia *${form.data}*.\n\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nVeículo: ${form.veiculo}`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const inputClass = "w-full bg-[rgba(8,13,26,0.8)] border border-[rgba(0,180,255,0.15)] rounded-lg px-4 py-3.5 text-white placeholder-[#8898B3] text-sm font-light focus:outline-none focus:border-[#00B4FF] transition-all duration-300"

  return (
    <section id="agendamento" className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: '#080D1A' }}
    >
      {/* F250 background subtle */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image src="/images/roda_f250.jpg" alt="" fill className="object-cover object-center" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="neon-line" style={{ width: '60px' }} />
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-3">AGENDAR SERVIÇO</h2>
          <p className="text-[#8898B3] font-light">Preencha os dados e falaremos pelo WhatsApp.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-condensed font-semibold text-sm transition-all duration-300"
                style={{
                  background: step >= n ? '#00B4FF' : 'rgba(0,180,255,0.08)',
                  color: step >= n ? '#fff' : '#8898B3',
                  border: step >= n ? 'none' : '1px solid rgba(0,180,255,0.15)',
                }}
              >
                {step > n ? '✓' : n}
              </div>
              {n < 3 && (
                <div className="w-16 h-px transition-all duration-300"
                  style={{ background: step > n ? '#00B4FF' : 'rgba(0,180,255,0.15)' }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-6 md:p-8" style={{ border: '1px solid rgba(0,180,255,0.12)' }}>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-condensed font-semibold text-lg text-white mb-6 tracking-wide">Seus Dados</h3>
              <div>
                <label className="font-condensed text-xs tracking-widest uppercase text-[#8898B3] mb-2 block">Nome completo</label>
                <input className={inputClass} placeholder="Seu nome" value={form.nome} onChange={e => set('nome', e.target.value)} />
              </div>
              <div>
                <label className="font-condensed text-xs tracking-widest uppercase text-[#8898B3] mb-2 block">WhatsApp</label>
                <input className={inputClass} placeholder="(47) 9 0000-0000" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
              </div>
              <div>
                <label className="font-condensed text-xs tracking-widest uppercase text-[#8898B3] mb-2 block">Veículo</label>
                <input className={inputClass} placeholder="Ex: Honda Civic 2023" value={form.veiculo} onChange={e => set('veiculo', e.target.value)} />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.nome || !form.whatsapp || !form.veiculo}
                className="neon-btn w-full py-4 text-sm rounded-lg mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Próximo →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-condensed font-semibold text-lg text-white mb-6 tracking-wide">Serviço & Data</h3>
              <div>
                <label className="font-condensed text-xs tracking-widest uppercase text-[#8898B3] mb-2 block">Serviço desejado</label>
                <div className="relative">
                  <select
                    className={inputClass}
                    value={form.servico}
                    onChange={e => set('servico', e.target.value)}
                    style={{ appearance: 'none', paddingRight: '2.5rem', colorScheme: 'dark', cursor: 'pointer' }}
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
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                  >
                    <path fill="#00B4FF" d="M6 8L1 3h10z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="font-condensed text-xs tracking-widest uppercase text-[#8898B3] mb-2 block">Data desejada</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.data}
                  onChange={e => set('data', e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="outline-btn flex-1 py-4 text-sm rounded-lg">← Voltar</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.servico || !form.data}
                  className="neon-btn flex-1 py-4 text-sm rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Próximo →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-condensed font-semibold text-lg text-white mb-6 tracking-wide">Confirmar Agendamento</h3>
              <div className="space-y-3">
                {[
                  { l: 'Nome', v: form.nome },
                  { l: 'WhatsApp', v: form.whatsapp },
                  { l: 'Veículo', v: form.veiculo },
                  { l: 'Serviço', v: form.servico },
                  { l: 'Data', v: form.data },
                ].map(r => (
                  <div key={r.l} className="flex justify-between items-center py-3 border-b border-[rgba(0,180,255,0.08)]">
                    <span className="font-condensed text-xs tracking-widest uppercase text-[#8898B3]">{r.l}</span>
                    <span className="text-white text-sm font-light">{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="glass rounded-xl p-4 mt-4" style={{ border: '1px solid rgba(0,180,255,0.15)' }}>
                <p className="text-[#8898B3] text-xs font-light text-center">
                  Ao confirmar, você será redirecionado ao WhatsApp com a mensagem já preenchida.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="outline-btn flex-1 py-4 text-sm rounded-lg">← Voltar</button>
                <button onClick={confirmar} className="neon-btn flex-1 py-4 text-sm rounded-lg">
                  Agendar via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
