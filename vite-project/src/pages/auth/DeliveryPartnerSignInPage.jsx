import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import './auth.css'

export function DeliveryPartnerSignInPage(){
  const navigate=useNavigate()
  const [mobile,setMobile]=useState('')
  const [otp,setOtp]=useState('')
  const [sent,setSent]=useState(false)
  const valid=/^\d{10}$/.test(mobile)
  const continueLogin=()=>{sessionStorage.setItem('bowlDeliveryAuth','1');navigate('/delivery/dashboard')}

  return <main className="auth-screen"><div className="auth-card">
    <Link to="/" className="auth-back"><ArrowLeft/> Back</Link>
    <div className="auth-brand"><span>GOLDEN FOOD BOWL</span></div>
    <span className="eyebrow">DELIVERY PARTNER SIGN IN</span>
    <h1>Welcome back, partner</h1>
    <p>{sent?'Enter the simulated verification code to continue.':'Sign in with your registered mobile number.'}</p>
    {!sent ? <>
      <label><Phone/>Mobile number<input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric"/></label>
      <button className="auth-primary" disabled={!valid} onClick={()=>setSent(true)}>Continue</button>
      <div className="auth-divider"><span>or continue with</span></div>
      <button type="button" className="auth-social" onClick={continueLogin}><b>G</b> Continue with Google</button>
      <button type="button" className="auth-social delivery-email-button" style={{marginTop:'-1px'}} onClick={continueLogin}><Mail/> Continue with Email</button>
    </>:<>
      <label><Phone/>Verification code<input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="123456" inputMode="numeric"/></label>
      <button className="auth-primary" disabled={otp.length!==6} onClick={continueLogin}>Verify & continue</button>
      <p className="auth-switch-text">Prototype OTP: <strong>123456</strong></p>
      <button type="button" className="auth-social" onClick={()=>setSent(false)}>Use another sign-in method</button>
    </>}
    <p className="auth-switch-text">New partner? <Link to="/delivery/signup">Create a partner account</Link></p>
  </div></main>
}
