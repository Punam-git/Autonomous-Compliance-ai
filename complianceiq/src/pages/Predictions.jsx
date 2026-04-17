import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { Sparkles, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { predictionsData } from '../data/predictionsData'
import { COMPANIES } from '../data/companies'

// ── helpers ───────────────────────────────────────────────────────────────────

function probColor(p) {
  if (p >= 75) return { bar: '#ef4444', bg: 'bg-red-500/10',   border: 'border-red-500/30',   text: 'text-red-400',   label: 'High' }
  if (p >= 50) return { bar: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Medium' }
  return        { bar: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'Low' }
}

function NoCompany() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <Sparkles size={32} className="text-white/20" />
      <p className="text-white/50">Select a company from Home to see predictions.</p>
      <button onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
        Go to Home <ArrowRight size={14} />
      </button>
    </div>
  )
}

// ── Custom bar tooltip ────────────────────────────────────────────────────────

function ForecastTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const c = probColor(d.probability)
  return (
    <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs shadow-xl max-w-[200px]">
      <p className="font-bold text-white mb-1">{d.regulation}</p>
      <p className={`font-extrabold text-lg ${c.text} mb-1`}>{d.probability}%</p>
      <p className="text-white/50 leading-snug">{d.reason}</p>
    </div>
  )
}

// ── Custom bar label ──────────────────────────────────────────────────────────

function ProbLabel(props) {
  const { x, y, width, value } = props
  return (
    <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11}
      fontWeight={700} fill="#e2e8f0">
      {value}%
    </text>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Predictions() {
  const { selectedCompany } = useApp()
  if (!selectedCompany) return <NoCompany />

  const data = predictionsData[selectedCompany.id]
  const meta = COMPANIES.find(c => c.id === selectedCompany.id)
  const top  = [...data.forecasts].sort((a, b) => b.probability - a.probability)[0]
  const hitCount = data.patternEvidence.filter(e => e.occurred).length

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Predictions</h1>
          <p className="text-sm text-white/40 mt-0.5">
            {meta.icon} {meta.name} · AI-generated 6-month regulatory forecast
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
          bg-purple-500/15 border border-purple-500/30 text-purple-400">
          <Sparkles size={12} /> Powered by Pattern AI
        </span>
      </div>

      {/* ── Forecast chart ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">6-Month Regulatory Forecast — May–Oct 2025</h3>
        <p className="text-xs text-white/40 mb-5">Probability of each regulation being issued</p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.forecasts} margin={{ top: 24, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${v}%`} />
            <Tooltip content={<ForecastTooltip />} cursor={{ fill: '#ffffff08' }} />
            <Bar dataKey="probability" radius={[6, 6, 0, 0]} label={<ProbLabel />}>
              {data.forecasts.map((entry, i) => (
                <Cell key={i} fill={probColor(entry.probability).bar} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {[['≥75% High', '#ef4444'], ['50–74% Medium', '#f59e0b'], ['<50% Low', '#22c55e']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="w-3 h-3 rounded-sm" style={{ background: c }} />{l}
            </div>
          ))}
        </div>
      </div>

      {/* ── Forecast cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.forecasts.map((f, i) => {
          const c = probColor(f.probability)
          return (
            <div key={i} className={`rounded-2xl border p-4 ${c.bg} ${c.border}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-white/50">{f.month}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.bg} ${c.border} ${c.text}`}>
                  {c.label}
                </span>
              </div>
              <p className="text-sm font-bold text-white mb-1">{f.regulation}</p>
              <p className={`text-3xl font-extrabold ${c.text} mb-2`}>{f.probability}%</p>
              <p className="text-xs text-white/50 leading-snug">📊 {f.reason}</p>
            </div>
          )
        })}
      </div>

      {/* ── Pattern evidence table ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">{data.patternLabel}</h3>
            <p className="text-xs text-white/40 mt-0.5">
              Based on top prediction: <span className="text-white font-semibold">{top.regulation}</span>
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-xs text-blue-400 font-medium">Pattern Match</p>
            <p className="text-xl font-extrabold text-white">{hitCount}/5</p>
            <p className="text-xs text-white/40">years</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Year', 'Event Occurred?', 'Outcome'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-white/40 pb-3 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.patternEvidence.map((row) => (
                <tr key={row.year} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-6 font-mono text-xs text-white/60">{row.year}</td>
                  <td className="py-3 pr-6">
                    {row.occurred
                      ? <span className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                          <CheckCircle2 size={14} /> Yes
                        </span>
                      : <span className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                          <XCircle size={14} /> No
                        </span>
                    }
                  </td>
                  <td className="py-3 text-xs text-white/60">{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Result row */}
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Sparkles size={16} className="text-purple-400 shrink-0" />
          <p className="text-xs text-white/80">
            Result: <strong className="text-white">{hitCount}/5 = {hitCount * 20}% historical match</strong>
            {' '}→ Our prediction:{' '}
            <strong className={probColor(top.probability).text}>{top.probability}% probability</strong>
            {' '}for <strong className="text-white">{top.regulation}</strong>
          </p>
        </div>
      </div>

    </div>
  )
}
