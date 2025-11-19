import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : initialValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

function Header({ cartCount, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-md hover:bg-slate-100" onClick={onOpenMenu} aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Gamers Heaven</span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <a href="#catalog" className="hover:text-indigo-600">Catalog</a>
          <a href="#about" className="hover:text-indigo-600">About</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
        </div>
        <Link to="/cart" className="relative p-2 rounded-md hover:bg-slate-100" aria-label="Open cart">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 text-white w-5 h-5 rounded-full grid place-items-center">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-lg font-semibold mb-2">Gamers Heaven</div>
          <p className="text-slate-600">Trusted marketplace for game currencies, top-ups, and services. Fast delivery. Secure checkout.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <ul className="space-y-2 text-slate-600">
            <li>Help Center</li>
            <li>Order Tracking</li>
            <li>Refund Policy</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-2 text-slate-600">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Follow</div>
          <ul className="space-y-2 text-slate-600">
            <li>Twitter</li>
            <li>Discord</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} Gamers Heaven. All rights reserved.</div>
    </footer>
  )
}

function Hero({ onSearch }) {
  const [term, setTerm] = useState('')
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">Level up with instant game currencies and top-ups</h1>
            <p className="mt-4 text-slate-600 text-lg">Discover popular items for your favorite titles. Fast delivery. Secure and trusted.</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={term} onChange={(e)=>setTerm(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter') onSearch(term)}} placeholder="Search items, games, platforms..." className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={()=>onSearch(term)} className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Search</button>
            </div>
            <div className="mt-4 text-xs text-slate-500">Popular: Elden Ring, GTA Online, FIFA, Valorant</div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop" alt="gaming" className="rounded-2xl shadow-2xl border border-white/40" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Filters({ categories, platforms, active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select value={active.category || ''} onChange={(e)=>setActive(a=>({...a, category: e.target.value || undefined}))} className="px-4 py-2 rounded-lg border border-slate-300">
        <option value="">All Categories</option>
        {categories.map((c)=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={active.platform || ''} onChange={(e)=>setActive(a=>({...a, platform: e.target.value || undefined}))} className="px-4 py-2 rounded-lg border border-slate-300">
        <option value="">All Platforms</option>
        {platforms.map((p)=> <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  )
}

function ProductCard({ item, onAdd }) {
  const navigate = useNavigate()
  return (
    <div className="group rounded-xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
        <div className="mt-1 text-sm text-slate-500">{item.platform} • {item.category}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
          <div className="flex gap-2">
            <button onClick={()=>navigate(`/product/${item.id}`)} className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Details</button>
            <button onClick={()=>onAdd(item)} className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Catalog({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [filters, setFilters] = useState({ q: undefined, category: undefined, platform: undefined })

  const fetchData = async () => {
    try {
      setLoading(true)
      const [cats, plats] = await Promise.all([
        apiGet('/api/categories'),
        apiGet('/api/platforms')
      ])
      setCategories(cats)
      setPlatforms(plats)

      const params = new URLSearchParams()
      if (filters.q) params.append('q', filters.q)
      if (filters.category) params.append('category', filters.category)
      if (filters.platform) params.append('platform', filters.platform)
      const data = await apiGet(`/api/products?${params.toString()}`)
      setProducts(data)
    } catch (e) {
      setError('Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() // eslint-disable-next-line
  }, [filters.q, filters.category, filters.platform])

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Popular Items</h2>
        <Filters categories={categories} platforms={platforms} active={filters} setActive={setFilters} />
      </div>
      {error && <div className="mt-6 text-red-600">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-60 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((p) => (
            <ProductCard key={p.id} item={p} onAdd={addToCart} />
          ))}
        </div>
      )}
    </section>
  )
}

function ProductPage({ addToCart }) {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await apiGet(`/api/products/${id}`)
        setItem(data)
      } catch (e) {
        setError('Item not found')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">Loading...</div>
  if (error) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-red-600">{error}</div>
  if (!item) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{item.title}</h1>
          <div className="mt-1 text-slate-500">{item.platform} • {item.category}</div>
          <div className="mt-6 text-3xl font-black">${item.price.toFixed(2)}</div>
          <p className="mt-6 text-slate-700 leading-relaxed">{item.description}</p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => addToCart(item)} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              Add to Cart
            </button>
            <Link to="/" className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartPage({ cart, setCart }) {
  const navigate = useNavigate()
  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  const updateQty = (id, qty) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-slate-600">Your cart is empty. <button className="underline" onClick={()=>navigate('/')}>Continue shopping</button></div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl bg-white">
                <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-slate-500">{item.platform} • {item.category}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="text-sm text-slate-600">Qty</label>
                    <input type="number" min="1" value={item.qty} onChange={(e)=>updateQty(item.id, parseInt(e.target.value||'1'))} className="w-20 px-2 py-1 rounded-lg border border-slate-300" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(item.price * item.qty).toFixed(2)}</div>
                  <button onClick={()=>removeItem(item.id)} className="mt-3 text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 h-fit">
            <div className="flex items-center justify-between text-slate-700">
              <div>Subtotal</div>
              <div className="font-semibold">${total.toFixed(2)}</div>
            </div>
            <button className="mt-6 w-full px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Checkout</button>
            <div className="text-xs text-slate-500 mt-3">Secure payment and instant delivery.</div>
          </div>
        </div>
      )}
    </div>
  )}
}

function Home() {
  const [cart, setCart] = useLocalStorage('gh_cart', [])
  const [search, setSearch] = useState()
  const addToCart = (item) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === item.id)
      if (existing) return c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { ...item, qty: 1 }]
    })
  }
  return (
    <>
      <Hero onSearch={setSearch} />
      <Catalog addToCart={addToCart} key={JSON.stringify(search)} />
    </>
  )
}

function Shell() {
  const [cart, setCart] = useLocalStorage('gh_cart', [])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header cartCount={cartCount} onOpenMenu={()=>{}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage addToCart={(item)=>setCart((c)=>[...c, { ...item, qty: 1 }])} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
