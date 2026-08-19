import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mic, MapPin, ChevronDown, UserRound, Heart, Star, Plus, ChevronRight, Truck, Navigation, CreditCard, Headphones } from 'lucide-react'
import { products, categories } from '../../data/mockData'
import { CustomerHeader } from '../../layouts/CustomerLayout'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=90'

const categoryVisuals = {
  bowls: '🍲', rice: '🍚', wraps: '🌯', salads: '🥗', sides: '🍟', drinks: '🥤',
}

export function GoldenCustomerHome() {
  const navigate = useNavigate()
  const [selected, setSelected] = React.useState('all')
  const [query, setQuery] = React.useState('')

  const popular = products.slice(0, 3)
  const visibleCategories = [{ id: 'all', name: 'All', icon: '🍲' }, ...categories]

  const addToCart = (product) => {
    const key = 'goldbowl_cart'
    let cart = []
    try { cart = JSON.parse(localStorage.getItem(key)) || [] } catch {}
    const existing = cart.find(item => item.productId === product.id)
    const next = existing
      ? cart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { productId: product.id, quantity: 1 }]
    localStorage.setItem(key, JSON.stringify(next))
    navigate('/customer/cart')
  }

  const filteredPopular = popular.filter(p => {
    const matchesCategory = selected === 'all' || p.category === selected
    const matchesSearch = !query.trim() || `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return <>
    <CustomerHeader onProfile={() => navigate('/customer/profile')} />
    <div className="customer-home-body">
      <div className="customer-search">
        <Search size={26} strokeWidth={2} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for your favourite food..." aria-label="Search food" />
        <Mic size={24} strokeWidth={2} />
      </div>

      <div className="customer-categories" aria-label="Food categories">
        {visibleCategories.map(category => <Link
          key={category.id}
          to={category.id === 'all' ? '/customer/home' : `/customer/search?category=${category.id}`}
          onClick={() => setSelected(category.id)}
          className={`customer-category ${selected === category.id ? 'active' : ''}`}
        >
          <span className="category-icon">{category.icon || categoryVisuals[category.id] || '🍽️'}</span>
          <span className="category-name">{category.name === 'Signature Bowls' ? 'Bowls' : category.name === 'Fresh & Healthy' ? 'Salads' : category.name}</span>
        </Link>)}
      </div>

      <section className="customer-hero">
        <img src={HERO_IMAGE} alt="Fresh Golden Food Bowl" />
        <div className="customer-hero-copy">
          <h1>Delicious<br/>Food,<br/>Delivered<br/>Fresh!</h1>
          <p>Order Now from<br/>Golden Food Bowl</p>
          <Link to="/customer/categories">Order Now <ChevronRight size={17}/></Link>
        </div>
        <div className="hero-dots"><i/><i/><i/></div>
      </section>

      <div className="customer-section-title">
        <h2>Popular Items</h2>
        <Link to="/customer/search">View All <ChevronRight size={18}/></Link>
      </div>

      <div className="customer-popular">
        {filteredPopular.map(product => <article className="customer-food-card" key={product.id}>
          <Link to={`/customer/product/${product.id}`} className="customer-food-img">
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="food-heart"><Heart size={18}/></span>
          </Link>
          <div className="customer-food-info">
            <h3>{product.name}</h3>
            <div className="food-rating"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><span>({product.id === 1 ? 124 : product.id === 2 ? 98 : 76})</span></div>
            <div className="customer-food-bottom">
              <strong>₹{product.price}</strong>
              <button className="customer-add" type="button" onClick={() => addToCart(product)}>Add <Plus size={14}/></button>
            </div>
          </div>
        </article>)}
      </div>

      <div className="customer-benefits">
        <div className="customer-benefit"><Truck size={28}/><strong>Fast Delivery</strong></div>
        <div className="customer-benefit"><Navigation size={28}/><strong>Real-Time<br/>Tracking</strong></div>
        <div className="customer-benefit"><CreditCard size={28}/><strong>Multiple<br/>Payment Modes</strong></div>
        <div className="customer-benefit"><Headphones size={28}/><strong>24x7 Support</strong></div>
      </div>
    </div>
  </>
}
