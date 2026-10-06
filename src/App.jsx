import { useState } from 'react'
import Header from './components/Header'
import Catalog from './components/Catalog'
import DateModal from './components/DateModal'

export default function App() {
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState(null)

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Header />
      <Catalog />

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border-2 border-lime-300 bg-[#0b1230] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
      >
        {dates
          ? `${dates.days} day rental · Change dates`
          : 'Select rental dates to view prices'}
      </button>

      {open && (
        <DateModal
          onClose={() => setOpen(false)}
          onContinue={(d) => {
            setDates(d)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}