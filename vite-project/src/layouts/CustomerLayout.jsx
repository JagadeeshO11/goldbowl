import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, Package, User } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'
const phoneShellFix = `
  .mobile-prototype-frame .mobile-app-shell { position: relative !important; overflow: hidden !important; display: flex !important; flex-direction: column !important; width: 390px !important; height: min(844px, calc(100vh - 48px)) !important; max-height: calc(100vh - 48px) !important; min-height: 0 !important; }
  .mobile-prototype-frame .mobile-route-content { position: relative !important; flex: 1 1 auto !important; min-height: 0 !important; height: auto !important; overflow-y: auto !important; overflow-x: hidden !important; padding-bottom: 0 !important; }
  .mobile-prototype-frame .mobile-app-shell > .bottom-nav { position: relative !important; inset: auto !important; transform: none !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; width: 100% !important; max-width: none !important; height: 72px !important; min-height: 72px !important; flex: 0 0 72px !important; z-index: 30 !important; }
  .mobile-prototype-frame .mobile-app-shell > .bottom-nav a { flex: 1 1 0 !important; min-width: 0 !important; }
  .customer-mobile-brand { display:flex; align-items:center; gap:9px; min-width:0; }
  .customer-mobile-brand img { width:38px; height:38px; object-fit:contain; display:block; flex:0 0 38px; }
  .customer-mobile-brand div { display:flex; flex-direction:column; line-height:1.05; }
  .customer-mobile-brand strong { font-size:13px; font-weight:900; color:#29251f; }
  .customer-mobile-brand small { margin-top:3px; font-size:7px; letter-spacing:1.6px; color:#9d731d; font-weight:800; }
  @media (max-width: 600px) { .mobile-prototype-frame .mobile-app-shell { width: 100% !important; height: 100dvh !important; max-height: none !important; border: 0 !important; border-radius: 0 !important; } }
`

export function CustomerLayout() {
  const links = [['home', 'Home', Home], ['search', 'Search', Search], ['orders', 'Orders', Package], ['profile', 'Profile', User]]
  return (
    <div className="mobile-prototype-frame">
      <style>{phoneShellFix}</style>
      <div className="mobile-app-shell">
        <header className="customer-mobile-brand"><img src={LOGO_URL} alt="Golden Bowl" /><div><strong>Golden Food</strong><small>GOLDEN BOWL</small></div></header>
        <main className="mobile-route-content"><Outlet /></main>
        <nav className="bottom-nav">
          {links.map(([to, label, Icon]) => <NavLink key={to} to={`/customer/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}
        </nav>
      </div>
    </div>
  )
}
