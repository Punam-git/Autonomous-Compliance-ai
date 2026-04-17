import { X, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

const STEPS = [
  { emoji: '🔍', name: 'RegWatch',     color: 'border-blue-500/40 bg-blue-500/8',   desc: 'Scans RBI, SEBI, MCA portals. Detects new circulars automatically.' },
  { emoji: '🔄', name: 'ChangeDetect', color: 'border-purple-500/40 bg-purple-500/8', desc: 'Compares old vs new regulation. Identifies every added, removed, or modified rule.' },
  { emoji: '🎯', name: 'ImpactMap',    color: 'border-amber-500/40 bg-amber-500/8',  desc: 'Maps changes to your company documents. Scores risk and financial exposure.' },
  { emoji: '✍️', name: 'LegalDraft',   color: 'border-green-500/40 bg-green-500/8',  desc: 'Drafts legally-worded amendment text for every affected clause.' },
]

export default function HowItWorksModal() {
  const { howItWorksOpen, setHowItWorksOpen } = useApp()
  if (!howItWorksOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setHowItWorksOpen(false)} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-extrabold text-white">How ComplianceIQ Works</h2>
            <p className="text-xs text-white/40 mt-0.5">4-agent AI pipeline for regulatory compliance</p>
          </div>
          <button onClick={() => setHowItWorksOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Pipeline diagram */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
            {STEPS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className={`rounded-xl border px-4 py-3 text-center min-w-[110px] ${s.color}`}>
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  <p className="text-xs font-bold text-white">{s.name}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={16} className="text-white/20 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Step descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STEPS.map((s, i) => (
              <div key={s.name} className={`rounded-xl border p-3 ${s.color}`}>
                <p className="text-xs font-bold text-white mb-1">
                  <span className="text-white/40 mr-1">Step {i + 1}:</span> {s.emoji} {s.name}
                </p>
                <p className="text-xs text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-4 p-3 rounded-xl bg-white/3 border border-white/10">
            <p className="text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {['React + Vite', 'Tailwind CSS', 'Claude API', 'Recharts', 'React Router'].map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
