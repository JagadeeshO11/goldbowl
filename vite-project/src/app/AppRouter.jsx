import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { DeliveryLayout } from '../layouts/DeliveryLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { SupportLayout } from '../layouts/SupportLayout'
import { CustomerPage } from '../pages/customer/CustomerPage'
import { GoldenCustomerHome } from '../pages/customer/GoldenCustomerHome'
import { DeliveryPage } from '../pages/delivery/DeliveryPage'
import { AdminPage } from '../pages/admin/AdminPage'
import { SupportPageV3 } from '../pages/support/SupportPageV3'
import { CustomerSignUpPage, CustomerSignInPage, CustomerVerifyOtpPage, CustomerForgotPasswordPage, CustomerLocationPage, DeliverySignUpPage, DeliveryVerificationPage, DeliveryFeePage, DeliveryApplicationSubmittedPage } from '../pages/auth/AuthPages'
import { DeliveryPartnerSignInPage } from '../pages/auth/DeliveryPartnerSignInPage'
import { DeliveryLocationPage } from '../pages/auth/DeliveryLocationPage'
import { AdminSignInPage } from '../pages/admin/AdminSignInPage'
import { SupportSignInPage } from '../pages/support/SupportSignInPage'
import { DeliveryAuthGuard, AdminAuthGuard, SupportAuthGuard } from './AuthGuard'

// Customer browsing is public. Login is required only when the customer
// reaches checkout, while the cart remains available to guests.
function CustomerBrowseGuard(){
  const location = useLocation()
  const authenticated = sessionStorage.getItem('bowlCustomerAuth') === '1'
  const relativePath = location.pathname.replace(/^\/customer\/?/, '') || 'home'
  const protectedPrefixes = ['checkout', 'payment', 'profile', 'orders', 'track', 'notifications']
  const isProtected = protectedPrefixes.some(prefix => relativePath === prefix || relativePath.startsWith(prefix + '/'))

  if(authenticated || !isProtected) return <Outlet />

  const from = `${location.pathname}${location.search}${location.hash}`
  sessionStorage.setItem('bowlCustomerPendingRedirect', from)
  return <Navigate to={`/customer/signin?redirect=${encodeURIComponent(from)}`} replace state={{ from }} />
}

// After login the existing sign-in page goes to /customer/home. If checkout
// was the reason for login, continue the customer to checkout automatically.
function CustomerHomeEntry(){
  const navigate = useNavigate()
  const authenticated = sessionStorage.getItem('bowlCustomerAuth') === '1'
  if(authenticated){
    const pending = sessionStorage.getItem('bowlCustomerPendingRedirect')
    if(pending){
      sessionStorage.removeItem('bowlCustomerPendingRedirect')
      return <Navigate to={pending} replace />
    }
  }
  return <GoldenCustomerHome />
}

export function AppRouter() {
  return <Routes>
    {/* Customer website opens on the home page. */}
    <Route path="/" element={<Navigate to="/customer/home" replace />} />
    <Route path="/customer/auth" element={<Navigate to="/customer/home" replace />} />
    <Route path="/customer/signin" element={<CustomerSignInPage />} />
    <Route path="/customer/signup" element={<CustomerSignUpPage />} />
    <Route path="/customer/verify-otp" element={<CustomerVerifyOtpPage />} />
    <Route path="/customer/forgot-password" element={<CustomerForgotPasswordPage />} />
    <Route path="/customer/location" element={<CustomerLocationPage />} />
    <Route path="/customer" element={<CustomerBrowseGuard />}>
      <Route element={<CustomerLayout />}>
        <Route index element={<CustomerHomeEntry />} />
        <Route path="home" element={<CustomerHomeEntry />} />
        <Route path="*" element={<CustomerPage />} />
      </Route>
    </Route>
    <Route path="/delivery/onboarding" element={<Navigate to="/delivery/signup" replace />} />
    <Route path="/delivery/signin" element={<DeliveryPartnerSignInPage />} />
    <Route path="/delivery/signup" element={<DeliverySignUpPage />} />
    <Route path="/delivery/verification" element={<DeliveryVerificationPage />} />
    <Route path="/delivery/onboarding-fee" element={<DeliveryLocationPage />} />
    <Route path="/delivery/onboarding-fee/payment" element={<DeliveryFeePage />} />
    <Route path="/delivery/application-submitted" element={<DeliveryApplicationSubmittedPage />} />
    <Route path="/delivery" element={<DeliveryAuthGuard />}><Route element={<DeliveryLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<DeliveryPage />} /></Route></Route>
    <Route path="/admin/signin" element={<AdminSignInPage />} />
    <Route path="/admin/login" element={<AdminSignInPage />} />
    <Route path="/admin" element={<AdminAuthGuard />}><Route element={<AdminLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<AdminPage />} /></Route></Route>
    <Route path="/support/signin" element={<SupportSignInPage />} />
    <Route path="/support/login" element={<SupportSignInPage />} />
    <Route path="/support" element={<SupportAuthGuard />}><Route element={<SupportLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<SupportPageV3 />} /></Route></Route>
    <Route path="*" element={<Navigate to="/customer/home" replace />} />
  </Routes>
}
