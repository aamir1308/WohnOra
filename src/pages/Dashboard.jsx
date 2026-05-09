import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'

export default function Dashboard() {
  const brandGreen = '#00d4a4'
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'16px',paddingTop:'70px',background:'linear-gradient(135deg, #1a3d4a 0%, #2d5a4f 100%)',color:'#fff'}}>
      <Icons.Home size={48} color={brandGreen} style={{ marginBottom: 8 }} />
      <h1 style={{fontSize:'2rem',fontWeight:700,color:'#fff'}}>Dashboard</h1>
      <p style={{color:'#b3b3b3'}}>WohnOra Germany — Building with AI Factory...</p>
      <Link to='/' style={{color:brandGreen,textDecoration:'none',fontWeight:500}}>Back to Home</Link>
    </div>
  )
}