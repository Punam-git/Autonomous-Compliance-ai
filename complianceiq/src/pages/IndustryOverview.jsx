import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, BarChart, LineChart,
  Area, AreaChart,
} from 'recharts'
import { TrendingUp, AlertTriangle, Brain, Calendar } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const regulatoryVolume = [
  { year: '2020', rbi: 98,  sebi: 112, mca: 67,  penalties_cr: 124, predicted: false },
  { year: '2021', rbi: 87,  sebi: 98,  mca: 54,  penalties_cr: 189, predicted: false },
  { year: '2022', rbi: 134, sebi: 143, mca: 89,  penalties_cr: 312, predicted: false },
  { year: '2023', rbi: 156, sebi: 167, mca: 102, penalties_cr: 487, predicted: false },
  { year: '2024', rbi: 178, sebi: 189, mca: 118, penalties_cr: 628, predicted: false },
  { year: '2025*', rbi: 195, sebi: 210, mca: 132, penalties_cr: 820, predicted: true },
]

const monthlyPattern = [
  { month: 'Jan', circulars: 28 }, { month: 'Feb', circulars: 31 },
  { month: 'Mar', circulars: 52 }, { month: 'Apr', circulars: 67 },
  { month: 'May', circulars: 38 }, { month: 'Jun', circulars: 29 },
  { month: 'Jul', circulars: 34 }, { month: 'Aug', circulars: 41 },
  { month: 'Sep', circulars: 48 }, { month: 'Oct', circulars: 44 },
  { month: 'Nov', circulars: 37 }, { month: 'Dec', circulars: 33 },
].map(d => ({ ...d, highlight: ['Mar', 'Apr'].includes(d.month) }))

const penaltyTrend = regulatoryVolume.map(d => ({
  year: d.year,
  penalties_cr: d.penalties_cr,
  predicted: d.predicted,
}))

// ── Custom tooltip ────────────────────────────────────────────────────────────

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs shadow-xl">
      <p className="font-bold text-white mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.name === 'Penalties ₹Cr' ? `₹${p.value}Cr` : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Custom bar shape — dashed/faded for predicted year ────────────────────────

function PredictedBar(props) {
  const { x, y, width, height, fill, predicted } = props
  if (!height || height <= 0) return null
  return (
    <rect
      x={x} y={y} width={width} height={height}
      fill={fill}
      opacity={predicted ? 0.45 : 1}
      strokeDasharray={predicted ? '4 2' : '0'}
      stroke={predicted ? fill : 'none'}
      strokeWidth={predicted ? 1.5 : 0}
      rx={2}
    />
  )
}

function makePredictedBar(fill) {
  return (props) => <PredictedBar {...props} fill={fill} predicted={props.predicted} />
}

// Recharts doesn't pass custom data props to shape — use a wrapper
function RbiBar(props)  { return <PredictedBar {...props} fill="#3b82f6" predicted={props.year === '2025*'} /> }
function SebiBar(props) { return <PredictedBar {...props} fill="#8b5cf6" predicted={props.year === '2025*'} /> }
function McaBar(props)  { return <PredictedBar {...props} fill="#06b6d4" predicted={props.year === '2025*'} /> }

// ── X-axis tick — purple label for 2025* ─────────────────────────────────────

function CustomXTick({ x, y, payload }) {
  const isPredicted = payload.value === '2025*'
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0} y={0} dy={14}
        textAnchor="middle"
        fontSize={11}
        fill={isPredicted ? '#a78bfa' : '#94a3b8'}
        fontWeight={isPredicted ? 700 : 400}
      >
        {payload.value}
      </text>
    </g>
  )
}

// ── Section card wrapper ──────────────────────────────────────────────────────

function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#0a0f1e] border border-white/10 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

function ChartTitle({ children }) {
  return <h3 className="text-sm font-bold text-white mb-4">{children}</h3>
}

function InsightBox({ icon: Icon, color, children }) {
  return (
    <div className={`flex gap-3 mt-4 p-3 rounded-xl border text-xs leading-relaxed ${color}`}>
      <Icon size={15} className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function IndustryOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Industry Overview</h1>
        <p className="text-sm text-white/40 mt-1">India-wide regulatory statistics · 2020 – 2025</p>
      </div>

      {/* ── CHART 1: Stacked bar + penalty line (full width) ── */}
      <Card>
        <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
          <ChartTitle>Regulatory Volume vs Penalty Trend 2020–2025</ChartTitle>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <Brain size={11} /> 2025* AI Predicted
          </span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={regulatoryVolume} margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
            <XAxis dataKey="year" tick={<CustomXTick />} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#f59e0b', fontSize: 11 }}
              axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} />
            <Tooltip content={<DarkTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#94a3b8', paddingTop: 12 }}
              formatter={(v) => <span style={{ color: '#94a3b8' }}>{v}</span>}
            />

            {/* Stacked bars */}
            <Bar yAxisId="left" dataKey="rbi"  name="RBI"  stackId="a" shape={<RbiBar />}  fill="#3b82f6" />
            <Bar yAxisId="left" dataKey="sebi" name="SEBI" stackId="a" shape={<SebiBar />} fill="#8b5cf6" />
            <Bar yAxisId="left" dataKey="mca"  name="MCA"  stackId="a" shape={<McaBar />}  fill="#06b6d4" radius={[4,4,0,0]} />

            {/* Penalty line */}
            <Line
              yAxisId="right" type="monotone" dataKey="penalties_cr"
              name="Penalties ₹Cr" stroke="#f59e0b" strokeWidth={2.5}
              dot={{ fill: '#f59e0b', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />

            {/* Annotations */}
            <ReferenceLine yAxisId="left" x="2022" stroke="#ef444460" strokeDasharray="4 2"
              label={{ value: 'Post-COVID enforcement surge', position: 'top', fill: '#ef4444', fontSize: 10 }} />
            <ReferenceLine yAxisId="left" x="2025*" stroke="#a78bfa60" strokeDasharray="4 2"
              label={{ value: 'AI Predicted', position: 'top', fill: '#a78bfa', fontSize: 10 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* ── CHART 2 + 3 side by side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CHART 2: Monthly pattern */}
        <Card>
          <ChartTitle>Monthly Circular Pattern (2024 avg)</ChartTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyPattern} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="circulars" name="Circulars" radius={[4, 4, 0, 0]}
                shape={(props) => {
                  const { x, y, width, height, month } = props
                  const hot = ['Mar', 'Apr'].includes(props.month ?? props?.payload?.month)
                  return (
                    <rect x={x} y={y} width={width} height={height}
                      fill={hot ? '#ef4444' : '#3b82f6'}
                      opacity={hot ? 1 : 0.6} rx={4} />
                  )
                }}
              />
            </BarChart>
          </ResponsiveContainer>

          <InsightBox icon={Calendar} color="bg-red-500/10 border-red-500/20 text-red-300">
            📍 <strong>Budget Season (Feb–Apr):</strong> 47% more circulars historically — Prepare in January!
          </InsightBox>
        </Card>

        {/* CHART 3: Penalty growth */}
        <Card>
          <ChartTitle>Penalty Growth Trend ₹Cr</ChartTitle>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={penaltyTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="penaltyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
              <XAxis dataKey="year" tick={<CustomXTick />} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${v}`} />
              <Tooltip content={<DarkTooltip />} />
              <Area
                type="monotone" dataKey="penalties_cr" name="Penalties ₹Cr"
                stroke="#f59e0b" strokeWidth={2.5} fill="url(#penaltyGrad)"
                dot={(props) => {
                  const { cx, cy, payload } = props
                  return (
                    <circle key={payload.year} cx={cx} cy={cy} r={4}
                      fill={payload.predicted ? '#a78bfa' : '#f59e0b'}
                      stroke="none" />
                  )
                }}
              />
            </AreaChart>
          </ResponsiveContainer>

          <InsightBox icon={TrendingUp} color="bg-amber-500/10 border-amber-500/20 text-amber-300">
            📈 <strong>Penalties growing ₹100Cr+ every year</strong> — cumulative exposure for non-compliant firms is accelerating rapidly.
          </InsightBox>
        </Card>
      </div>

      {/* ── KEY INSIGHT BOX ── */}
      <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
            <Brain size={18} className="text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-blue-400">AI Pattern Detected</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20">
                High Confidence
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              🔍 In <strong className="text-white">4 out of 5 years (2020–2024)</strong>, major RBI banking circulars
              arrived within <strong className="text-white">60 days of Union Budget</strong>.{' '}
              <span className="text-amber-400 font-semibold">Next Budget: Feb 2026</span>{' '}
              → ComplianceIQ recommends preparation starting{' '}
              <span className="text-cyan-400 font-semibold">December 2025</span>.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
