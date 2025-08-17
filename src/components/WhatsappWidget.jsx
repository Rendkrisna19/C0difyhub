import { useEffect, useMemo, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

/** Normalisasi nomor:
 * - Hapus semua non-digit
 * - Jika diawali "0" → ganti "62" (kode ID)
 * - Jika diawali "+" → buang "+"
 */
const normalizePhone = (p) => {
  let digits = String(p || '').replace(/\D/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  if (digits.startsWith('0')) digits = '62' + digits.slice(1)
  return digits
}

export default function WhatsappWidget({
  phone = '082275373233',          // ← kamu bisa isi 08…; akan dinormalisasi
  message = 'Halo, apakah ada yang bisa kami bantu?',
  label = 'Chat sekarang'
}){
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const intlPhone = useMemo(() => normalizePhone(phone), [phone])

  // Tutup ketika klik luar (mobile/desktop)
  useEffect(() => {
    const onClick = (e) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const openWA = () => {
    const text = encodeURIComponent(message)
    const url = `https://wa.me/${intlPhone}?text=${text}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`wa-widget ${open ? 'open' : ''}`} ref={wrapRef}>
      {/* POPUP */}
      <div className="wa-popup" role="dialog" aria-label="WhatsApp chat">
        <div className="wa-head">
          <small>Powered by CodifyHub</small>
          <button className="wa-close" aria-label="Tutup" onClick={()=>setOpen(false)}>
            <IoClose size={18} />
          </button>
        </div>

        <div className="wa-body">
          <div className="wa-bubble">{message}</div>
        </div>

        <div className="wa-action">
          <button className="wa-btn" onClick={openWA}>
            <span>{label}</span>
            {/* panah kirim bisa pakai icon lain juga */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        className="wa-fab"
        aria-label="Buka WhatsApp"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <FaWhatsapp size={28} color="#fff" />
      </button>
    </div>
  )
}
