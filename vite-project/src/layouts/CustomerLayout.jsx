import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, Package, User } from 'lucide-react'

const phoneShellFix = `
  .mobile-prototype-frame .mobile-app-shell { position: relative !important; overflow: hidden !important; display: flex !important; flex-direction: column !important; width: 390px !important; height: min(844px, calc(100vh - 48px)) !important; max-height: calc(100vh - 48px) !important; min-height: 0 !important; }
  .mobile-prototype-frame .mobile-route-content { position: relative !important; flex: 1 1 auto !important; min-height: 0 !important; height: auto !important; overflow-y: auto !important; overflow-x: hidden !important; padding-bottom: 0 !important; }
  .mobile-prototype-frame .mobile-app-shell > .bottom-nav { position: relative !important; inset: auto !important; transform: none !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important; width: 100% !important; max-width: none !important; height: 72px !important; min-height: 72px !important; flex: 0 0 72px !important; z-index: 30 !important; }
  .mobile-prototype-frame .mobile-app-shell > .bottom-nav a { flex: 1 1 0 !important; min-width: 0 !important; }
  @media (max-width: 600px) { .mobile-prototype-frame .mobile-app-shell { width: 100% !important; height: 100dvh !important; max-height: none !important; border: 0 !important; border-radius: 0 !important; } }
`

export function CustomerLayout() {
  const links = [['home', 'Home', Home], ['search', 'Search', Search], ['orders', 'Orders', Package], ['profile', 'Profile', User]]
  return (
    <div className="mobile-prototype-frame">
      <style>{phoneShellFix}</style>
      <div className="mobile-app-shell">
        <main className="mobile-route-content"><Outlet /></main>
        <nav className="bottom-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={`/customer/${to}`} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
