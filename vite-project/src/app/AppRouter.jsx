import { Navigate, Route, Routes } from 'react-router-dom'
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
import { CustomerAuthGuard, DeliveryAuthGuard, AdminAuthGuard } from './AuthGuard'

export function AppRouter() {
  return <Routes>
    {/* Root is the public Customer Sign In page. The old role-selection landing page is removed from the entry route. */}
    <Route path="/" element={<CustomerSignInPage />} />
    <Route path="/customer/auth" element={<Navigate to="/customer" replace />} />
    <Route path="/customer/signin" element={<CustomerSignInPage />} />
    <Route path="/customer/signup" element={<CustomerSignUpPage />} />
    <Route path="/customer/verify-otp" element={<CustomerVerifyOtpPage />} />
    <Route path="/customer/forgot-password" element={<CustomerForgotPasswordPage />} />
    <Route path="/customer/location" element={<CustomerLocationPage />} />
    <Route path="/customer" element={<CustomerAuthGuard />}>
      <Route element={<CustomerLayout />}>
        <Route index element={<GoldenCustomerHome />} />
        <Route path="home" element={<GoldenCustomerHome />} />
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
    <Route path="/support" element={<SupportLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<SupportPageV3 />} /></Route>
    <Route path="*" element={<Navigate to="/customer" replace />} />
  </Routes>
}
