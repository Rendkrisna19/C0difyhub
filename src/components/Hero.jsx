import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero(){
  const scope = useRef(null)
  const TITLE = 'Bangun Website Premium Bersama CodifyHub'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ===== Background soft motion ===== */
      // titik kecil berkedip
      gsap.utils.toArray('.dot').forEach((d,i)=>{
        gsap.set(d,{ top: 80 + (i%6)*70, left: 40 + Math.floor(i/6)*140 })
      })
      gsap.to('.dot', { autoAlpha:.15, duration:1.6, ease:'sine.inOut', repeat:-1, yoyo:true, stagger:.06 })

      // beam halus (opsional)
      gsap.to('.beam', { x:'+=180', duration:14, ease:'none', repeat:-1, yoyo:true })

      // device float
      gsap.to('.device', { y:-10, rotation:-2, duration:2.8, ease:'sine.inOut', repeat:-1, yoyo:true })

      /* ===== Typing headline LOOP ===== */
      const chars = gsap.utils.toArray('.typing-char')

      const resetChars = () => gsap.set(chars, { opacity:0, y:6, filter:'blur(2px)' })

      const playCycle = () => {
        resetChars()
        const tl = gsap.timeline()
        // ketik huruf per huruf
        tl.to(chars, {
          opacity:1, y:0, filter:'blur(0px)',
          duration:0.04, stagger:0.045, ease:'none'
        })
        .to({}, { duration:1 }) // jeda setelah selesai
        // hapus huruf per huruf
        .to([...chars].reverse(), {
          opacity:0, y:6, filter:'blur(2px)',
          duration:0.03, stagger:0.04, ease:'none',
          onComplete: playCycle
        })
      }
      playCycle()
    }, scope)
    return () => ctx.revert()
  }, [])

  // Render tiap karakter; spasi = &nbsp; agar caret tidak lompat
  const renderTitle = () =>
    Array.from(TITLE).map((ch, i) => (
      <span key={i} className="typing-char">{ch === ' ' ? '\u00A0' : ch}</span>
    ))

  return (
    <section className="hero" id="home" ref={scope} aria-label="CodifyHub Hero">
      {/* background elemen halus */}
      <div className="beam" style={{
        top:120, left:0, width:280, height:2, position:'absolute',
        background:'linear-gradient(90deg, rgba(29,62,138,0) 0%, rgba(29,62,138,.35) 50%, rgba(29,62,138,0) 100%)',
        opacity:.5
      }}/>
      {Array.from({length:24}).map((_,i)=><div key={i} className="dot" style={{position:'absolute'}} />)}

      <div className="hero-grid">
        {/* Left: title typing loop + sub + CTA + socials */}
        <div>
          <h1 className="hero-title type-row" aria-label={TITLE}>
            {renderTitle()} <span className="caret" aria-hidden="true" />
          </h1>

          <p className="hero-sub">Website kencang, modern, dan interaktif untuk bisnis Anda.</p>

          <div className="cta">
            <a href="#contact" className="btn primary">Diskusi Project Sekarang</a>
            <a href="#work" className="btn">Lihat Portofolio</a>
          </div>

          <div className="socials" aria-label="Social links" style={{marginTop:8}}>
            <a className="icon-btn" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.47 14.37c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.62.14-.19.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.03-.48-.08-.14-.62-1.49-.85-2.04-.22-.52-.45-.45-.62-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.71 4.14.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.16.16-1.28-.07-.12-.25-.2-.52-.33Z" fill="currentColor"/>
                <path d="M20.51 3.49A10 10 0 1 0 3.49 20.5 10 10 0 0 0 20.5 3.49Zm-2.1 14.92a8 8 0 1 1 1.58-12.35 8 8 0 0 1-1.58 12.35Z" fill="currentColor"/>
              </svg>
            </a>
            <a className="icon-btn" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/>
              </svg>
            </a>
            <a className="icon-btn" href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 3v7.5a4.5 4.5 0 1 1-3.3-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 3c1.2 1.7 3.1 2.9 5.2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right: animated device */}
        <div className="device-wrap">
          <div className="device">
            <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#1D3E8A"/>
                  <stop offset="100%" stopColor="#2B5AC8"/>
                </linearGradient>
                <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(20,30,60,.25)"/>
                </filter>
              </defs>
              <rect x="80" y="60" rx="18" ry="18" width="480" height="300" fill="#0F172A" stroke="#E9ECF3" strokeWidth="6" filter="url(#shadow)"/>
              <rect x="110" y="90" width="180" height="20" rx="8" fill="url(#g1)"/>
              <rect x="110" y="120" width="420" height="12" rx="6" fill="#1f2937" opacity=".4"/>
              <rect x="110" y="150" width="420" height="12" rx="6" fill="#1f2937" opacity=".35"/>
              <rect x="110" y="180" width="320" height="12" rx="6" fill="#1f2937" opacity=".3"/>
              <rect x="110" y="210" width="260" height="120" rx="12" fill="url(#g1)" opacity=".85"/>
              <rect x="300" y="360" width="40" height="40" rx="8" fill="#e5e7eb"/>
              <rect x="160" y="400" width="320" height="18" rx="9" fill="#e5e7eb"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
