import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Disclaimer from './Disclaimer'
import HowItWorksModal from './HowItWorksModal'

export default function Layout() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const prevPath = useRef(location.pathname)

  // Fade-out → swap → fade-in on route change
  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="flex h-screen bg-[#030712] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div
            className="min-h-full p-4 md:p-6 transition-opacity duration-150"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <Outlet />
            <Disclaimer />
          </div>
        </main>
      </div>
      <HowItWorksModal />
    </div>
  )
}
