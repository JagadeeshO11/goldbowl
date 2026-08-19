import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import './auth.css'

const LOGO='https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function DeliveryPartnerSignInPage(){
  const navigate=useNavigate()
  const [mode,setMode]=useState('mobile')
  const [mobile,setMobile]=useState('')
  const [email,setEmail]=useState('')
  const [otp,setOtp]=useState('')
  const [sent,setSent]=useState(false)
  const valid=mode==='mobile'?/^\d{10}$/.test(mobile):/^\S+@\S+\.\S+$/.test(email)
  const continueLogin=()=>{sessionStorage.setItem('bowlDeliveryAuth','1');sessionStorage.setItem('bowlDeliveryEmail',email);navigate('/delivery/dashboard')}
  return <main className="auth-screen"><div className="auth-card">
    <Link to="/" className="auth-back"><ArrowLeft/> Back</Link>
    <div className="auth-brand"><img src={LOGO} alt="Golden Food Bowl"/><span>GOLDEN FOOD BOWL</span></div>
    <span className="eyebrow">DELIVERY PARTNER SIGN IN</span>
    <h1>Welcome back, partner</h1>
    <p>{sent?'Enter the simulated verification code to continue.':'Choose how you want to sign in to your delivery account.'}</p>
    {!sent ? <>
      <div className="delivery-auth-tabs"><button className={mode==='mobile'?'active':''} onClick={()=>setMode('mobile')}><Phone/> Mobile</button><button className={mode==='email'?'active':''} onClick={()=>setMode('email')}><Mail/> Email</button></div>
      {mode==='mobile'?<label><Phone/>Mobile number<input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric"/></label>:<label><Mail/>Email address<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="partner@example.com" type="email"/></label>}
      <button className="auth-primary" disabled={!valid} onClick={()=>setSent(true)}>Continue</button>
      <div className="auth-divider"><span>or continue with</span></div>
      <button type="button" className="auth-social" onClick={continueLogin}><b>G</b> Continue with Google</button>
      {mode==='mobile'&&<button type="button" className="auth-social" onClick={()=>{setMode('email');setSent(false)}}><Mail/> Continue with Email</button>}
    </>:<>
      <label><Phone/>Verification code<input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="123456" inputMode="numeric"/></label>
      <button className="auth-primary" disabled={otp.length!==6} onClick={continueLogin}>Verify & continue</button>
      <p className="auth-switch-text">Prototype OTP: <strong>123456</strong></p>
      <button type="button" className="auth-social" onClick={()=>setSent(false)}>Use another sign-in method</button>
    </>}
    <p className="auth-switch-text">New partner? <Link to="/delivery/signup">Create a partner account</Link></p>
  </div></main>
}
