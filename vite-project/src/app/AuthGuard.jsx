import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function CustomerAuthGuard(){
  const location=useLocation()
  const ready=Boolean(sessionStorage.getItem('bowlCustomerLocation'))
  return ready ? <Outlet/> : <Navigate to="/customer/signin" replace state={{from:location.pathname}} />
}

export function DeliveryAuthGuard(){
  const location=useLocation()
  const sessionReady=sessionStorage.getItem('bowlDeliveryAuth')==='1'
  const onboarding=JSON.parse(localStorage.getItem('bowlDeliveryOnboarding')||'{}')
  const ready=sessionReady || onboarding.verificationStatus==='VERIFIED'
  return ready ? <Outlet/> : <Navigate to="/delivery/signin" replace state={{from:location.pathname}} />
}
