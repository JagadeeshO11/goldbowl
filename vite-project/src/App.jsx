import { useMemo, useState } from 'react'
import { Bell, ChevronRight, Clock3, Home, MapPin, Minus, Package, Plus, Search, ShoppingBag, Star, User, X, ArrowLeft, CreditCard, Truck, BarChart3, Boxes, Users, Headphones, Store, Copy, CheckCircle2, CircleDollarSign, Menu, LogOut } from 'lucide-react'
import { categories, branches, products, initialOrders, dashboardStats } from './data/mockData'
import './App.css'

const statusLabels = {
  CONFIRMED: 'Confirmed', PREPARING: 'Preparing', READY_FOR_PICKUP: 'Ready for pickup', ASSIGNED: 'Assigned', PICKED_UP: 'Picked up', OUT_FOR_DELIVERY: 'Out for delivery', DELIVERED: 'Delivered', CANCELLED: 'Cancelled',
}

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'

function Logo({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><img className="brand-mark" src={LOGO_URL} alt="Golden Bowl" /><div><strong>Golden Food</strong><span>BOWL</span></div></div>
}

function MobileShell({ children, active, setActive, title, onBack }) {
  const nav = [
    ['home', 'Home', Home], ['search', 'Search', Search], ['orders', 'Orders', Package], ['profile', 'Profile', User],
  ]
  return <div className="mobile-shell">
    <header className="mobile-header">{onBack ? <button className="icon-btn" onClick={onBack}><ArrowLeft /></button> : <Logo compact />}<div className="header-title">{title}</div><button className="icon-btn"><Bell /></button></header>
    <main className="mobile-content">{children}</main>
    <nav className="bottom-nav">{nav.map(([id, label, Icon]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}><Icon /><span>{label}</span></button>)}</nav>
  </div>
}

function Customer({ setRole }) {
  const [page, setPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState(initialOrders)
  const [branch, setBranch] = useState(branches[0])
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => products.filter(p => (selectedCategory === 'all' || p.category === selectedCategory) && p.name.toLowerCase().includes(search.toLowerCase())), [selectedCategory, search])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const addToCart = (product) => setCart(c => { const existing = c.find(x => x.product.id === product.id); return existing ? c.map(x => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x) : [...c, { product, quantity: 1 }] })
  const updateQty = (id, delta) => setCart(c => c.map(x => x.product.id === id ? { ...x, quantity: Math.max(0, x.quantity + delta) } : x).filter(x => x.quantity > 0))
  const checkout = () => { const order = { id: `BWL${10300 + orders.length}`, items: cart.map(x => ({ productId: x.product.id, quantity: x.quantity })), total: cartTotal + 40, status: 'CONFIRMED', type: 'Delivery', branch: branch.name, customer: 'You', driver: 'Rahul Kumar', eta: 35 }; setOrders([order, ...orders]); setCart([]); setPage('success') }
  const go = (p) => { setPage(p); if (p !== 'product') setSelectedProduct(null) }

  if (page === 'product' && selectedProduct) return <MobileShell title="Product Details" onBack={() => go('home')} active="home" setActive={go}><ProductDetails product={selectedProduct} addToCart={addToCart} /></MobileShell>
  if (page === 'cart') return <MobileShell title="Your Cart" onBack={() => go('home')} active="home" setActive={go}><Cart cart={cart} updateQty={updateQty} total={cartTotal} onCheckout={() => go('checkout')} /></MobileShell>
  if (page === 'checkout') return <MobileShell title="Checkout" onBack={() => go('cart')} active="home" setActive={go}><Checkout branch={branch} setBranch={setBranch} total={cartTotal} onPay={checkout} /></MobileShell>
  if (page === 'success') return <MobileShell title="Order Confirmed" active="orders" setActive={go}><Success order={orders[0]} onTrack={() => go('tracking')} onOrders={() => go('orders')} /></MobileShell>
  if (page === 'tracking') return <MobileShell title="Track Order" onBack={() => go('orders')} active="orders" setActive={go}><Tracking order={orders[0]} /></MobileShell>
  if (page === 'orders') return <MobileShell title="My Orders" active="orders" setActive={go}><Orders orders={orders} onTrack={() => go('tracking')} onReorder={(o) => { o.items.forEach(i => { const p = products.find(x => x.id === i.productId); if (p) addToCart(p) }); go('cart') }} /></MobileShell>
  if (page === 'profile') return <MobileShell title="My Account" active="profile" setActive={go}><Profile setRole={setRole} /></MobileShell>
  if (page === 'search') return <MobileShell title="Search Food" active="search" setActive={go}><SearchPage search={search} setSearch={setSearch} products={filteredProducts} onProduct={(p) => { setSelectedProduct(p); go('product') }} /></MobileShell>

  return <MobileShell active={page} setActive={go} title="">
    <div className="location-row"><MapPin /><div><small>Delivering to</small><strong>{branch.area}</strong></div><ChevronRight /></div>
    <section className="hero"><div><span>GOLDEN MOMENTS</span><h1>Good food.<br /><em>Better bowls.</em></h1><p>Freshly made, beautifully delivered.</p><button onClick={() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' })}>Explore Menu</button></div><div className="hero-bowl">🍲</div></section>
    <div className="search-box" onClick={() => go('search')}><Search /><span>Search bowls, meals and more</span></div>
    <section><div className="section-head"><h2>Browse Categories</h2><button onClick={() => setSelectedCategory('all')}>View all</button></div><div className="category-row">{categories.map(c => <button className="category" key={c.id} onClick={() => { setSelectedCategory(c.id); go('search') }}><span>{c.icon}</span><small>{c.name}</small></button>)}</div></section>
    <section id="popular"><div className="section-head"><h2>Popular at Bowl</h2><button onClick={() => go('search')}>See all</button></div><div className="product-grid">{filteredProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); go('product') }} onAdd={() => addToCart(p)} />)}</div></section>
    <section className="branch-card"><Store /><div><small>Your branch</small><strong>{branch.name}</strong><span>{branch.distance} • Open now</span></div><ChevronRight /></section>
    {cartCount > 0 && <button className="floating-cart" onClick={() => go('cart')}><ShoppingBag /> <span>{cartCount} items</span><strong>₹{cartTotal}</strong></button>}
  </MobileShell>
}

function ProductCard({ product, onClick, onAdd }) { return <article className="product-card"><button className="food-image" onClick={onClick}>{product.image}</button><div className="product-info"><div className="rating"><Star size={13} fill="currentColor" /> {product.rating}</div><h3>{product.name}</h3><p>{product.portion} • {product.calories} kcal</p><div className="price-row"><strong>₹{product.price}</strong><button onClick={onAdd}><Plus size={18} /></button></div></div></article> }
function ProductDetails({ product, addToCart }) { const [qty, setQty] = useState(1); return <div><div className="detail-image">{product.image}</div><div className="detail-title"><div><span className="pill success">Available</span><h1>{product.name}</h1><div className="rating"><Star size={14} fill="currentColor" /> {product.rating} rating</div></div><strong>₹{product.price}</strong></div><p className="description">{product.description}</p><div className="nutrition"><div><strong>{product.portion}</strong><span>Portion</span></div><div><strong>{product.calories}</strong><span>Calories</span></div><div><strong>{product.ingredients.length}</strong><span>Ingredients</span></div></div><h2>Ingredients</h2><div className="ingredient-list">{product.ingredients.map(i => <span key={i}>{i}</span>)}</div><div className="sticky-add"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus /></button><strong>{qty}</strong><button onClick={() => setQty(qty + 1)}><Plus /></button></div><button className="primary-btn" onClick={() => { for (let i = 0; i < qty; i++) addToCart(product) }}>Add to Cart • ₹{product.price * qty}</button></div></div> }
function Cart({ cart, updateQty, total, onCheckout }) { if (!cart.length) return <Empty title="Your cart is empty" text="Add something delicious from the menu." />; return <div><div className="cart-list">{cart.map(({ product, quantity }) => <div className="cart-item" key={product.id}><span className="cart-emoji">{product.image}</span><div className="cart-meta"><strong>{product.name}</strong><span>₹{product.price}</span><div className="quantity small"><button onClick={() => updateQty(product.id, -1)}><Minus /></button>{quantity}<button onClick={() => updateQty(product.id, 1)}><Plus /></button></div></div><strong>₹{product.price * quantity}</strong></div>)}</div><div className="summary"><div><span>Subtotal</span><strong>₹{total}</strong></div><div><span>Delivery</span><strong>₹40</strong></div><div><span>Taxes</span><strong>₹{Math.round(total * .05)}</strong></div><hr /><div className="total"><span>Total</span><strong>₹{total + 40 + Math.round(total * .05)}</strong></div></div><button className="primary-btn full" onClick={onCheckout}>Proceed to Checkout <ChevronRight /></button></div> }
function Checkout({ branch, setBranch, total, onPay }) { const [type, setType] = useState('Delivery'); const [payment, setPayment] = useState('UPI'); return <div className="checkout"><h2>Order type</h2><div className="segmented">{['Delivery', 'Pickup'].map(x => <button className={type === x ? 'selected' : ''} onClick={() => setType(x)} key={x}>{x === 'Delivery' ? <Truck /> : <Store />}{x}</button>)}</div><h2>Branch</h2><select value={branch.id} onChange={e => setBranch(branches.find(b => b.id === Number(e.target.value)))}>{branches.map(b => <option value={b.id} key={b.id}>{b.name} • {b.distance}</option>)}</select>{type === 'Delivery' && <><h2>Delivery address</h2><div className="address"><MapPin /><div><strong>Home</strong><span>42, 5th Main Road, Bengaluru</span></div><ChevronRight /></div></>}<h2>Payment method</h2><div className="payment-list">{['UPI', 'Credit / Debit Card', 'Net Banking', 'Digital Wallet'].map(x => <button key={x} className={payment === x ? 'selected' : ''} onClick={() => setPayment(x)}><span className="radio">{payment === x ? '●' : '○'}</span><CreditCard />{x}<ChevronRight /></button>)}</div><button className="primary-btn full" onClick={onPay}>Pay ₹{total + 40 + Math.round(total * .05)} <CheckCircle2 /></button></div> }
function Success({ order, onTrack, onOrders }) { return <div className="success-page"><div className="success-icon"><CheckCircle2 /></div><h1>Order Confirmed!</h1><p>Your food is being prepared and we'll keep you updated.</p><div className="success-card"><span>Order number</span><strong>#{order.id}</strong><span>Estimated delivery</span><strong>{order.eta}–40 minutes</strong></div><button className="primary-btn full" onClick={onTrack}>Track Order</button><button className="secondary-btn full" onClick={onOrders}>View Orders</button></div> }
function Tracking({ order }) { const steps = ['CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY', 'DELIVERED']; const current = steps.indexOf(order.status); return <div><div className="tracking-map"><div className="map-road"></div><div className="map-marker restaurant">🍲</div><div className="map-marker driver">🛵</div><div className="map-marker home">🏠</div></div><div className="tracking-header"><div><span>Order #{order.id}</span><h1>Arriving in {order.eta} min</h1></div><span className="pill">{statusLabels[order.status]}</span></div><div className="timeline">{steps.map((s, i) => <div className={i <= current ? 'done' : ''} key={s}><span>{i <= current ? '✓' : '○'}</span><div><strong>{statusLabels[s]}</strong><small>{i === current ? 'Current status' : i < current ? 'Completed' : 'Coming next'}</small></div></div>)}</div><div className="driver-card"><div className="avatar">RK</div><div><strong>{order.driver || 'Delivery partner'}</strong><span>Delivery partner</span></div><button>Call</button></div></div> }
function Orders({ orders, onTrack, onReorder }) { return <div>{orders.map(o => <article className="order-card" key={o.id}><div className="order-head"><strong>#{o.id}</strong><span className="pill">{statusLabels[o.status]}</span></div><p>{o.items.map(i => products.find(p => p.id === i.productId)?.name).join(', ')}</p><div className="order-foot"><strong>₹{o.total}</strong><span>{o.type} • {o.branch}</span></div><div className="order-actions">{['OUT_FOR_DELIVERY', 'PREPARING', 'CONFIRMED'].includes(o.status) && <button onClick={onTrack}>Track Order</button>}<button onClick={() => onReorder(o)}>Reorder</button></div></article>)}</div> }
function SearchPage({ search, setSearch, products: list, onProduct }) { return <div><div className="search-box active"><Search /><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food..." /></div><div className="filter-row">{categories.map(c => <button key={c.id}>{c.icon} {c.name}</button>)}</div><div className="product-grid">{list.map(p => <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} onAdd={() => {}} />)}</div>{!list.length && <Empty title="No bowls found" text="Try another search." />}</div> }
function Profile({ setRole }) { return <div><div className="profile-card"><div className="avatar large">PS</div><div><h2>Priya Sharma</h2><span>priya@example.com</span></div></div>{['My addresses', 'Saved payments', 'Notifications', 'Help & support'].map(x => <button className="list-row" key={x}><span>{x}</span><ChevronRight /></button>)}<button className="list-row danger" onClick={() => setRole(null)}><LogOut /> <span>Sign out</span></button></div> }
function Empty({ title, text }) { return <div className="empty"><ShoppingBag /><h2>{title}</h2><p>{text}</p></div> }

function Admin({ setRole, support = false }) { const [section, setSection] = useState(support ? 'orders' : 'dashboard'); const [copied, setCopied] = useState(false); const adminNav = support ? [['orders', 'Orders', Package], ['products', 'Products', Boxes], ['issues', 'Customer Issues', Headphones]] : [['dashboard', 'Dashboard', BarChart3], ['orders', 'Orders', Package], ['products', 'Products', Boxes], ['customers', 'Customers', Users]]
