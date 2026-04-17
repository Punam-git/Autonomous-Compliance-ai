import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, ArrowRight, CheckCircle2, Circle, User, Calendar } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { actionPlans } from '../data/unitsData'
import { COMPANIES } from '../data/companies'

// ── helpers ───────────────────────────────────────────────────────────────────

function priorityStyle(p) {
  if (p === 'High')   return { badge: 'bg-red-500/10 text-red-400 border-red-500/30',   dot: 'bg-red-500',   line: 'border-red-500/40'   }
  if (p === 'Medium') return { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30', dot: 'bg-amber-500', line: 'border-amber-500/40' }
  return               { badge: 'bg-green-500/10 text-green-400 border-green-500/30',  dot: 'bg-green-500', line: 'border-green-500/40'  }
}

function estimatedDate(completed, total) {
  const remaining = total - completed
  const weeksLeft = remaining * 2
  const d = new Date()
  d.setDate(d.getDate() + weeksLeft * 7)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function NoCompany() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <ClipboardList size={32} className="text-white/20" />
      <p className="text-white/50">Select a company from Home to see the action plan.</p>
      <button onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
        Go to Home <ArrowRight size={14} />
      </button>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ActionPlan() {
  const { selectedCompany } = useApp()
  // Reset checkboxes when company changes
  const [checked, setChecked] = useState({})
  const prevId = useRef(selectedCompany?.id)
  if (selectedCompany?.id !== prevId.current) {
    prevId.current = selectedCompany?.id
    // schedule reset without mutating during render
    setTimeout(() => setChecked({}), 0)
  }

  if (!selectedCompany) return <NoCompany />

  const plan = actionPlans[selectedCompany.id] ?? actionPlans.mahindra
  const meta = COMPANIES.find(c => c.id === selectedCompany.id)
  const total     = plan.tasks.length
  const completed = Object.values(checked).filter(Boolean).length
  const pct       = Math.round((completed / total) * 100)

  function toggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Action Plan</h1>
        <p className="text-sm text-white/40 mt-0.5">
          {meta.icon} {meta.name} · 90-Day Compliance Roadmap
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <p className="text-sm font-bold text-white">
              {completed}/{total} tasks completed
            </p>
            <p className="text-xs text-white/40 mt-0.5">
              Estimated full compliance:{' '}
              <span className="text-cyan-400 font-semibold">{estimatedDate(completed, total)}</span>
            </p>
          </div>
          <span className={`text-2xl font-extrabold ${pct === 100 ? 'text-green-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
            {pct}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: pct === 100
                ? 'linear-gradient(90deg,#22c55e,#16a34a)'
                : pct >= 50
                  ? 'linear-gradient(90deg,#f59e0b,#d97706)'
                  : 'linear-gradient(90deg,#3b82f6,#06b6d4)',
            }}
          />
        </div>
        {pct === 100 && (
          <p className="text-xs text-green-400 font-semibold mt-2 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> All tasks complete — ready for regulatory submission!
          </p>
        )}
      </div>

      {/* ── Timeline cards ── */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

        <div className="space-y-3">
          {plan.tasks.map((task, i) => {
            const done = !!checked[i]
            const ps   = priorityStyle(task.priority)
            return (
              <div
                key={i}
                className={`relative flex gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer
                  ${done
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-[#0a0f1e] border-white/10 hover:border-white/20'
                  }`}
                onClick={() => toggle(i)}
              >
                {/* Timeline dot */}
                <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all
                  ${done ? 'bg-green-500/20' : 'bg-white/5'}`}>
                  {done
                    ? <CheckCircle2 size={20} className="text-green-400" />
                    : <Circle size={20} className="text-white/20" />
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        Week {task.week}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${ps.badge}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm font-semibold mt-1.5 transition-all
                    ${done ? 'line-through text-white/30' : 'text-white'}`}>
                    {task.task}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <User size={12} className="text-white/30" />
                      <span className="text-xs text-white/50">{task.owner}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-white/30" />
                      <span className="text-xs text-white/50">~{task.week} weeks</span>
                    </div>
                  </div>
                </div>

                {/* Done stamp */}
                {done && (
                  <div className="shrink-0 self-center">
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">
                      ✓ Done
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Amendment preview ── */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-bold text-white">Amendment Preview</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400">
            Redline View
          </span>
        </div>

        <p className="text-xs font-semibold text-white/50 mb-3">{plan.amendment.clause}</p>

        <div className="space-y-3 font-mono text-xs leading-relaxed">
          {/* Old text */}
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-xs font-bold text-red-400 mb-1.5 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> REMOVED
            </p>
            <p className="text-red-300/80 line-through leading-relaxed">{plan.amendment.old}</p>
          </div>

          {/* New text */}
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-xs font-bold text-green-400 mb-1.5 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> ADDED
            </p>
            <p className="text-green-300/90 leading-relaxed">{plan.amendment.new}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
