import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const logos = [
  '/clients/gemix.png',
  '/clients/hyundai-gowa.png',
  '/clients/allstay.png',
  '/clients/antara-logistic.png',
  '/clients/mte-express.png',
  '/clients/uawinfly.png',
  '/clients/kotasatu.png',
  // tambah lagi kalau ada
]

export default function Clients(){
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.logo-item', {
        y: 14, opacity: 0,
        duration: .6, ease: 'power2.out',
        stagger: .05,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="clients" id="clients" ref={ref} aria-label="Klien CodifyHub">
      <div className="container">
        <h2>KLIEN CODIFYHUB</h2>

        <div className="logo-grid">
          {logos.map((src, i) => (
            <div className="logo-item" key={i} title={`Client ${i+1}`}>
              <img src={src} alt={`Logo client ${i+1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="more">+100 klien lainnya</div>
      </div>
    </section>
  )
}
