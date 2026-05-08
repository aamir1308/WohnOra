import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'16px',paddingTop:'70px'}}>
      <h1 style={{fontSize:'2rem',fontWeight:'bold'}}>Dashboard</h1>
      <p style={{color:'#666'}}>WohnOra Germany — Building with AI Factory...</p>
      <Link to='/' style={{color:'#2E7D32',textDecoration:'none'}}>Back to Home</Link>
    </div>
  );
}