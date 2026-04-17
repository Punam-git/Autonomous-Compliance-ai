import { useNavigate } from 'react-router-dom'
import { TrendingUp, Brain, Zap, AlertTriangle } from 'lucide-react'
import { COMPANIES, STATS } from '../data/companies'
import { useApp } from '../context/AppContext'

// Risk colour helper
function riskColor(score) {
  if (score > 75) return { text: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/30',   bar: 'bg-red-500'   }
  if (score > 50) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', bar: 'bg-amber-500' }
  return           { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-500' }
}

function RiskBadge({ score }) {
  const c = riskColor(score)
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
      {score}
    </span>
  )
}

const FEATURES = [
  {
    icon: TrendingUp,
    title: '5-Year Pattern Analysis',
    desc: 'Deep historical analysis of regulatory trends across 5 regulators and 485+ circulars.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Brain,
    title: 'AI Multi-Agent Pipeline',
    desc: 'Specialized agents for scraping, reading, diffing, analyzing, and reporting — all automated.',
    color: 'from-purple-500 to-purple-700',
  },
  {
    icon: Zap,
    title: 'Predict Before It Happens',
    desc: 'LLM-powered forecasting tells you what the next regulation will look like — before it drops.',
    color: 'from-cyan-500 to-cyan-700',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { setSelectedCompany } = useApp()

  function handleSelect(company) {
    setSelectedCompany(company)
    navigate('/company')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* ── Hero ── */}
      <section className="text-center pt-6 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI-Powered Regulatory Intelligence
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            ComplianceIQ
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Turn <span className="text-white font-semibold">5 Years of Regulatory Data</span> into{' '}
          <span className="text-cyan-400 font-semibold">Future Predictions</span>
        </p>

        {/* Stat bar */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {STATS.map(({ label, value }) => (
            <div key={label} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/50 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Company Grid ── */}
      <section>
        <h2 className="text-lg font-semibold text-white/80 mb-4">
          Select a Company to Analyze
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {COMPANIES.map((company) => {
            const c = riskColor(company.riskScore)
            return (
              <button
                key={company.id}
                onClick={() => handleSelect(company)}
                className={`
                  group text-left p-4 rounded-2xl border bg-white/3 hover:bg-white/7
                  border-white/10 hover:border-blue-500/40
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10
                  cursor-pointer
                `}
              >
                {/* Icon + name */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{company.icon}</span>
                    <p className="text-sm font-bold text-white mt-1">{company.name}</p>
                    <p className="text-xs text-white/40">{company.sector}</p>
                  </div>
                  <RiskBadge score={company.riskScore} />
                </div>

                {/* Compliance bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/50">Compliance</span>
                    <span className="text-white font-medium">{company.complianceScore}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                      style={{ width: `${company.complianceScore}%` }}
                    />
                  </div>
                </div>

                {/* Biggest fear */}
                <div className={`flex items-start gap-1.5 px-2 py-1.5 rounded-lg ${c.bg} border ${c.border}`}>
                  <AlertTriangle size={11} className={`${c.text} mt-0.5 shrink-0`} />
                  <p className={`text-xs font-medium ${c.text} leading-tight`}>{company.biggestFear}</p>
                </div>

                <p className="text-xs text-blue-400 mt-3 group-hover:text-cyan-400 transition-colors">
                  Analyze → 
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Why ComplianceIQ ── */}
      <section>
        <h2 className="text-lg font-semibold text-white/80 mb-4">Why ComplianceIQ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="p-5 rounded-2xl bg-white/3 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
