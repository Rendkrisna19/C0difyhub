import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ==== Gambar (base & hover) ==== */
// WEB
import web1 from '../assets/Services/web-1.png'
import web2 from '../assets/Services/web-2.png'
// BRANDING
import brand1 from '../assets/Services/ads1.png'
import brand2 from '../assets/Services/ads2.png'
// ADS
import ads1 from '../assets/Services/branding1.png'
import ads2 from '../assets/Services/branding2.png'
// PORTFOLIO
import port1 from '../assets/Services/ads1.png'
import port2 from '../assets/Services/ads2.png'
// FAQ
import faq1 from '../assets/Services/branding1.png'
import faq2 from '../assets/Services/branding2.png'
// CONTACT
import contact1 from '../assets/Services/web-1.png'
import contact2 from '../assets/Services/web-2.png'

// Tentang (logo/ilustrasi besar)
import aboutImg from '../assets/Services/ads1.png'
import brandLogo from '../assets/Services/branding2.png'

const items = [
  { key:'web',       title:'NORE WEBSITE',     img1:web1,     img2:web2,     href:'#web' },
  { key:'branding',  title:'DIGITAL BRANDING', img1:brand1,   img2:brand2,   href:'#branding' },
  { key:'ads',       title:'ADVERTISEMENTS',   img1:ads1,     img2:ads2,     href:'#ads' },
  { key:'portfolio', title:'PORTFOLIO',        img1:port1,    img2:port2,    href:'#work' },
  { key:'faq',       title:'FAQ',              img1:faq1,     img2:faq2,     href:'#faq' },
  { key:'contact',   title:'KONTAK',           img1:contact1, img2:contact2, href:'#contact' },
]

export default function Services(){
  const section = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services .s-card, .services .card.about, .services .s-title', {
        y: 20, opacity: 0, duration: .6, ease: 'power2.out', stagger: .06
      })

      // micro hover lift
      gsap.utils.toArray('.services .s-card, .services .card.about').forEach((el) => {
        el.addEventListener('mouseenter', () => gsap.to(el, { y:-6, duration:.25, ease:'power2.out' }))
        el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration:.25, ease:'power2.out' }))
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="services" ref={section} id="services" aria-label="Layanan CodifyHub">
      <div className="container">
        <div className="services-grid">

          {/* Kiri: judul besar + kartu tentang */}
          <div className="s-title">
            <h2>CODIF<br/>YHUB<br/>JASA<br/>WEB.</h2>
          </div>

          <div className="card about">
            <div className="brand">
              <img src={brandLogo} alt="CodifyHub" />
              <div>
                <h3 style={{margin:0}}>Tentang CodifyHub</h3>
                <p style={{margin:0, color:'var(--ch-muted)'}}>No repot. No rempong.</p>
              </div>
            </div>
            <div className="about-ill">
              <img src={aboutImg} alt="Tentang CodifyHub" />
            </div>
            <a href="#about" className="cta-mini">TENTANG<br/>KAMI</a> 
          </div>
 
          {/* Kartu layanan (klikable, gambar swap) */}
          {items.map(({ key, title, img1, img2, href }) => (
            <a key={key} href={href} className={`s-card area-${key}`} aria-label={title}>
              <div className="s-img">
                <img className="base" src={img1} alt={title} loading="lazy" />
                <img className="hover" src={img2} alt={`${title} hover`} loading="lazy" />
              </div>
              <h3 className="s-title-lg">{title}</h3>
            </a>
          ))}

        </div>
      </div>
    </section>
  )
}
