import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, Play, CheckCircle2, Loader2, AlertCircle, ChevronRight,
         FileText, AlertTriangle, Zap, Download } from 'lucide-react'
import { CIRCULAR, FALLBACK_AGENT2, FALLBACK_AGENT3, FALLBACK_AGENT4 } from '../data/agentFallbacks'
import { runChangeDetect, runImpactMap, runLegalDraft } from '../services/claudeApi'

// ── Constants ─────────────────────────────────────────────────────────────────

const AGENT_DEFS = [
  { id: 1, emoji: '🔍', name: 'RegWatch',     role: 'Scans regulatory portals' },
  { id: 2, emoji: '🔄', name: 'ChangeDetect', role: 'Detects rule changes'     },
  { id: 3, emoji: '🎯', name: 'ImpactMap',    role: 'Maps business impact'     },
  { id: 4, emoji: '✍️', name: 'LegalDraft',   role: 'Drafts amendments'        },
]

const TABS = ['📄 Circular', '🔄 Changes', '🎯 Impact', '✍️ Amendments', '📊 Report']

const SEV = {
  HIGH:   'bg-red-500/10 text-red-400 border-red-500/30',
  MEDIUM: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  LOW:    'bg-green-500/10 text-green-400 border-green-500/30',
}
const PRI = {
  URGENT: 'bg-red-500/10 text-red-400 border-red-500/30',
  HIGH:   'bg-amber-500/10 text-amber-400 border-amber-500/30',
  MEDIUM: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function ts() {
  return new Date().toLocaleTimeString('en-IN', { hour12: false })
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date()
  return Math.max(0, Math.ceil(diff / 86400000))
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AgentBox({ def, status, task, elapsed }) {
  const colors = {
    idle:    'border-white/10 bg-white/3',
    working: 'border-blue-500/50 bg-blue-500/8 shadow-lg shadow-blue-500/10',
    done:    'border-green-500/40 bg-green-500/5',
    error:   'border-red-500/40 bg-red-500/5',
  }
  const dot = {
    idle:    <span className="w-2 h-2 rounded-full bg-white/20" />,
    working: <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />,
    done:    <CheckCircle2 size={14} className="text-green-400" />,
    error:   <AlertCircle size={14} className="text-red-400" />,
  }
  const label = { idle: 'IDLE', working: 'WORKING', done: 'DONE', error: 'ERROR' }
  const lc    = { idle: 'text-white/30', working: 'text-blue-400', done: 'text-green-400', error: 'text-red-400' }

  return (
    <div className={`flex-1 min-w-[130px] rounded-xl border p-3 transition-all duration-300 ${colors[status]}`}>
      <div className="text-xl mb-1">{def.emoji}</div>
      <p className="text-xs font-bold text-white">{def.name}</p>
      <p className="text-xs text-white/40 mb-2">{def.role}</p>
      <div className="flex items-center gap-1.5">
        {dot[status]}
        <span className={`text-xs font-bold ${lc[status]}`}>{label[status]}</span>
      </div>
      {status === 'working' && task && (
        <p className="text-xs text-blue-300/80 mt-1 leading-tight">{task}</p>
      )}
      {status === 'done' && elapsed && (
        <p className="text-xs text-green-400/70 mt-1">{elapsed}s</p>
      )}
    </div>
  )
}

function LogLine({ line }) {
  const color = line.includes('✅') ? 'text-green-400'
    : line.includes('❌') ? 'text-red-400'
    : line.includes('Agent') ? 'text-blue-300'
    : 'text-white/50'
  return <p className={`text-xs font-mono ${color}`}>{line}</p>
}

function SevBadge({ s }) {
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${SEV[s] ?? SEV.LOW}`}>{s}</span>
}

// ── Tab content components ────────────────────────────────────────────────────

function Tab1() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {[['Source', CIRCULAR.source], ['Circular No.', CIRCULAR.circular_no], ['Date', CIRCULAR.date]].map(([k, v]) => (
          <div key={k} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">{k}</p>
            <p className="text-sm font-bold text-white">{v}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <p className="text-sm font-bold text-white mb-1">{CIRCULAR.title}</p>
        <p className="text-xs text-blue-400">{CIRCULAR.changes_summary}</p>
      </div>
      <div className="p-4 rounded-xl bg-white/3 border border-white/10">
        <p className="text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Content</p>
        <pre className="text-xs text-white/80 whitespace-pre-wrap font-mono leading-relaxed">{CIRCULAR.content}</pre>
      </div>
    </div>
  )
}

function Tab2({ data }) {
  if (!data) return <p className="text-white/30 text-sm">Run the pipeline to see changes.</p>
  return (
    <div className="space-y-3">
      <div className="flex gap-4 flex-wrap mb-2">
        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/40">Total Changes</p>
          <p className="text-xl font-extrabold text-white">{data.total_changes}</p>
        </div>
        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/40">Deadline</p>
          <p className="text-sm font-bold text-amber-400">{data.deadline}</p>
        </div>
        <div className="flex-1 px-3 py-2 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs text-white/40">Summary</p>
          <p className="text-xs text-white/80">{data.summary}</p>
        </div>
      </div>
      {data.changes.map((c, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-white">{c.clause}</p>
            <SevBadge s={c.severity} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="p-2 rounded-lg bg-red-500/8 border border-red-500/20">
              <p className="text-xs text-red-400 font-semibold mb-0.5">Before</p>
              <p className="text-xs text-red-300/80 line-through">{c.old_rule}</p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/8 border border-green-500/20">
              <p className="text-xs text-green-400 font-semibold mb-0.5">After</p>
              <p className="text-xs text-green-300/90">{c.new_rule}</p>
            </div>
          </div>
          <p className="text-xs text-white/50">💡 {c.impact}</p>
        </div>
      ))}
    </div>
  )
}

function Tab3({ data }) {
  if (!data) return <p className="text-white/30 text-sm">Run the pipeline to see impact.</p>
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {[
          ['Risk Score', `${data.risk_score}/100`, data.risk_score >= 75 ? 'text-red-400' : 'text-amber-400'],
          ['Financial Exposure', data.financial_exposure, 'text-red-400'],
          ['Days to Comply', `${data.days_to_comply} days`, 'text-amber-400'],
        ].map(([k, v, c]) => (
          <div key={k} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">{k}</p>
            <p className={`text-xl font-extrabold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
        <p className="text-xs font-bold text-amber-400 mb-2">Top Actions Required</p>
        {data.top_actions.map((a, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <span className="text-amber-400 font-bold text-xs shrink-0">{i + 1}.</span>
            <p className="text-xs text-white/80">{a}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {data.affected_documents.map((d, i) => (
          <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/3 border border-white/10">
            <div>
              <p className="text-xs font-bold text-white">{d.document} — {d.clause}</p>
              <p className="text-xs text-white/50 mt-0.5">{d.current_text}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${PRI[d.priority] ?? PRI.MEDIUM}`}>
              {d.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Tab4({ data }) {
  if (!data) return <p className="text-white/30 text-sm">Run the pipeline to see amendments.</p>
  return (
    <div className="space-y-4">
      {data.amendments.map((a, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              {a.document}
            </span>
            <span className="text-xs font-bold text-white">{a.clause}</span>
          </div>
          <div className="p-3 rounded-lg bg-red-500/8 border border-red-500/20">
            <p className="text-xs font-bold text-red-400 mb-1">REMOVED</p>
            <p className="text-xs text-red-300/80 line-through font-mono leading-relaxed">{a.old_text}</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/8 border border-green-500/20">
            <p className="text-xs font-bold text-green-400 mb-1">ADDED</p>
            <p className="text-xs text-green-300/90 underline decoration-green-500/40 font-mono leading-relaxed">{a.new_text}</p>
          </div>
          <p className="text-xs text-white/40">📌 {a.reason}</p>
        </div>
      ))}
      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
        <p className="text-xs font-bold text-purple-400 mb-2">Implementation Checklist</p>
        {data.checklist.map((s, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <CheckCircle2 size={12} className="text-purple-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/70">{s}</p>
          </div>
        ))}
        <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-white/50">
            ⚖️ Lawyer review: <span className={data.lawyer_review_needed ? 'text-red-400 font-bold' : 'text-green-400'}>
              {data.lawyer_review_needed ? 'Required' : 'Not needed'}
            </span>
          </p>
          <p className="text-xs text-white/50">
            ⏱ Implementation: <span className="text-amber-400 font-bold">{data.implementation_days} days</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function Tab5({ a2, a3, a4 }) {
  if (!a2 || !a3 || !a4) return <p className="text-white/30 text-sm">Complete the pipeline to generate the report.</p>

  const days = daysUntil('2025-06-01')
  const now  = new Date().toLocaleString('en-IN')

  const report = `COMPLIANCE IMPACT REPORT
========================
Company   : Mahindra Finance
Circular  : RBI/2025-26/15 — Digital Lending Revised Norms
Generated : ${now}
Deadline  : June 1, 2025 (${days} days remaining)

EXECUTIVE SUMMARY
-----------------
${a2.summary}
Risk Score        : ${a3.risk_score}/100
Financial Exposure: ${a3.financial_exposure}
Days to Comply    : ${a3.days_to_comply}

KEY CHANGES (${a2.total_changes})
-----------
${a2.changes.map((c, i) => `${i + 1}. [${c.severity}] ${c.clause}\n   Before: ${c.old_rule}\n   After : ${c.new_rule}`).join('\n')}

AFFECTED DOCUMENTS
------------------
${a3.affected_documents.map(d => `• ${d.document} ${d.clause} [${d.priority}]`).join('\n')}

TOP 3 ACTIONS
-------------
${a3.top_actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

AMENDMENTS DRAFTED: ${a4.amendments.length}
IMPLEMENTATION DAYS: ${a4.implementation_days}
LAWYER REVIEW: ${a4.lawyer_review_needed ? 'REQUIRED' : 'Not needed'}
`

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {[
          ['Company',    'Mahindra Finance',    'text-white'],
          ['Circular',   'RBI/2025-26/15',      'text-blue-400'],
          ['Deadline',   'June 1, 2025',        'text-amber-400'],
          ['Days Left',  `${days} days`,        days < 30 ? 'text-red-400' : 'text-amber-400'],
          ['Risk Score', `${a3.risk_score}/100`, a3.risk_score >= 75 ? 'text-red-400' : 'text-amber-400'],
        ].map(([k, v, c]) => (
          <div key={k} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">{k}</p>
            <p className={`text-sm font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <pre className="text-xs font-mono text-white/70 bg-white/3 border border-white/10 rounded-xl p-4 whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {report}
      </pre>

      <button
        onClick={() => {
          const blob = new Blob([report], { type: 'text/plain' })
          const url  = URL.createObjectURL(blob)
          const a    = document.createElement('a')
          a.href = url; a.download = 'compliance_report_RBI_2025-26-15.txt'; a.click()
          URL.revokeObjectURL(url)
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
      >
        <Download size={14} /> Download Report
      </button>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LiveAgents() {
  const [statuses, setStatuses]   = useState({ 1: 'idle', 2: 'idle', 3: 'idle', 4: 'idle' })
  const [tasks,    setTasks]      = useState({})
  const [elapsed,  setElapsed]    = useState({})
  const [running,  setRunning]    = useState(false)
  const [done,     setDone]       = useState(false)
  const [tab,      setTab]        = useState(0)
  const [log,      setLog]        = useState([])
  const [a2,       setA2]         = useState(null)
  const [a3,       setA3]         = useState(null)
  const [a4,       setA4]         = useState(null)
  const logRef = useRef(null)

  const addLog = useCallback((msg) => {
    setLog(prev => [...prev, `[${ts()}] ${msg}`])
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [log])

  function setAgent(id, status, task = '') {
    setStatuses(p => ({ ...p, [id]: status }))
    setTasks(p => ({ ...p, [id]: task }))
  }

  async function runPipeline() {
    if (running) return
    setRunning(true); setDone(false)
    setStatuses({ 1: 'idle', 2: 'idle', 3: 'idle', 4: 'idle' })
    setTasks({}); setElapsed({}); setLog([])
    setA2(null); setA3(null); setA4(null)

    // ── Agent 1: RegWatch (simulated) ──────────────────────────────────────
    setAgent(1, 'working', 'Scanning RBI website...')
    addLog('Agent 1: Scanning RBI website...')
    await sleep(800)
    setTasks(p => ({ ...p, 1: 'Checking SEBI portal...' }))
    addLog('Agent 1: Checking SEBI portal...')
    await sleep(700)
    setTasks(p => ({ ...p, 1: 'NEW circular detected!' }))
    addLog('Agent 1: 🔔 NEW circular detected!')
    await sleep(600)
    setTasks(p => ({ ...p, 1: 'Downloading document...' }))
    await sleep(600)
    setTasks(p => ({ ...p, 1: '✅ Circular extracted!' }))
    await sleep(400)
    setAgent(1, 'done')
    setElapsed(p => ({ ...p, 1: '3.1' }))
    addLog('Agent 1: ✅ Circular found — RBI/2025-26/15')
    setTab(0)
    await sleep(400)

    // ── Agent 2: ChangeDetect (API) ────────────────────────────────────────
    const t2 = Date.now()
    setAgent(2, 'working', 'Calling Claude API...')
    addLog('Agent 2: Calling Claude API...')
    const result2 = await runChangeDetect()
    setA2(result2)
    setAgent(2, 'done')
    setElapsed(p => ({ ...p, 2: ((Date.now() - t2) / 1000).toFixed(1) }))
    addLog(`Agent 2: ✅ ${result2.total_changes} changes detected`)
    setTab(1)
    await sleep(400)

    // ── Agent 3: ImpactMap (API) ───────────────────────────────────────────
    const t3 = Date.now()
    setAgent(3, 'working', 'Analyzing Mahindra Finance docs...')
    addLog('Agent 3: Analyzing documents...')
    const result3 = await runImpactMap(result2)
    setA3(result3)
    setAgent(3, 'done')
    setElapsed(p => ({ ...p, 3: ((Date.now() - t3) / 1000).toFixed(1) }))
    addLog(`Agent 3: ✅ Risk score: ${result3.risk_score}/100`)
    setTab(2)
    await sleep(400)

    // ── Agent 4: LegalDraft (API) ──────────────────────────────────────────
    const t4 = Date.now()
    setAgent(4, 'working', 'Drafting legal amendments...')
    addLog('Agent 4: Drafting amendments...')
    const result4 = await runLegalDraft(result3)
    setA4(result4)
    setAgent(4, 'done')
    setElapsed(p => ({ ...p, 4: ((Date.now() - t4) / 1000).toFixed(1) }))
    addLog(`Agent 4: ✅ ${result4.amendments.length} amendments ready`)
    setTab(4)
    await sleep(200)

    addLog('✅ PIPELINE COMPLETE')
    setRunning(false); setDone(true)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Bot size={24} className="text-blue-400" /> Live AI Agents
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Multi-agent compliance pipeline · Powered by Claude</p>
        </div>
        {import.meta.env.VITE_CLAUDE_API_KEY
          ? <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 font-semibold">API Connected</span>
          : <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold">Demo Mode (fallback data)</span>
        }
      </div>

      {/* ── Pipeline visualizer ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 flex-wrap">
          {AGENT_DEFS.map((def, i) => (
            <div key={def.id} className="flex items-center gap-2 flex-1 min-w-[130px]">
              <AgentBox def={def} status={statuses[def.id]} task={tasks[def.id]} elapsed={elapsed[def.id]} />
              {i < AGENT_DEFS.length - 1 && (
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <ChevronRight size={16} className={statuses[def.id + 1] !== 'idle' ? 'text-blue-400' : 'text-white/15'} />
                  <ChevronRight size={16} className={statuses[def.id + 1] !== 'idle' ? 'text-blue-400' : 'text-white/15'} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Run button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runPipeline}
            disabled={running}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all
              ${running
                ? 'bg-blue-600/50 text-white/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02]'
              }`}
          >
            {running
              ? <><Loader2 size={15} className="animate-spin" /> Running Pipeline...</>
              : <><Play size={15} /> ▶ RUN FULL PIPELINE</>
            }
          </button>
          {done && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-green-400">
              <CheckCircle2 size={16} /> Pipeline Complete!
            </span>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/10 overflow-x-auto">
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors
                ${tab === i
                  ? 'text-white border-b-2 border-blue-500 bg-blue-500/5'
                  : 'text-white/40 hover:text-white/70'
                }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === 0 && <Tab1 />}
          {tab === 1 && <Tab2 data={a2} />}
          {tab === 2 && <Tab3 data={a3} />}
          {tab === 3 && <Tab4 data={a4} />}
          {tab === 4 && <Tab5 a2={a2} a3={a3} a4={a4} />}
        </div>
      </div>

      {/* ── Activity log ── */}
      <div className="bg-[#060a14] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={13} className="text-green-400" />
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Activity Log</p>
          {running && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
        </div>
        <div ref={logRef} className="h-36 overflow-y-auto space-y-0.5 scrollbar-thin">
          {log.length === 0
            ? <p className="text-xs font-mono text-white/20">Waiting for pipeline to start...</p>
            : log.map((l, i) => <LogLine key={i} line={l} />)
          }
        </div>
      </div>

    </div>
  )
}
