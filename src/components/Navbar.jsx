import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const active = (p) => loc.pathname===p
    ? 'font-semibold' + " text-[#22C55E]"
    : 'text-gray-200 hover:text-white transition-colors'
  return (
    <nav className='sticky top-0 z-50 bg-gray-900 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='text-lg text-white font-bold'>WohnOra-Germany</Link>
        <div className='hidden md:flex items-center gap-6 text-sm'>
      <Link to='/' className={active('/')}>Home</Link>
      <Link to='/dashboard' className={active('/dashboard')}>Dashboard</Link>
      <Link to='/alerts' className={active('/alerts')}>Alerts</Link>
      <Link to='/settings' className={active('/settings')}>Settings</Link>
        </div>
        <button onClick={()=>setOpen(!open)} className='md:hidden p-2 text-gray-200'>
          <span className='block w-5 h-0.5 bg-current mb-1'></span>
          <span className='block w-5 h-0.5 bg-current mb-1'></span>
          <span className='block w-5 h-0.5 bg-current'></span>
        </button>
      </div>
      {open && (
        <div className='md:hidden bg-gray-800 px-4 py-3 flex flex-col gap-3 text-sm'>
        <Link to='/' onClick={()=>setOpen(false)} className={active('/')}>Home</Link>
        <Link to='/dashboard' onClick={()=>setOpen(false)} className={active('/dashboard')}>Dashboard</Link>
        <Link to='/alerts' onClick={()=>setOpen(false)} className={active('/alerts')}>Alerts</Link>
        <Link to='/settings' onClick={()=>setOpen(false)} className={active('/settings')}>Settings</Link>
        </div>
      )}
    </nav>
  )
}
