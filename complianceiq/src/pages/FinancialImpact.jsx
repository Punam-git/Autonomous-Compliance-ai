import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import { DollarSign, ArrowRight, TrendingUp, TrendingDown, AlertTriangle, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { financialData } from '../data/predictionsData'
import { COMPANIES } from '../data/companies'

function NoCompany() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <DollarSign size={32} className="text-white/20" />
      <p className="text-white/50">Select a company from Home to see financial impact.</p>
      <button onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
        Go to Home <ArrowRight size={14} />
      </button>
    </div>
  )
}

// ── Scenario card ─────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    key: 'full',
    label: 'Full Compliance',
    icon: ShieldCheck,
    gradient: 'from-green-600 to-emerald-700',
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    textColor: 'text-green-400',
    tag: 'Recommended',
    tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    key: 'partial',
    label: 'Partial Compliance',
    icon: AlertTriangle,
    gradient: 'from-amber-600 to-orange-700',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    textColor: 'text-amber-400',
    tag: 'Risky',
    tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    key: 'none',
    label: 'No Compliance',
    icon: TrendingDown,
    gradient: 'from-red-700 to-rose-800',
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    textColor: 'text-red-400',
    tag: 'Critical Risk',
    tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
]

function ScenarioCard({ scenario, d }) {
  const { label, icon: Icon, gradient, border, bg, textColor, tag, tagColor } = scenario
  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5 flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tagColor}`}>{tag}</span>
      </div>

      <h3 className="text-base font-extrabold text-white">{label}</h3>

      {/* Metrics */}
      <div className="space-y-2.5">
        {d.costHigh > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Compliance Cost</span>
            <span className="text-sm font-bold text-white">
              ₹{d.costLow}L{d.costHigh !== d.costLow ? `–${d.costHigh}L` : ''}
            </span>
          </div>
        )}
        {d.saves && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Penalty Savings</span>
            <span className="text-sm font-bold text-green-400">₹{d.saves}L saved</span>
          </div>
        )}
        {d.net && (
          <div className={`flex justify-between items-center pt-2 border-t border-white/10`}>
            <span className="text-xs font-semibold text-white/70">Net Benefit</span>
            <span className={`text-lg font-extrabold ${textColor}`}>{d.net}</span>
          </div>
        )}
        {d.risk && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Penalty Exposure</span>
            <span className="text-sm font-bold text-red-400">{d.risk}</span>
          </div>
        )}
        {d.riskNote && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${border} ${bg}`}>
            <AlertTriangle size={12} className={textColor} />
            <span className={`text-xs font-medium ${textColor}`}>{d.riskNote}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const val = payload[0].value
  return (
    <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs shadow-xl">
      <p className="font-bold text-white mb-1">{label}</p>
      <p className={`font-extrabold text-base ${val >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {val >= 0 ? '+' : ''}₹{Math.abs(val)}L net
      </p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FinancialImpact() {
  const { selectedCompany } = useApp()
  if (!selectedCompany) return <NoCompany />

  const d    = financialData[selectedCompany.id]
  const meta = COMPANIES.find(c => c.id === selectedCompany.id)

  const chartData = [
    { name: 'Full Compliance',    value: d.full.netVal,    fill: '#22c55e' },
    { name: 'Partial Compliance', value: d.partial.netVal, fill: '#f59e0b' },
    { name: 'No Compliance',      value: d.none.netVal,    fill: '#ef4444' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Financial Impact</h1>
        <p className="text-sm text-white/40 mt-0.5">
          {meta.icon} {meta.name} · 3-scenario compliance cost analysis
        </p>
      </div>

      {/* ── 3 Scenario cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCENARIOS.map(s => (
          <ScenarioCard key={s.key} scenario={s} d={d[s.key]} />
        ))}
      </div>

      {/* ── Comparison bar chart ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Scenario Comparison — Net Financial Outcome</h3>
        <p className="text-xs text-white/40 mb-5">
          Positive = net benefit after compliance cost · Negative = net loss from penalties
        </p>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${v}L`} />
            <Tooltip content={<BarTooltip />} cursor={{ fill: '#ffffff08' }} />
            <ReferenceLine y={0} stroke="#ffffff20" strokeWidth={1} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}
              label={{ position: 'top', fontSize: 11, fontWeight: 700, fill: '#e2e8f0',
                formatter: v => `${v >= 0 ? '+' : ''}₹${Math.abs(v)}L` }}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom insight ── */}
      <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/30 flex items-start gap-3">
        <TrendingUp size={20} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-400 mb-1">ROI of Full Compliance</p>
          <p className="text-sm text-white/70 leading-relaxed">
            For <strong className="text-white">{meta.name}</strong>, full compliance delivers a net benefit of{' '}
            <strong className="text-green-400">{d.full.net}</strong> — compared to a potential loss of{' '}
            <strong className="text-red-400">{d.none.risk}</strong> in the no-compliance scenario.
            The cost of compliance is{' '}
            <strong className="text-white">
              {Math.round((d.full.costHigh / Math.abs(d.none.netVal)) * 100)}%
            </strong>{' '}
            of the maximum penalty exposure.
          </p>
        </div>
      </div>

    </div>
  )
}
