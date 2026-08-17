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

export function AppRouter() {
  return <Routes>
    <Route path="/" element={<PrototypeHome />} />
    <Route path="/customer" element={<CustomerLayout />}><Route index element={<Navigate to="home" replace />} /><Route path="*" element={<CustomerPage />} /></Route>
    <Route path="/delivery" element={<DeliveryLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<DeliveryPage />} /></Route>
    <Route path="/admin" element={<AdminLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<AdminPage />} /></Route>
    <Route path="/support" element={<SupportLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="*" element={<SupportPageV3 />} /></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
