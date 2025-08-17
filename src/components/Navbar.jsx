import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/kabinet.png'

export default function Navbar(){
  const bar = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(bar.current, { y:-20, opacity:0 }, { y:0, opacity:1, duration:.6, ease:'power3.out' })

    const onScroll = () => {
      if (!bar.current) return
      const wrap = bar.current.querySelector('.nav-wrap')
      if (window.scrollY > 8) wrap.classList.add('glassy')
      else wrap.classList.remove('glassy')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="header" ref={bar}>
      <div className="nav-wrap">
        <div className="container">
          <div className="nav">
            <a href="#home" className="brand" aria-label="CodifyHub Home">
              <img src={logo} alt="CodifyHub" />
              <span>CodifyHub</span>
            </a>

            {/* Desktop links */}
            <nav className="nav-links" aria-label="Primary">
              <a href="#services">Layanan</a>
              <a href="#process">Proses</a>
              <a href="#work">Portofolio</a>
              <a href="#contact" className="btn-nav primary">Konsultasi Gratis</a>
            </nav>

            {/* Hamburger */}
            <button
              className="hamb"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="mobile-menu">
              <a href="#services" onClick={()=>setOpen(false)}>Layanan</a>
              <a href="#process" onClick={()=>setOpen(false)}>Proses</a>
              <a href="#work" onClick={()=>setOpen(false)}>Portofolio</a>
              <a href="#contact" className="btn-nav primary" onClick={()=>setOpen(false)}>Konsultasi Gratis</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}