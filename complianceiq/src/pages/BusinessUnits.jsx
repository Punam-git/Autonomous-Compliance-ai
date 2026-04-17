import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import { Target, ArrowRight, AlertTriangle, User, Flag } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { unitsData } from '../data/unitsData'
import { COMPANIES } from '../data/companies'

// ── helpers ───────────────────────────────────────────────────────────────────

function riskStyle(score) {
  if (score >= 75) return { color: '#ef4444', bg: 'bg-red-500/10',   border: 'border-red-500/30',   text: 'text-red-400',   label: 'High'   }
  if (score >= 50) return { color: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Medium' }
  return            { color: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'Low'    }
}

function priorityStyle(p) {
  if (p === 'High')   return 'bg-red-500/10 text-red-400 border-red-500/30'
  if (p === 'Medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  return 'bg-green-500/10 text-green-400 border-green-500/30'
}

function NoCompany() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <Target size={32} className="text-white/20" />
      <p className="text-white/50">Select a company from Home to see business units.</p>
      <button onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
        Go to Home <ArrowRight size={14} />
      </button>
    </div>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function UnitTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const s = riskStyle(d.risk)
  return (
    <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs shadow-xl max-w-[220px]">
      <p className="font-bold text-white mb-1">{d.name}</p>
      <p className={`text-2xl font-extrabold ${s.text} mb-1`}>{d.risk}</p>
      <p className="text-white/50 leading-snug">{d.regulation}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessUnits() {
  const { selectedCompany } = useApp()
  if (!selectedCompany) return <NoCompany />

  const data = unitsData[selectedCompany.id]
  const meta = COMPANIES.find(c => c.id === selectedCompany.id)

  // Sort descending for horizontal bar
  const sorted = [...data.units].sort((a, b) => b.risk - a.risk)

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Business Units</h1>
        <p className="text-sm text-white/40 mt-0.5">
          {meta.icon} {meta.name} · Risk exposure by division
        </p>
      </div>

      {/* ── Horizontal bar chart ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-5">Risk Score by Business Unit</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false} tickLine={false} tickFormatter={v => `${v}`} />
            <YAxis type="category" dataKey="name" width={140}
              tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }}
              axisLine={false} tickLine={false} />
            <Tooltip content={<UnitTooltip />} cursor={{ fill: '#ffffff06' }} />
            <Bar dataKey="risk" radius={[0, 6, 6, 0]} barSize={22}>
              <LabelList dataKey="risk" position="right"
                style={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 700 }}
                formatter={v => `${v}`} />
              {sorted.map((entry, i) => (
                <Cell key={i} fill={riskStyle(entry.risk).color} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Risk legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {[['🔴 High ≥75', 'text-red-400'], ['🟡 Medium 50–74', 'text-amber-400'], ['🟢 Low <50', 'text-green-400']].map(([l, c]) => (
            <span key={l} className={`text-xs font-medium ${c}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* ── Unit detail cards 2×2 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.units.map((unit) => {
          const s = riskStyle(unit.risk)
          return (
            <div key={unit.name} className={`rounded-2xl border ${s.border} ${s.bg} p-5 space-y-3`}>
              {/* Title row */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-extrabold text-white">{unit.name}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-2xl font-extrabold ${s.text}`}>{unit.risk}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.border} ${s.text}`}>
                    {s.label}
                  </span>
                </div>
              </div>

              {/* Risk bar */}
              <div className="h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${unit.risk}%`, background: s.color }} />
              </div>

              {/* Details */}
              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={13} className={`${s.text} shrink-0 mt-0.5`} />
                  <p className="text-xs text-white/70">{unit.regulation}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Flag size={13} className="text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-white/70">{unit.action}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-white/30" />
                    <span className="text-xs text-white/50">{unit.owner}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityStyle(unit.priority)}`}>
                    {unit.priority}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
