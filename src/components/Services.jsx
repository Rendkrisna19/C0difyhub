import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/kabinet.png'

const items = [
  { key:'web',       title:'CodifyHub Website', desc:'Landing page cepat, SEO-ready, & animasi GSAP.', icon: WebIcon },
  { key:'branding',  title:'Digital Branding',  desc:'Logo, guideline, dan sistem identitas visual.',   icon: BrandIcon },
  { key:'ads',       title:'Advertisements',    desc:'Setup iklan Meta/Google dengan tracking rapi.',   icon: AdsIcon },
  { key:'portfolio', title:'Portfolio',         desc:'Showcase hasil kerja & studi kasus terbaik.',     icon: PortfolioIcon },
  { key:'faq',       title:'FAQ',               desc:'Jawaban cepat untuk pertanyaan umum klien.',      icon: FaqIcon },
  { key:'contact',   title:'Kontak',            desc:'Hubungi kami untuk konsultasi gratis.',           icon: ContactIcon },
]

export default function Services(){
  const section = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services .card', {
        y:20, opacity:0, duration:.6, ease:'power2.out', stagger:.06
      })
      // hover lift micro animation (extra smooth)
      const cards = gsap.utils.toArray('.services .card')
      cards.forEach(el=>{
        el.addEventListener('mouseenter', ()=> gsap.to(el, { y:-6, duration:.25, ease:'power2.out' }))
        el.addEventListener('mouseleave', ()=> gsap.to(el, { y: 0, duration:.25, ease:'power2.out' }))
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="services" ref={section} id="services" aria-label="Layanan CodifyHub">
      <div className="container">
        <div className="services-grid">

          {/* LEFT column: big title + about card */}
          <div className="services-left">
            <div className="s-title">
              <h2>CODIFYHUB<br/>DIGITAL<br/>AGENCY.</h2>
            </div>

            <div className="card about">
              <div className="brand">
                <img src={logo} alt="CodifyHub"/>
                <div>
                  <h3 style={{margin:0}}>Tentang CodifyHub</h3>
                  <p style={{margin:0, color:'var(--ch-muted)'}}>Partner kamu untuk web yang cepat & interaktif.</p>
                </div>
              </div>
              <p>
                Kami fokus pada performa, UI/UX modern, dan animasi yang halus.
                Proses jelas: discovery → desain → development → launch.
              </p>
              <a href="#about" className="cta-mini">Pelajari</a>
            </div>
          </div>

          {/* RIGHT tiles */}
          {items.map(({key,title,desc,icon:Icon})=>(
            <div key={key} className="card">
              <div className="icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

/* ===== SVG ICONS ===== */
function WebIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="white" strokeWidth="2"/>
      <rect x="6" y="8" width="12" height="2" rx="1" fill="white" />
      <rect x="6" y="12" width="8" height="2" rx="1" fill="white" opacity=".85"/>
    </svg>
  )
}
function BrandIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2"/>
      <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function AdsIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h10l6 4-6 4H4z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="8" cy="12" r="1" fill="white"/>
    </svg>
  )
}
function PortfolioIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="2"/>
      <rect x="7" y="9" width="10" height="6" rx="1" fill="white" opacity=".9"/>
    </svg>
  )
}
function FaqIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M12 17v-1a4 4 0 1 0-4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="19" r="1" fill="white"/>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="white" strokeWidth="2"/>
    </svg>
  )
}
function ContactIcon(){
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 8l8 5 8-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="white" strokeWidth="2"/>
    </svg>
  )
}
