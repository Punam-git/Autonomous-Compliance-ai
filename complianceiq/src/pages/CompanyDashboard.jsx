import { useNavigate } from 'react-router-dom'
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceDot,
} from 'recharts'
import { ShieldCheck, AlertTriangle, FileText, TrendingUp, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { companiesData } from '../data/companiesData'
import { COMPANIES } from '../data/companies'

// ── helpers ───────────────────────────────────────────────────────────────────

function riskColor(score) {
  if (score > 75) return { text: 'text-red-400',   ring: '#ef4444', bg: 'bg-red-500/10',   border: 'border-red-500/30'   }
  if (score > 50) return { text: 'text-amber-400', ring: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30' }
  return           { text: 'text-green-400', ring: '#22c55e', bg: 'bg-green-500/10', border: 'border-green-500/30' }
}

function severityStyle(s) {
  if (s === 'High')   return 'bg-red-500/10 text-red-400 border-red-500/30'
  if (s === 'Medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  return 'bg-green-500/10 text-green-400 border-green-500/30'
}

// ── Risk ring (SVG) ───────────────────────────────────────────────────────────

function RiskRing({ score }) {
  const c = riskColor(score)
  const r = 36, circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#ffffff0d" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={c.ring} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div className="absolute text-center">
        <p className={`text-xl font-extrabold ${c.text}`}>{score}</p>
        <p className="text-xs text-white/40">Risk</p>
      </div>
    </div>
  )
}

// ── Metric card ───────────────────────────────────────────────────────────────

function MetricCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-4 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-white/40 mb-0.5">{label}</p>
        <p className="text-xl font-extrabold text-white">{value}</p>
        {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs shadow-xl max-w-xs">
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}{p.name === 'Compliance %' ? '%' : p.name === 'Penalty ₹L' ? 'L' : ''}</span>
        </div>
      ))}
    </div>
  )
}

// ── Event dot tooltip ─────────────────────────────────────────────────────────

function EventDot({ cx, cy, payload, dataKey }) {
  if (dataKey !== 'compliance_rate') return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#facc15" stroke="#0a0f1e" strokeWidth={2} />
      <title>{payload.event}</title>
    </g>
  )
}

// ── No company selected state ─────────────────────────────────────────────────

function NoCompany({ onSelect }) {
  const navigate = useNavigate()
  const { setSelectedCompany } = useApp()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <ShieldCheck size={28} className="text-white/30" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white/70 mb-1">No Company Selected</h2>
        <p className="text-sm text-white/30">Pick a company from the home page to see its dashboard.</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
      >
        Go to Home <ArrowRight size={14} />
      </button>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CompanyDashboard() {
  const { selectedCompany } = useApp()

  if (!selectedCompany) return <NoCompany />

  const data   = companiesData[selectedCompany.id]
  const meta   = COMPANIES.find(c => c.id === selectedCompany.id)
  const rc     = riskColor(meta.riskScore)

  // Derived metrics
  const avgCompliance  = Math.round(data.history.reduce((s, r) => s + r.compliance_rate, 0) / data.history.length)
  const totalPenalty   = data.history.reduce((s, r) => s + r.penalty_lakhs, 0)
  const totalCirculars = data.history.reduce((s, r) => s + r.circulars, 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ── Company header ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 flex flex-wrap items-center gap-6">
        <div className="text-4xl">{data.icon}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-2xl font-extrabold text-white">{data.name}</h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400">
              {data.sector}
            </span>
          </div>
          <p className="text-sm text-white/40">5-Year Compliance Journey · 2020 – 2024</p>

          {/* Compliance bar */}
          <div className="mt-3 max-w-xs">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/50">Compliance Score</span>
              <span className="text-white font-bold">{meta.complianceScore}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                style={{ width: `${meta.complianceScore}%` }} />
            </div>
          </div>
        </div>

        {/* Risk ring */}
        <div className="flex flex-col items-center gap-1">
          <RiskRing score={meta.riskScore} />
          <span className={`text-xs font-semibold ${rc.text}`}>
            {meta.riskScore > 75 ? 'High Risk' : meta.riskScore > 50 ? 'Medium Risk' : 'Low Risk'}
          </span>
        </div>

        {/* Biggest fear */}
        <div className={`px-4 py-3 rounded-xl border ${rc.bg} ${rc.border} max-w-xs`}>
          <p className="text-xs text-white/40 mb-0.5">Biggest Regulatory Fear</p>
          <p className={`text-sm font-bold ${rc.text}`}>⚠ {meta.biggestFear}</p>
        </div>
      </div>

      {/* ── 4 Metric cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={ShieldCheck}  label="5-Yr Avg Compliance"  value={`${avgCompliance}%`}    sub="2020 – 2024"          color="bg-blue-600" />
        <MetricCard icon={AlertTriangle} label="Total Penalties Paid" value={`₹${totalPenalty}L`}   sub="Cumulative 5 years"   color="bg-red-600" />
        <MetricCard icon={FileText}      label="Circulars Handled"    value={totalCirculars}          sub="Across all regulators" color="bg-purple-600" />
        <MetricCard icon={TrendingUp}    label="Current Risk Score"   value={meta.riskScore}          sub={meta.riskScore > 75 ? '🔴 High' : meta.riskScore > 50 ? '🟡 Medium' : '🟢 Low'} color="bg-amber-600" />
      </div>

      {/* ── Main chart ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
          <h3 className="text-sm font-bold text-white">
            {data.name} — 5-Year Compliance Journey
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Yellow dots = key events (hover to read)
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data.history} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />

            {/* Left Y — compliance % */}
            <YAxis yAxisId="left" domain={[60, 105]}
              tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${v}%`} />

            {/* Right Y — penalty + circulars */}
            <YAxis yAxisId="right" orientation="right"
              tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />

            <Tooltip content={<DarkTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 12 }}
              formatter={v => <span style={{ color: '#94a3b8' }}>{v}</span>} />

            {/* Line 1 — Compliance % */}
            <Line yAxisId="left" type="monotone" dataKey="compliance_rate" name="Compliance %"
              stroke="#3b82f6" strokeWidth={2.5}
              dot={<EventDot dataKey="compliance_rate" />}
              activeDot={{ r: 6, fill: '#3b82f6' }} />

            {/* Line 2 — Penalty */}
            <Line yAxisId="right" type="monotone" dataKey="penalty_lakhs" name="Penalty ₹L"
              stroke="#ef4444" strokeWidth={2}
              dot={{ fill: '#ef4444', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }} />

            {/* Line 3 — Circulars */}
            <Line yAxisId="right" type="monotone" dataKey="circulars" name="Circulars"
              stroke="#22c55e" strokeWidth={2} strokeDasharray="5 3"
              dot={{ fill: '#22c55e', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Event timeline below chart */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {data.history.map(h => (
            <div key={h.year} className="bg-white/3 border border-white/8 rounded-xl p-2.5">
              <p className="text-xs font-bold text-amber-400 mb-0.5">{h.year}</p>
              <p className="text-xs text-white/60 leading-tight">{h.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent circulars table ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-4">Recent Regulatory Circulars</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {['Year', 'Circular', 'Severity', 'Action Taken', 'Penalty'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-white/40 pb-3 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.circulars.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="py-3 pr-4 text-white/60 font-mono text-xs">{row.year}</td>
                  <td className="py-3 pr-4 text-white font-medium max-w-xs">{row.circular}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${severityStyle(row.severity)}`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-white/60 text-xs">{row.action}</td>
                  <td className="py-3 text-xs font-bold text-red-400">{row.penalty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
