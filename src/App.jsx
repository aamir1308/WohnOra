import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import { LanguageProvider } from './i18n/LanguageContext'
import Landing from './pages/Landing'
import { Icons } from './components/Icons'

const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Search = lazy(() => import('./pages/Search'))
const MapPage = lazy(() => import('./pages/Map'))
const SeekerDashboard = lazy(() => import('./pages/SeekerDashboard'))
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Messages = lazy(() => import('./pages/Messages'))
const Appointments = lazy(() => import('./pages/Appointments'))
const Amenities = lazy(() => import('./pages/Amenities'))
const Upload = lazy(() => import('./pages/Upload'))

const LoadingFallback = () => (
  <div style={{
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8F9FA'
  }}>
    <div style={{ textAlign: 'center' }}>
      <Icons.Loader2 size={48} color="#DD0000" style={{ marginBottom: 16, animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#666' }}>Loading...</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Navbar />
          <main id="main-content" style={{ paddingTop: 64 }} role="main">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/properties' element={<Properties />} />
                <Route path='/propertydetail/:id' element={<PropertyDetail />} />
                <Route path='/search' element={<Search />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/seekerdashboard' element={<SeekerDashboard />} />
                <Route path='/ownerdashboard' element={<OwnerDashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/appointments' element={<Appointments />} />
                <Route path='/amenities' element={<Amenities />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  )
}

export default App