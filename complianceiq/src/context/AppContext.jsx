import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [sidebarOpen,     setSidebarOpen]     = useState(false)
  const [notifOpen,       setNotifOpen]       = useState(false)
  const [howItWorksOpen,  setHowItWorksOpen]  = useState(false)

  return (
    <AppContext.Provider value={{
      selectedCompany, setSelectedCompany,
      sidebarOpen,     setSidebarOpen,
      notifOpen,       setNotifOpen,
      howItWorksOpen,  setHowItWorksOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
