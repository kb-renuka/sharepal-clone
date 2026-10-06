export default function Header() {
  return (
    <header className="bg-[#4c1d7e]">
      <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-4">
        <div className="self-start rounded-b-xl bg-[#1d4ed8] px-5 py-3 text-2xl font-extrabold italic text-white">
          SharePal
        </div>

        <div className="flex items-center overflow-hidden rounded-full bg-[#ece8f5] text-sm font-medium text-slate-800">
          <button className="px-4 py-2">Bangalore ▾</button>
          <button className="px-3 py-2">Delivery Date</button>
          <button className="px-3 py-2">Pickup Date</button>
          <button className="m-0.5 rounded-full bg-[#0b1230] px-4 py-2 text-white">
            Select
          </button>
        </div>

        <div className="flex items-center gap-5 text-white">
          <span>Search</span>
          <span>Cart</span>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#4c1d7e]">
            Hi, Login
          </span>
        </div>
      </div>
    </header>
  )
}