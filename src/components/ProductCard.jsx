export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="relative flex h-[184px] items-center justify-center rounded-2xl bg-white text-6xl shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
        {product.badge && (
          <span
            className={`absolute left-2 top-2 rounded-md border bg-white px-2 py-0.5 text-[11px] font-medium ${
              product.badge === 'New'
                ? 'border-sky-600 text-sky-700'
                : 'border-orange-500 text-orange-600'
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.icon}
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-[44px] text-sm font-bold text-slate-900">
        {product.name}
      </h3>

      <div className="mt-2 flex items-end justify-between border-t border-slate-200 pt-2">
        <p className="text-xs font-semibold leading-tight text-slate-500">
          Select Dates to
          <br />
          view price
        </p>
        <button
          aria-label={`Add ${product.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 text-xl transition-colors hover:bg-slate-900 hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  )
}
