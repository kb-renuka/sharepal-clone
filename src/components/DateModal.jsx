import { useState } from 'react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString()
const fmt = (d) => (d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '')

function Month({ year, month, today, delivery, pickup, onPick }) {
  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()
  const cells = Array(first).fill(null)
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))

  return (
    <div className="w-full">
      <p className="mb-3 text-center text-sm font-medium">{MONTHS[month]} {year}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {DAYS.map((d) => (
          <span key={d} className="pb-2 text-xs text-slate-400">{d}</span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />
          const past = date < today
          const selected = sameDay(date, delivery) || sameDay(date, pickup)
          const inRange = delivery && pickup && date > delivery && date < pickup
          return (
            <button
              key={i}
              disabled={past}
              onClick={() => onPick(date)}
              className={`mx-auto h-9 w-9 rounded-full text-sm transition-colors ${
                past
                  ? 'text-slate-300'
                  : selected
                  ? 'bg-[#0b1230] font-semibold text-white'
                  : inRange
                  ? 'bg-indigo-100'
                  : 'hover:bg-slate-100'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DateModal({ onClose, onContinue }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [offset, setOffset] = useState(0)
  const [delivery, setDelivery] = useState(null)
  const [pickup, setPickup] = useState(null)

  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1)
  const days = delivery && pickup ? Math.round((pickup - delivery) / 86400000) : 0

  const pick = (date) => {
    if (!delivery || pickup || date <= delivery) {
      setDelivery(date)
      setPickup(null)
    } else {
      setPickup(date)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[95vh] w-full max-w-[1000px] overflow-auto rounded-3xl bg-[#f1f1f1] p-6">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 text-lg"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold">Select your Dates</h2>

        <div className="mt-4 flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-[360px] md:shrink-0">
            <div className="grid grid-cols-2 gap-3 text-sm font-medium">
              <div>
                <p className="mb-1">Delivery Date <span className="text-red-500">*</span></p>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-500">
                  {delivery ? fmt(delivery) : 'Select delivery date'}
                </div>
              </div>
              <div>
                <p className="mb-1">Pickup Date <span className="text-red-500">*</span></p>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-500">
                  {pickup ? fmt(pickup) : 'Select pickup date'}
                </div>
              </div>
            </div>

            <p className="mt-4 rounded-lg bg-indigo-100 p-3 text-xs text-blue-900">
              <b>Same-day delivery</b> between <b>5PM and 11PM</b> For future dates, you can select a specific time slot available at checkout. We pickup between <b>9AM to 1PM</b>.
            </p>

            <p className="mt-5 text-sm font-medium">Your Rental Period:</p>
            <div className="mt-2 flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-4">
              <p>
                <span className="text-4xl font-bold">{String(days).padStart(2, '0')}</span>
                <span className="ml-1 text-sm text-slate-500">Day</span>
              </p>
              <div className="text-xs font-semibold">
                Chargeable Period:
                <p className="mt-1 text-sm font-normal text-slate-500">
                  {days ? `${fmt(delivery)} - ${fmt(pickup)}` : '--'}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[#020b2d] p-4 text-white">
              <p className="text-xl font-bold italic text-lime-300">Save more with us!</p>
              <p className="mt-2 text-xs font-semibold">
                Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don’t charge you for deliver and pickup days!
              </p>
            </div>

            <button
              disabled={!days}
              onClick={() => onContinue({ delivery, pickup, days })}
              className="mt-4 w-full rounded-full bg-[#0b1230] py-3 font-semibold text-white transition-opacity disabled:bg-slate-200 disabled:text-slate-400"
            >
              Continue
            </button>
          </div>

          <div className="relative flex-1 rounded-2xl bg-white p-6">
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              className="absolute left-4 top-4 h-8 w-8 rounded-full border border-slate-200"
              aria-label="Previous month"
            >
              ‹
            </button>
            <button
              onClick={() => setOffset(offset + 1)}
              className="absolute right-4 top-4 h-8 w-8 rounded-full border border-slate-200"
              aria-label="Next month"
            >
              ›
            </button>
            <div className="flex flex-col gap-6 pt-2 lg:flex-row">
              <Month year={base.getFullYear()} month={base.getMonth()} today={today} delivery={delivery} pickup={pickup} onPick={pick} />
              <Month year={next.getFullYear()} month={next.getMonth()} today={today} delivery={delivery} pickup={pickup} onPick={pick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}