import { Bell, Menu, HelpCircle, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const NOTIFICATIONS = [
  {
    color: 'bg-red-500',
    dot:   'bg-red-400',
    border: 'border-red-500/20',
    bg:    'bg-red-500/5',
    label: 'NEW',
    labelColor: 'text-red-400',
    text:  (company) => `RBI Circular detected — High impact on ${company?.name ?? 'your company'}`,
  },
  {
    color: 'bg-amber-500',
    dot:   'bg-amber-400',
    border: 'border-amber-500/20',
    bg:    'bg-amber-500/5',
    label: 'SIGNAL',
    labelColor: 'text-amber-400',
    text:  () => '78% regulation predicted in June 2025',
  },
  {
    color: 'bg-green-500',
    dot:   'bg-green-400',
    border: 'border-green-500/20',
    bg:    'bg-green-500/5',
    label: 'DONE',
    labelColor: 'text-green-400',
    text:  () => 'Schedule M compliance — 30 days remaining',
  },
]

export default function Topbar() {
  const { setSidebarOpen, notifOpen, setNotifOpen, setHowItWorksOpen, selectedCompany } = useApp()

  return (
    <header className="h-14 bg-[#0a0f1e]/80 backdrop-blur border-b border-white/10 flex items-center px-4 gap-3 sticky top-0 z-10">
      {/* Mobile hamburger */}
      <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(true)}>
        <Menu size={20} />
      </button>

      {/* Logo mobile */}
      <span className="lg:hidden text-base font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        ComplianceIQ
      </span>

      <div className="flex-1" />

      {/* How it works */}
      <button
        onClick={() => setHowItWorksOpen(true)}
        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
        title="How It Works"
      >
        <HelpCircle size={16} />
        <span className="hidden sm:inline">How It Works</span>
      </button>

      {/* Hackathon badge */}
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hidden sm:inline">
        Hackathon Demo
      </span>

      {/* Bell */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(o => !o)}
          className="relative text-white/60 hover:text-white transition-colors p-1"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Dropdown */}
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-10 w-80 bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl z-30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <p className="text-sm font-bold text-white">Notifications</p>
                <button onClick={() => setNotifOpen(false)} className="text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className={`flex gap-3 px-4 py-3 ${n.bg} border-l-2 ${n.border}`}>
                    <span className={`w-2 h-2 rounded-full ${n.dot} shrink-0 mt-1.5`} />
                    <div>
                      <span className={`text-xs font-bold ${n.labelColor}`}>{n.label} </span>
                      <span className="text-xs text-white/70">{n.text(selectedCompany)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
