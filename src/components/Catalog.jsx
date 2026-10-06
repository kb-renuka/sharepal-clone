import { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const tabs = ['Photography', 'Gaming', 'Outdoor', 'Entertainment']
const categories = [
  { name: 'All', icon: '😀' },
  { name: 'GTA VI', icon: '🎮' },
  { name: 'PS5 Console', icon: '🕹️' },
  { name: 'Xbox Console', icon: '🎮' },
  { name: 'VR', icon: '🥽' },
  { name: 'Racing Wheel', icon: '🏎️' },
]

export default function Catalog() {
  const [tab, setTab] = useState('Gaming')
  const [cat, setCat] = useState('All')
  const [visible, setVisible] = useState(8)

  return (
    <div className="mx-auto max-w-[1000px] px-4">
      <nav className="flex justify-center gap-16 py-3 text-sm font-medium text-slate-700">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-1 transition-colors ${
              tab === t ? 'border-b-2 border-purple-700 text-black' : 'hover:text-black'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="flex gap-5">
        <aside className="h-fit w-[96px] shrink-0 rounded-xl bg-white p-2 shadow-sm">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setCat(c.name)}
              className="mb-3 flex w-full flex-col items-center gap-1 text-center text-xs font-semibold"
            >
              <span
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-lg border text-2xl transition-colors ${
                  cat === c.name ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'
                }`}
              >
                {c.icon}
              </span>
              {c.name}
            </button>
          ))}
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex h-[183px] flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-[#5b1fa8] to-[#8b2fd9] px-8 text-center text-white">
            <h1 className="text-3xl font-bold">Gaming Consoles</h1>
            <p className="mt-3 max-w-md text-sm font-semibold">
              Rent the latest gaming gadgets from SharePal: PS5, Xbox, Oculus VR, Racing Wheel on rent.
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Gaming Gadgets On Rent</h2>
            <span className="text-sm text-slate-500">Total items: {products.length} items</span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
            {products.slice(0, visible).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="border-t border-slate-200 py-6 text-center">
            <p className="text-sm text-slate-500">
              Showing {Math.min(visible, products.length)} of {products.length} results
            </p>
            {visible < products.length && (
              <button
                onClick={() => setVisible(visible + 4)}
                className="mt-3 rounded-full border border-slate-900 px-8 py-2 text-sm font-semibold transition-colors hover:bg-slate-900 hover:text-white"
              >
                Load more
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}