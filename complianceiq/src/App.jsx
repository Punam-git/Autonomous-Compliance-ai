import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import IndustryOverview from './pages/IndustryOverview'
import CompanyDashboard from './pages/CompanyDashboard'
import Predictions from './pages/Predictions'
import FinancialImpact from './pages/FinancialImpact'
import BusinessUnits from './pages/BusinessUnits'
import ActionPlan from './pages/ActionPlan'
import LiveAgents from './pages/LiveAgents'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index                path="/"          element={<Home />} />
            <Route                      path="/industry"  element={<IndustryOverview />} />
            <Route                      path="/company"   element={<CompanyDashboard />} />
            <Route                      path="/predict"   element={<Predictions />} />
            <Route                      path="/financial" element={<FinancialImpact />} />
            <Route                      path="/units"     element={<BusinessUnits />} />
            <Route                      path="/action"    element={<ActionPlan />} />
            <Route                      path="/replay"    element={<Placeholder name="Case Replay" />} />
            <Route                      path="/agents"    element={<LiveAgents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
