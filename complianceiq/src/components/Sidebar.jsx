import { NavLink } from 'react-router-dom'
import {
  Home, BarChart2, Building2, Sparkles, DollarSign,
  Target, ClipboardList, BookOpen, Bot, X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const NAV = [
  { to: '/',          icon: Home,         label: 'Home' },
  { to: '/industry',  icon: BarChart2,     label: 'Industry Overview' },
  { to: '/company',   icon: Building2,     label: 'Company Dashboard' },
  { to: '/predict',   icon: Sparkles,      label: 'Predictions' },
  { to: '/financial', icon: DollarSign,    label: 'Financial Impact' },
  { to: '/units',     icon: Target,        label: 'Business Units' },
  { to: '/action',    icon: ClipboardList, label: 'Action Plan' },
  { to: '/replay',    icon: BookOpen,      label: 'Case Replay' },
  { to: '/agents',    icon: Bot,           label: 'Live AI Agents', highlight: true },
]

export default function Sidebar() {
  const { selectedCompany, sidebarOpen, setSidebarOpen } = useApp()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-[#0a0f1e] border-r border-white/10 z-30
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ComplianceIQ
          </span>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Selected company badge */}
        {selectedCompany && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-400 font-medium">Analyzing</p>
            <p className="text-sm text-white font-semibold truncate">
              {selectedCompany.icon} {selectedCompany.name}
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label, highlight }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => {
                if (highlight) {
                  return [
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 ring-1 ring-blue-400/30'
                      : 'bg-blue-600/15 text-blue-400 border border-blue-500/40 hover:bg-blue-600/25 shadow-md shadow-blue-500/10',
                  ].join(' ')
                }
                return [
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5',
                ].join(' ')
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
              {highlight && (
                <span className="ml-auto text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-3 border-t border-white/10">
          <p className="text-xs text-white/30">v1.0 · Hackathon Build</p>
        </div>
      </aside>
    </>
  )
}
