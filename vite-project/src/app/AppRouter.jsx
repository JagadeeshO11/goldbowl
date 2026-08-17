import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { DeliveryLayout } from '../layouts/DeliveryLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { SupportLayout } from '../layouts/SupportLayout'
import { PrototypeHome } from '../pages/PrototypeHome'
import { CustomerPage } from '../pages/customer/CustomerPage'
import { DeliveryPage } from '../pages/delivery/DeliveryPage'
import { AdminPage } from '../pages/admin/AdminPage'
import { SupportPageV3 } from '../pages/support/SupportPageV3'
import { CustomerSignUpPage, CustomerSignInPage, CustomerVerifyOtpPage, CustomerForgotPasswordPage, CustomerLocationPage, DeliverySignUpPage, DeliverySignInPage, DeliveryVerificationPage, DeliveryFeePage, DeliveryApplicationSubmittedPage } from '../pages/auth/AuthPages'
import { DeliveryLocationPage } from '../pages/auth/DeliveryLocationPage'
import { CustomerAuthGuard, DeliveryAuthGuard } from './AuthGuard'

export function AppRouter() {
  return <Routes>
    <Route path="/" element={<PrototypeHome />} />

    <Route path="/customer/auth" element={<Navigate to="/customer/signin" replace />} />
    <Route path="/customer/signin" element={<CustomerSignInPage />} />
    <Route path="/customer/signup" element={<CustomerSignUpPage />} />
    <Route path="/customer/verify-otp" element={<CustomerVerifyOtpPage />} />
    <Route path="/customer/forgot-password" element={<CustomerForgotPasswordPage />} />
    <Route path="/customer/location" element={<CustomerLocationPage />} />
    <Route path="/customer" element={<CustomerAuthGuard />}>
      <Route element={<CustomerLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="*" element={<CustomerPage />} />
      </Route>
    </Route>

    <Route path="/delivery/onboarding" element={<Navigate to="/delivery/signup" replace />} />
    <Route path="/delivery/signin" element={<DeliverySignInPage />} />
    <Route path="/delivery/signup" element={<DeliverySignUpPage />} />
    <Route path="/delivery/verification" element={<DeliveryVerificationPage />} />
    <Route path="/delivery/onboarding-fee" element={<DeliveryLocationPage />} />
    <Route path="/delivery/onboarding-fee/payment" element={<DeliveryFeePage />} />
    <Route path="/delivery/application-submitted" element={<DeliveryApplicationSubmittedPage />} />
    <Route path="/delivery" element={<DeliveryAuthGuard />}>
      <Route element={<DeliveryLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<DeliveryPage />} />
      </Route>
    </Route>

    <Route path="/admin" element={<AdminLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<AdminPage />} /></Route>
    <Route path="/support" element={<SupportLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<SupportPageV3 />} /></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
