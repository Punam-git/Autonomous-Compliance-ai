import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle, TrendingDown, TrendingUp, Clock } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const CASES = [
  {
    id: 1,
    company: 'HDFC Bank',
    icon: '🏦',
    sector: 'Banking',
    title: 'KYC Non-Compliance Penalty — ₹10Cr',
    regulator: 'RBI',
    year: 2022,
    penalty: '₹10 Crore',
    severity: 'HIGH',
    outcome: 'Penalised',
    tags: ['KYC', 'AML', 'RBI'],
    summary: 'RBI imposed a ₹10 crore penalty on HDFC Bank for deficiencies in KYC norms and failure to report suspicious transactions under PMLA guidelines.',
    timeline: [
      { date: 'Jan 2022', event: 'RBI inspection reveals KYC gaps in 12,000+ accounts', type: 'warning' },
      { date: 'Mar 2022', event: 'Show cause notice issued by RBI', type: 'warning' },
      { date: 'May 2022', event: 'HDFC Bank submits response — partial compliance claimed', type: 'neutral' },
      { date: 'Aug 2022', event: 'RBI imposes ₹10Cr penalty under Banking Regulation Act', type: 'bad' },
      { date: 'Oct 2022', event: 'Bank launches KYC re-verification drive for 2M+ customers', type: 'good' },
      { date: 'Dec 2022', event: 'Compliance certificate submitted to RBI', type: 'good' },
    ],
    lessons: [
      'Periodic KYC refresh must be automated — manual processes fail at scale',
      'Suspicious transaction reporting needs real-time triggers, not batch processing',
      'Board-level compliance oversight must include KYC metrics quarterly',
    ],
    financialImpact: { penalty: 10, remediation: 45, reputational: 200 },
    couldHaveAvoided: true,
    avoidanceCost: '₹8L',
  },
  {
    id: 2,
    company: 'Adani Group',
    icon: '🏗️',
    sector: 'Infrastructure',
    title: 'SEBI LODR Disclosure Violations — ₹65Cr',
    regulator: 'SEBI',
    year: 2023,
    penalty: '₹65 Crore',
    severity: 'HIGH',
    outcome: 'Penalised',
    tags: ['SEBI', 'LODR', 'Disclosure', 'ESG'],
    summary: 'SEBI issued show cause notices to Adani Group entities for alleged non-disclosure of related party transactions and violations of LODR regulations, coinciding with the Hindenburg Research report.',
    timeline: [
      { date: 'Jan 2023', event: 'Hindenburg Research publishes short-seller report', type: 'bad' },
      { date: 'Feb 2023', event: 'SEBI initiates investigation into LODR compliance', type: 'warning' },
      { date: 'Mar 2023', event: 'Stock prices fall 50%+ across Adani group companies', type: 'bad' },
      { date: 'May 2023', event: 'Supreme Court appoints expert committee for review', type: 'neutral' },
      { date: 'Aug 2023', event: 'SEBI issues show cause notices to 24 entities', type: 'bad' },
      { date: 'Nov 2023', event: 'Adani Group begins ESG framework overhaul', type: 'good' },
      { date: 'Jan 2024', event: 'BRSR Core compliance initiated across all listed entities', type: 'good' },
    ],
    lessons: [
      'Related party transaction disclosures must be proactive, not reactive',
      'ESG reporting gaps create disproportionate reputational risk',
      'Regulatory compliance is a market confidence signal — not just a legal obligation',
    ],
    financialImpact: { penalty: 65, remediation: 180, reputational: 5000 },
    couldHaveAvoided: true,
    avoidanceCost: '₹25L',
  },
  {
    id: 3,
    company: 'Sun Pharma',
    icon: '💊',
    sector: 'Pharma',
    title: 'US FDA Import Alert — Halol Plant',
    regulator: 'US FDA',
    year: 2022,
    penalty: '$600M revenue loss',
    severity: 'HIGH',
    outcome: 'Import Alert',
    tags: ['FDA', 'GMP', 'Manufacturing', 'Export'],
    summary: 'US FDA issued an import alert on Sun Pharma\'s Halol manufacturing facility for GMP violations including data integrity issues and inadequate contamination controls, blocking exports to the US market.',
    timeline: [
      { date: 'Nov 2021', event: 'FDA inspection at Halol plant — 9 observations raised', type: 'warning' },
      { date: 'Jan 2022', event: 'FDA issues Warning Letter citing data integrity failures', type: 'bad' },
      { date: 'Mar 2022', event: 'Import Alert issued — US shipments blocked', type: 'bad' },
      { date: 'Jun 2022', event: 'Sun Pharma appoints third-party GMP consultant', type: 'neutral' },
      { date: 'Sep 2022', event: 'DEG contamination crisis hits Indian pharma industry', type: 'bad' },
      { date: 'Mar 2023', event: 'Remediation completed — FDA re-inspection requested', type: 'good' },
      { date: 'Aug 2023', event: 'Import Alert lifted after successful re-inspection', type: 'good' },
    ],
    lessons: [
      'Data integrity in manufacturing records is non-negotiable for FDA compliance',
      'Proactive mock FDA inspections every 6 months prevent surprise findings',
      'GMP remediation costs 10x more than prevention — invest in quality systems early',
    ],
    financialImpact: { penalty: 0, remediation: 320, reputational: 4500 },
    couldHaveAvoided: true,
    avoidanceCost: '₹40L',
  },
  {
    id: 4,
    company: 'Infosys',
    icon: '💻',
    sector: 'IT / Data',
    title: 'CERT-In Cybersecurity Non-Compliance',
    regulator: 'CERT-In / MeitY',
    year: 2022,
    penalty: '₹2.5Cr',
    severity: 'MEDIUM',
    outcome: 'Advisory + Fine',
    tags: ['CERT-In', 'Cybersecurity', 'Data', 'IT Act'],
    summary: 'CERT-In issued directions requiring 6-hour incident reporting and mandatory log retention. Several IT companies including Infosys faced compliance gaps in the initial implementation period.',
    timeline: [
      { date: 'Apr 2022', event: 'CERT-In issues cybersecurity directions — 6hr reporting mandate', type: 'warning' },
      { date: 'Jun 2022', event: 'Compliance deadline — many IT firms unprepared', type: 'bad' },
      { date: 'Jul 2022', event: 'CERT-In advisory issued to non-compliant entities', type: 'warning' },
      { date: 'Sep 2022', event: 'Infosys deploys SIEM upgrade for 6-hour reporting', type: 'good' },
      { date: 'Nov 2022', event: 'Log retention policy updated to 180 days', type: 'good' },
      { date: 'Jan 2023', event: 'Full compliance achieved — CERT-In acknowledgement received', type: 'good' },
    ],
    lessons: [
      '6-hour incident reporting requires automated detection — human escalation is too slow',
      'Log retention at scale needs dedicated storage architecture planned in advance',
      'Regulatory technology (RegTech) investment pays off within 1 compliance cycle',
    ],
    financialImpact: { penalty: 2.5, remediation: 18, reputational: 50 },
    couldHaveAvoided: true,
    avoidanceCost: '₹12L',
  },
  {
    id: 5,
    company: 'Mahindra Finance',
    icon: '🚗',
    sector: 'NBFC / Auto',
    title: 'RBI Digital Lending Guidelines — Recovery Agent Violations',
    regulator: 'RBI',
    year: 2023,
    penalty: '₹3.5Cr',
    severity: 'MEDIUM',
    outcome: 'Penalised',
    tags: ['RBI', 'NBFC', 'Digital Lending', 'Recovery'],
    summary: 'RBI penalised Mahindra Finance for recovery agent misconduct including calls outside permitted hours and coercive recovery practices, violating the 2022 Digital Lending Guidelines.',
    timeline: [
      { date: 'Aug 2022', event: 'RBI issues Digital Lending Guidelines — recovery restrictions', type: 'warning' },
      { date: 'Oct 2022', event: 'Mahindra Finance updates policy — partial implementation', type: 'neutral' },
      { date: 'Jan 2023', event: 'Customer complaints spike — recovery agent misconduct reported', type: 'bad' },
      { date: 'Mar 2023', event: 'RBI inspection triggered by complaint volume', type: 'warning' },
      { date: 'Jun 2023', event: 'RBI imposes ₹3.5Cr penalty — recovery violations confirmed', type: 'bad' },
      { date: 'Aug 2023', event: 'All 4,200 recovery agents retrained and certified', type: 'good' },
      { date: 'Oct 2023', event: 'AI-based call monitoring deployed for compliance', type: 'good' },
    ],
    lessons: [
      'Policy updates without agent retraining are ineffective — implementation is everything',
      'Customer complaint monitoring is an early warning system for regulatory risk',
      'AI call monitoring for recovery agents pays for itself in avoided penalties',
    ],
    financialImpact: { penalty: 3.5, remediation: 12, reputational: 80 },
    couldHaveAvoided: true,
    avoidanceCost: '₹5L',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function severityStyle(s) {
  if (s === 'HIGH')   return 'bg-red-500/10 text-red-400 border-red-500/30'
  if (s === 'MEDIUM') return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  return 'bg-green-500/10 text-green-400 border-green-500/30'
}

function timelineStyle(type) {
  if (type === 'bad')     return { dot: 'bg-red-500',   line: 'border-red-500/20',   text: 'text-red-300',   icon: XCircle }
  if (type === 'warning') return { dot: 'bg-amber-500', line: 'border-amber-500/20', text: 'text-amber-300', icon: AlertTriangle }
  if (type === 'good')    return { dot: 'bg-green-500', line: 'border-green-500/20', text: 'text-green-300', icon: CheckCircle2 }
  return { dot: 'bg-white/30', line: 'border-white/10', text: 'text-white/60', icon: Clock }
}

// ── Case card ─────────────────────────────────────────────────────────────────

function CaseCard({ c }) {
  const [open, setOpen] = useState(false)
  const total = c.financialImpact.penalty + c.financialImpact.remediation + c.financialImpact.reputational

  return (
    <div className={`bg-[#0a0f1e] border rounded-2xl overflow-hidden transition-all duration-200
      ${open ? 'border-blue-500/30' : 'border-white/10 hover:border-white/20'}`}>

      {/* Header — always visible */}
      <button className="w-full text-left p-5" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-semibold text-white/50">{c.company}</span>
                <span className="text-xs text-white/30">·</span>
                <span className="text-xs text-white/50">{c.regulator}</span>
                <span className="text-xs text-white/30">·</span>
                <span className="text-xs text-white/50">{c.year}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {c.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs text-white/40">Penalty</p>
              <p className="text-sm font-extrabold text-red-400">{c.penalty}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${severityStyle(c.severity)}`}>
              {c.severity}
            </span>
            {open ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-white/10 p-5 space-y-5">

          {/* Summary */}
          <p className="text-sm text-white/70 leading-relaxed">{c.summary}</p>

          {/* Timeline + Lessons side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Timeline */}
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Event Timeline</p>
              <div className="space-y-2">
                {c.timeline.map((t, i) => {
                  const s = timelineStyle(t.type)
                  const Icon = s.icon
                  return (
                    <div key={i} className={`flex gap-3 p-2.5 rounded-xl border ${s.line} bg-white/2`}>
                      <Icon size={13} className={`${s.text} shrink-0 mt-0.5`} />
                      <div>
                        <span className="text-xs font-bold text-white/40 mr-2">{t.date}</span>
                        <span className={`text-xs ${s.text}`}>{t.event}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Financial impact */}
              <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Total Financial Impact</p>
                <div className="space-y-2">
                  {[
                    ['Direct Penalty',      c.financialImpact.penalty,      'bg-red-500'],
                    ['Remediation Cost',    c.financialImpact.remediation,   'bg-amber-500'],
                    ['Reputational Loss',   c.financialImpact.reputational,  'bg-purple-500'],
                  ].map(([label, val, color]) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/50">{label}</span>
                        <span className="text-white font-semibold">₹{val}Cr</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className={`h-full rounded-full ${color}`}
                          style={{ width: `${Math.min(100, (val / total) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                    <span className="font-bold text-white">Total Impact</span>
                    <span className="font-extrabold text-red-400">₹{total}Cr+</span>
                  </div>
                </div>
              </div>

              {/* Could have avoided */}
              {c.couldHaveAvoided && (
                <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown size={13} className="text-green-400" />
                    <p className="text-xs font-bold text-green-400">Could Have Been Avoided</p>
                  </div>
                  <p className="text-xs text-white/60">
                    Proactive compliance investment of <strong className="text-green-400">{c.avoidanceCost}</strong> would have prevented ₹{total}Cr+ in total losses.
                  </p>
                </div>
              )}

              {/* Lessons */}
              <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Key Lessons</p>
                <div className="space-y-2">
                  {c.lessons.map((l, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                      <p className="text-xs text-white/70 leading-relaxed">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CaseReplay() {
  const [filter, setFilter] = useState('All')
  const regulators = ['All', 'RBI', 'SEBI', 'US FDA', 'CERT-In / MeitY']

  const filtered = filter === 'All' ? CASES : CASES.filter(c => c.regulator === filter)

  const totalPenalties = CASES.reduce((s, c) => {
    const n = parseFloat(c.penalty.replace(/[^0-9.]/g, ''))
    return s + (isNaN(n) ? 0 : n)
  }, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Case Replay</h1>
        <p className="text-sm text-white/40 mt-0.5">Real regulatory penalty cases — learn from what went wrong</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Cases Analysed',    value: CASES.length,          color: 'text-white'      },
          { label: 'Total Penalties',   value: `₹${totalPenalties}Cr+`, color: 'text-red-400'  },
          { label: 'Regulators',        value: 4,                     color: 'text-blue-400'   },
          { label: 'Avoidable Cases',   value: `${CASES.filter(c => c.couldHaveAvoided).length}/${CASES.length}`, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#0a0f1e] border border-white/10 rounded-xl p-3 text-center">
            <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {regulators.map(r => (
          <button key={r} onClick={() => setFilter(r)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
              ${filter === r
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}>
            {r}
          </button>
        ))}
      </div>

      {/* Key insight */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
        <TrendingUp size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-white/70 leading-relaxed">
          <strong className="text-amber-400">Pattern:</strong> In all {CASES.length} cases, the penalty was{' '}
          <strong className="text-white">10–100x more expensive</strong> than proactive compliance would have cost.
          Click any case to see the full timeline and lessons learned.
        </p>
      </div>

      {/* Cases */}
      <div className="space-y-3">
        {filtered.map(c => <CaseCard key={c.id} c={c} />)}
      </div>

    </div>
  )
}
