import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function CustomerAuthGuard(){
  const existing=sessionStorage.getItem('bowlCustomerLocation')
  if(!existing){
    const defaultLoc={name:'Madhapur',state:'Hyderabad',label:'Madhapur, Hyderabad',latitude:17.4483,longitude:78.3915}
    sessionStorage.setItem('bowlCustomerLocation',JSON.stringify(defaultLoc))
    sessionStorage.setItem('bowlCustomerAuth','1')
  }
  return <Outlet/>
}

export function DeliveryAuthGuard(){
  const location=useLocation()
  const sessionReady=sessionStorage.getItem('bowlDeliveryAuth')==='1'
  const onboarding=JSON.parse(localStorage.getItem('bowlDeliveryOnboarding')||'{}')
  const ready=sessionReady || onboarding.verificationStatus==='VERIFIED'
  return ready ? <Outlet/> : <Navigate to="/delivery/signin" replace state={{from:location.pathname}} />
}

export function AdminAuthGuard(){
  const location=useLocation()
  const ready=sessionStorage.getItem('bowlAdminAuth')==='1'
  return ready ? <Outlet/> : <Navigate to="/admin/signin" replace state={{from:location.pathname}} />
}

export function SupportAuthGuard(){
  const location=useLocation()
  const ready=sessionStorage.getItem('bowlSupportAuth')==='1'
  return ready ? <Outlet/> : <Navigate to="/support/signin" replace state={{from:location.pathname}} />
}
