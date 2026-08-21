import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, UserRound, ShieldCheck, CreditCard, Camera, Car, FileText, Landmark, MapPin, LocateFixed, Wifi, BatteryCharging } from 'lucide-react'
import { useState } from 'react'
import { registerCustomer, registerDeliveryPartner } from '../../services/prototypeStore'
import { MobileStatusBar } from '../../layouts/CustomerLayout'
import './auth.css'

const LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

const Frame = ({ eyebrow, title, children }) => (
  <div className="mobile-prototype-frame">
    <div className="mobile-app-shell">
      <MobileStatusBar />
      <main className="auth-screen mobile-route-content">
        <div className="auth-card">
          {eyebrow && (
            <div className="auth-header-row" style={{ justifyContent: 'center' }}>
              <span className="eyebrow">{eyebrow}</span>
            </div>
          )}
          
          {/* Centered Large Logo & Brand Text Below */}
          <div className="auth-brand-centered">
            <img src={LOGO} alt="Golden Food Bowl" className="auth-large-logo" />
            <strong>GOLDEN FOOD BOWL</strong>
            <small>Fresh • Tasty • Fast</small>
          </div>

          <h1 className="auth-title-clean">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  </div>
)

// Gold status bar for delivery partner pages
const DeliveryStatusBar = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
  return (
    <div className="dp-status-bar">
      <span className="dp-status-time">{time}</span>
      <div className="dp-status-right">
        <span className="dp-status-net">5G</span>
        <Wifi size={11} strokeWidth={2.5} />
        <div className="dp-status-battery">
          <BatteryCharging size={12} strokeWidth={2.5} />
          <span>85%</span>
        </div>
      </div>
    </div>
  )
}

// Full-screen vertical scrollable frame for multi-step delivery onboarding
const DeliveryFrame = ({ children, step, totalSteps, stepLabel }) => (
  <div className="mobile-prototype-frame">
    <div className="mobile-app-shell">
      <div className="dp-auth-screen">
        {/* Sticky dark header */}
        <div className="dp-auth-top">
          <DeliveryStatusBar />
          <div className="dp-auth-hero">
            <div className="dp-auth-hero-left">
              <img src={LOGO} alt="Golden Food Bowl" className="dp-auth-logo" />
              <div className="dp-auth-hero-text">
                <strong>Golden Food Bowl</strong>
                <small>Delivery Partner Portal</small>
              </div>
            </div>
            <div className="dp-auth-hero-badge">🛵</div>
          </div>
          {step && (
            <>
              <div className="dp-auth-progress-track">
                <div
                  className="dp-auth-progress-fill"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
              <div className="dp-auth-step-row">
                <span className="dp-auth-step-chip">{step}/{totalSteps}</span>
                <span className="dp-auth-step-name">{stepLabel}</span>
              </div>
            </>
          )}
        </div>
        {/* Scrollable content */}
        <div className="dp-auth-body">
          {children}
        </div>
      </div>
    </div>
  </div>
)

const GoogleButton = ({ onClick }) => (
  <button type="button" className="auth-social google-btn" onClick={onClick}>
    <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
    <span>Continue with Google</span>
  </button>
)

const EmailButton = ({ onClick }) => (
  <button type="button" className="auth-social email-btn" onClick={onClick}>
    <Mail size={17} className="email-icon" />
    <span>Continue with Email</span>
  </button>
)

const TextField = ({ icon: Icon, label, ...props }) => (
  <label className="clean-field">
    <span className="field-label">{Icon && <Icon size={15}/>} {label}</span>
    <input {...props}/>
  </label>
)

export function CustomerSignUpPage() {
  const n = useNavigate()
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const ok = name.trim() && /^\d{10}$/.test(mobile)

  const quickDemoSignUp = (provider) => {
    registerCustomer({ name: `${provider} Customer`, mobile: '9876543210', email: 'user@example.com' })
    sessionStorage.setItem('bowlCustomerMobile', '9876543210')
    sessionStorage.setItem('bowlCustomerEmail', 'user@example.com')
    sessionStorage.setItem('bowlCustomerAuth', '1')
    n('/customer/home')
  }

  const submit = e => {
    e.preventDefault()
    if (!ok) return
    registerCustomer({ name: name.trim(), mobile, email })
    sessionStorage.setItem('bowlCustomerMobile', mobile)
    sessionStorage.setItem('bowlCustomerEmail', email)
    n('/customer/verify-otp')
  }

  return (
    <Frame eyebrow="SIGN UP" title="Create Account">
      <p className="auth-desc">Enter your details to create your Golden Food Bowl account.</p>

      <form onSubmit={submit} className="clean-form">
        <TextField icon={UserRound} label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Priya Sharma" required />
        <TextField icon={Phone} label="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" required />
        <TextField icon={Mail} label={<>Email <small>(optional)</small></>} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" />
        <button className="auth-primary gold-btn" disabled={!ok}>Create Account</button>
      </form>

      <div className="auth-divider"><span>or sign up with</span></div>

      <div className="auth-social-stack">
        <GoogleButton onClick={() => quickDemoSignUp('Google')} />
        <EmailButton onClick={() => quickDemoSignUp('Email')} />
      </div>

      <p className="auth-switch-text">Already have an account? <Link to="/customer/signin">Sign In</Link></p>
    </Frame>
  )
}

export function CustomerSignInPage() {
  const n = useNavigate()
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [sent, setSent] = useState(false)
  const [mode, setMode] = useState('mobile') // 'mobile' | 'email'
  const mobileOk = /^\d{10}$/.test(mobile)

  const quickDemoLogin = () => {
    sessionStorage.setItem('bowlCustomerMobile', '9876543210')
    sessionStorage.setItem('bowlCustomerEmail', 'priya@example.com')
    sessionStorage.setItem('bowlCustomerName', 'Priya Sharma')
    sessionStorage.setItem('bowlCustomerAuth', '1')
    n('/customer/home')
  }

  return (
    <Frame eyebrow="SIGN IN" title="Welcome Back">
      <p className="auth-desc">Sign in to order your favourite food bowls.</p>

      {/* 1-Tap Quick Demo */}
      <button type="button" className="demo-login-btn" onClick={quickDemoLogin}>
        ⚡ 1-Click Demo Login (Priya Sharma)
      </button>

      {/* Mode Switcher Tabs */}
      <div className="csi-tabs" style={{ marginBottom: '12px' }}>
        <button
          type="button"
          className={`csi-tab${mode === 'mobile' ? ' csi-tab-active' : ''}`}
          onClick={() => { setMode('mobile'); setSent(false); setOtp('') }}
        >
          📱 Mobile OTP
        </button>
        <button
          type="button"
          className={`csi-tab${mode === 'email' ? ' csi-tab-active' : ''}`}
          onClick={() => { setMode('email'); setSent(false) }}
        >
          ✉️ Email Login
        </button>
      </div>

      {/* Mobile OTP Flow */}
      {mode === 'mobile' && !sent && (
        <form className="clean-form" onSubmit={e => { e.preventDefault(); if (mobileOk) { sessionStorage.setItem('bowlCustomerMobile', mobile); setSent(true) } }}>
          <label className="clean-field">
            <span className="field-label"><Phone size={15} /> Mobile Number</span>
            <div className="csi-mobile-field">
              <span className="csi-prefix">🇮🇳 +91</span>
              <input
                className="csi-mobile-input"
                value={mobile}
                onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit mobile"
                inputMode="numeric"
              />
            </div>
          </label>
          <button type="submit" className="auth-primary gold-btn" disabled={!mobileOk}>
            Send Mobile OTP →
          </button>
        </form>
      )}

      {/* Verify OTP */}
      {mode === 'mobile' && sent && (
        <form className="clean-form" onSubmit={e => { e.preventDefault(); if (otp.length === 6) { sessionStorage.setItem('bowlCustomerAuth', '1'); n('/customer/home') } }}>
          <p className="csi-otp-sent">OTP sent to <strong>+91 {mobile}</strong></p>
          <div className="csi-otp-row">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <input
                key={i}
                className="csi-otp-box"
                maxLength={1}
                value={otp[i] || ''}
                inputMode="numeric"
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '')
                  const arr = otp.split('')
                  arr[i] = v
                  const next = arr.join('').slice(0, 6)
                  setOtp(next)
                  if (v && e.target.nextSibling) e.target.nextSibling.focus()
                }}
              />
            ))}
          </div>
          <p className="csi-otp-hint">Prototype OTP: <strong>123456</strong></p>
          <button type="submit" className="auth-primary gold-btn" disabled={otp.length !== 6}>
            Verify &amp; Sign In ✓
          </button>
          <button type="button" className="csi-back-link" onClick={() => { setSent(false); setOtp('') }}>
            ← Change number
          </button>
        </form>
      )}

      {/* Email Login Flow */}
      {mode === 'email' && (
        <form className="clean-form" onSubmit={e => { e.preventDefault(); if (email && password) { sessionStorage.setItem('bowlCustomerEmail', email); sessionStorage.setItem('bowlCustomerAuth', '1'); n('/customer/home') } }}>
          <TextField icon={Mail} label="Email Address" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
          <TextField icon={CreditCard} label="Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
          <button type="submit" className="auth-primary gold-btn" disabled={!email || !password}>
            Sign In with Email →
          </button>
        </form>
      )}

      <div className="auth-divider"><span>or continue with</span></div>

      <div className="auth-social-stack">
        <GoogleButton onClick={quickDemoLogin} />
        <EmailButton onClick={() => setMode('email')} />
      </div>

      <p className="auth-switch-text">New to Bowl? <Link to="/customer/signup">Create an account</Link></p>
    </Frame>
  )
}


export function CustomerVerifyOtpPage(){const n=useNavigate();const[otp,setOtp]=useState('');const mobile=sessionStorage.getItem('bowlCustomerMobile')||'your mobile number';return <Frame eyebrow="OTP VERIFICATION" title="Verify your mobile"><p>Enter the 6-digit code sent to <strong>{mobile}</strong>. Prototype OTP: <strong>123456</strong>.</p><TextField icon={Phone} label="Verification code" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="123456" inputMode="numeric"/><button className="auth-primary" disabled={otp.length!==6} onClick={()=>{sessionStorage.setItem('bowlCustomerAuth','1');n('/customer/location')}}>Verify & continue</button><p className="auth-switch-text"><Link to="/customer/signin">Use another number</Link></p></Frame>}
export function CustomerForgotPasswordPage(){const n=useNavigate();const[mobile,setMobile]=useState('');return <Frame eyebrow="ACCOUNT RECOVERY" title="Recover your account"><p>Enter your registered mobile number and we'll send a verification code.</p><TextField icon={Phone} label="Mobile number" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric"/><button className="auth-primary" disabled={!/^\d{10}$/.test(mobile)} onClick={()=>{sessionStorage.setItem('bowlCustomerMobile',mobile);n('/customer/verify-otp')}}>Send recovery OTP</button><p className="auth-switch-text"><Link to="/customer/signin">Back to sign in</Link></p></Frame>}
export function CustomerLocationPage(){const n=useNavigate();const[status,setStatus]=useState('idle'),[location,setLocation]=useState(null),[error,setError]=useState('');const detect=()=>{if(!navigator.geolocation){setStatus('error');setError('Location is not supported by this browser.');return}setStatus('loading');setError('');navigator.geolocation.getCurrentPosition(async pos=>{const{latitude,longitude}=pos.coords;try{const res=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,{headers:{Accept:'application/json'}});if(!res.ok)throw new Error('Unable to find location name');const data=await res.json();const a=data.address||{};const name=a.city||a.town||a.municipality||a.village||a.county||data.display_name||'Current location';const state=a.state||'';const label=state?`${name}, ${state}`:name;const value={latitude,longitude,name,state,label};setLocation(value);sessionStorage.setItem('bowlCustomerLocation',JSON.stringify(value));sessionStorage.setItem('bowlCustomerAuth','1');setStatus('success')}catch{const value={latitude,longitude,name:'Current location',state:'',label:'Current location'};setLocation(value);sessionStorage.setItem('bowlCustomerLocation',JSON.stringify(value));sessionStorage.setItem('bowlCustomerAuth','1');setStatus('success');setError('Location found, but the place name could not be resolved.')}},err=>{setStatus('error');setError(err.code===1?'Location permission was denied. Please allow location access and try again.':'Could not detect your current location. Please try again.')},{enableHighAccuracy:true,timeout:12000,maximumAge:60000})};return <Frame eyebrow="CURRENT LOCATION" title="Find Bowl near you"><div className="location-card"><MapPin/><div><strong>{location?.label||'Current device location'}</strong><span>{status==='loading'?'Using your device GPS location…':status==='success'?'Current device location detected':'Allow location access to find the nearest Bowl branch.'}</span></div></div>{error&&<p className="auth-error">{error}</p>}{status!=='success'?<button className="auth-primary" onClick={detect} disabled={status==='loading'}><LocateFixed/> {status==='loading'?'Detecting location…':'Use my current location'}</button>:<><div className="auth-summary"><span>Detected location <b>{location.label}</b></span><span>Coordinates <b>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</b></span><span>Branch matching <b>Nearest Bowl branch</b></span></div><button className="auth-primary" onClick={()=>n('/customer/home')}>Continue to Bowl</button></>}<p className="auth-switch-text">Your browser may ask for permission to access device location.</p></Frame>}
export function DeliverySignUpPage() {
  const n = useNavigate()
  const [step, setStep] = useState(1)
  const [feePaid, setFeePaid] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', email: '', photo: '', vehicle: 'Bike', vehicleNumber: '', licence: '', idProof: '', bank: '', upi: '' })
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }))

  const TOTAL_STEPS = 5
  const stepLabels = ['Basic Info', 'Vehicle & Docs', 'Bank Details', 'Onboarding Fee', 'Review & Submit']

  const step1Ok = form.name.trim() && /^\d{10}$/.test(form.mobile) && form.email
  const step2Ok = form.photo && form.vehicleNumber && form.licence && form.idProof
  const step3Ok = form.bank && form.upi
  const allOk = step1Ok && step2Ok && step3Ok && feePaid

  const submit = () => {
    if (!allOk) return
    const data = { ...form, feeStatus: 'PAID', verificationStatus: 'VERIFIED', documentsVerified: true }
    localStorage.setItem('bowlDeliveryOnboarding', JSON.stringify(data))
    sessionStorage.setItem('bowlDeliveryMobile', form.mobile)
    registerDeliveryPartner(data)
    sessionStorage.setItem('bowlDeliveryAuth', '1')
    n('/delivery/application-submitted')
  }

  return (
    <DeliveryFrame step={step} totalSteps={TOTAL_STEPS} stepLabel={stepLabels[step - 1]}>
      {step === 1 && (
        <div className="dp-step-content">
          <h2 className="dp-step-title">Tell us about yourself</h2>
          <div className="clean-form">
            <TextField icon={UserRound} label="Full Name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
            <TextField icon={Phone} label="Mobile Number" value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" />
            <TextField icon={Mail} label="Email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="partner@example.com" type="email" />
            <button type="button" className="auth-primary gold-btn" disabled={!step1Ok} onClick={() => setStep(2)}>Continue →</button>
          </div>
          <p className="auth-switch-text">Already a partner? <Link to="/delivery/signin">Sign in</Link></p>
        </div>
      )}

      {step === 2 && (
        <div className="dp-step-content">
          <h2 className="dp-step-title">Vehicle & Documents</h2>
          <div className="clean-form">
            <TextField icon={Camera} label="Profile Photo" value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="Photo filename / URL" />
            <label className="clean-field">
              <span className="field-label"><Car size={15} /> Vehicle Type</span>
              <select value={form.vehicle} onChange={e => set('vehicle', e.target.value)}>
                <option>Bike</option><option>Scooter</option><option>Car</option>
              </select>
            </label>
            <TextField icon={Car} label="Vehicle Number" value={form.vehicleNumber} onChange={e => set('vehicleNumber', e.target.value)} placeholder="KA01AB1234" />
            <TextField icon={FileText} label="Driving Licence" value={form.licence} onChange={e => set('licence', e.target.value)} placeholder="Licence number" />
            <TextField icon={FileText} label="Aadhaar / ID Proof" value={form.idProof} onChange={e => set('idProof', e.target.value)} placeholder="ID number / document" />
            <div className="dp-btn-row">
              <button type="button" className="auth-social" onClick={() => setStep(1)}>← Back</button>
              <button type="button" className="auth-primary gold-btn" disabled={!step2Ok} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="dp-step-content">
          <h2 className="dp-step-title">Bank & Payment</h2>
          <div className="clean-form">
            <TextField icon={Landmark} label="Bank Account / IFSC" value={form.bank} onChange={e => set('bank', e.target.value)} placeholder="Account / IFSC details" />
            <TextField icon={CreditCard} label="UPI ID" value={form.upi} onChange={e => set('upi', e.target.value)} placeholder="name@upi" />
            <div className="dp-btn-row">
              <button type="button" className="auth-social" onClick={() => setStep(2)}>← Back</button>
              <button type="button" className="auth-primary gold-btn" disabled={!step3Ok} onClick={() => setStep(4)}>Continue →</button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="dp-step-content">
          <h2 className="dp-step-title">Onboarding Fee</h2>
          <div className="dp-fee-info">
            <div className="dp-fee-amount"><CreditCard size={24} /><span>₹499</span></div>
            <p className="dp-fee-note">One-time partner registration fee. Simulated — no real charge made.</p>
          </div>
          <div className="clean-form">
            <button
              type="button"
              className={`auth-primary ${feePaid ? 'auth-paid-btn' : 'gold-btn'}`}
              onClick={() => setFeePaid(true)}
            >
              {feePaid ? '✓ Payment Confirmed' : 'Pay ₹499 (Simulated)'}
            </button>
            <div className="dp-btn-row">
              <button type="button" className="auth-social" onClick={() => setStep(3)}>← Back</button>
              <button type="button" className="auth-primary" disabled={!feePaid} onClick={() => setStep(5)}>Continue →</button>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="dp-step-content">
          <h2 className="dp-step-title">Review & Submit</h2>
          <div className="auth-summary">
            <div className="auth-summary-row"><span>Name</span><b>{form.name}</b></div>
            <div className="auth-summary-row"><span>Mobile</span><b>{form.mobile}</b></div>
            <div className="auth-summary-row"><span>Email</span><b>{form.email}</b></div>
            <div className="auth-summary-row"><span>Vehicle</span><b>{form.vehicle} · {form.vehicleNumber}</b></div>
            <div className="auth-summary-row"><span>UPI</span><b>{form.upi}</b></div>
            <div className="auth-summary-row"><span>Onboarding Fee</span><b className="auth-badge-ok">✓ Paid ₹499</b></div>
          </div>
          <div className="clean-form" style={{ marginTop: '12px' }}>
            <div className="dp-btn-row">
              <button type="button" className="auth-social" onClick={() => setStep(4)}>← Edit</button>
              <button type="button" className="auth-primary gold-btn" disabled={!allOk} onClick={submit}>Submit Application →</button>
            </div>
          </div>
        </div>
      )}
    </DeliveryFrame>
  )
}

export function DeliverySignInPage() {
  const n = useNavigate()
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [sent, setSent] = useState(false)
  const ok = /^\d{10}$/.test(mobile)

  const quickDemo = () => {
    sessionStorage.setItem('bowlDeliveryMobile', '9000000001')
    sessionStorage.setItem('bowlDeliveryAuth', '1')
    n('/delivery/dashboard')
  }

  return (
    <div className="mobile-prototype-frame">
      <div className="mobile-app-shell">
        <div className="dp-auth-screen">
          {/* Hero banner */}
          <div className="dp-signin-hero">
            <DeliveryStatusBar />
            <div className="dp-signin-hero-content">
              <div className="dp-signin-hero-inner">
                <span className="dp-signin-hero-icon">🛵</span>
                <div>
                  <h1 className="dp-signin-hero-title">Welcome Back,<br/>Partner!</h1>
                  <p className="dp-signin-hero-sub">Sign in to start accepting deliveries</p>
                </div>
              </div>
              <img src={LOGO} alt="" className="dp-signin-hero-logo" />
            </div>
          </div>

          {/* Form area */}
          <div className="dp-auth-body">
            <button type="button" className="dp-demo-btn" onClick={quickDemo}>
              <span>⚡</span> 1-Tap Demo Login
            </button>

            <div className="dp-or-row"><span>or sign in with mobile OTP</span></div>

            {!sent ? (
              <form className="clean-form" onSubmit={e => { e.preventDefault(); if (ok) { sessionStorage.setItem('bowlDeliveryMobile', mobile); setSent(true) } }}>
                <div className="dp-mobile-field">
                  <span className="dp-mobile-prefix">🇮🇳 +91</span>
                  <input
                    className="dp-mobile-input"
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Mobile number"
                    inputMode="numeric"
                  />
                </div>
                <button type="submit" className="dp-cta-btn" disabled={!ok}>Send OTP →</button>
              </form>
            ) : (
              <form className="clean-form" onSubmit={e => { e.preventDefault(); if (otp.length === 6) { sessionStorage.setItem('bowlDeliveryAuth', '1'); n('/delivery/dashboard') } }}>
                <p className="dp-otp-hint">OTP sent to <strong>+91 {mobile}</strong></p>
                <div className="dp-otp-row">
                  {[0,1,2,3,4,5].map(i => (
                    <input
                      key={i}
                      className="dp-otp-box"
                      maxLength={1}
                      value={otp[i] || ''}
                      inputMode="numeric"
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '')
                        const arr = otp.split('')
                        arr[i] = v
                        const next = arr.join('').slice(0, 6)
                        setOtp(next)
                        if (v && e.target.nextSibling) e.target.nextSibling.focus()
                      }}
                    />
                  ))}
                </div>
                <p className="dp-otp-proto">Prototype OTP: <strong>123456</strong></p>
                <button type="submit" className="dp-cta-btn" disabled={otp.length !== 6}>Verify &amp; Sign In</button>
                <button type="button" className="dp-back-link" onClick={() => { setSent(false); setOtp('') }}>← Change number</button>
              </form>
            )}

            <div className="dp-or-row"><span>or continue with</span></div>
            <div className="auth-social-stack">
              <GoogleButton onClick={quickDemo} />
              <EmailButton onClick={quickDemo} />
            </div>

            <p className="auth-switch-text">New to delivery? <Link to="/delivery/signup">Become a partner</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DeliveryVerificationPage(){const n=useNavigate();n('/delivery/signup');return null}
export function DeliveryFeePage(){const n=useNavigate();n('/delivery/signup');return null}
export function DeliveryApplicationSubmittedPage(){return <Frame eyebrow="ALL SET" title="You're ready to deliver!"><div className="auth-success-wrap"><ShieldCheck className="auth-success" size={56}/><p className="auth-success-msg">Application Submitted!</p></div><p className="auth-desc">Your partner profile is complete. Start accepting deliveries right away from the dashboard.</p><div className="auth-summary"><div className="auth-summary-row"><span>Documents</span><b className="auth-badge-ok">✓ Submitted</b></div><div className="auth-summary-row"><span>Onboarding Fee</span><b className="auth-badge-ok">✓ Paid ₹499</b></div><div className="auth-summary-row"><span>Status</span><b className="auth-badge-ok">✓ Active</b></div></div><Link className="auth-primary gold-btn" style={{marginTop:'16px'}} to="/delivery/dashboard">Go to Delivery Dashboard →</Link></Frame>}
