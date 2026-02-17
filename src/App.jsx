import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import AlertsPage from './pages/AlertsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/alerts' element={<AlertsPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<div className='text-center py-32 text-gray-400 text-xl'>404 Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
