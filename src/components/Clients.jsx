import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import gemix from '../assets/About/about1.jpg'
import hyundai from '../assets/About/project1.png'
import allstay from '../assets/About/project2.png'
import antara from '../assets/About/project4.png'
import mte from '../assets/About/project4.png'
import uawinfly from '../assets/About/project5.png'
import kotasatu from '../assets/About/project5.png'

const logos = [
  { src: gemix, alt: 'Gemix' },
  { src: hyundai, alt: 'Hyundai Gowa' },
  { src: allstay, alt: 'Allstay' },
  { src: antara, alt: 'Antara Logistic' },
  { src: mte, alt: 'MTE Express' },
  { src: uawinfly, alt: 'Uawinfly' },
  { src: kotasatu, alt: 'Kotasatu' },
]

export default function Clients(){
  const sectionRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        autoAlpha: 0, y: 20, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

 
  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const onDown = () => el.classList.add('paused')
    const onUp = () => el.classList.remove('paused')
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchend', onUp, { passive: true })
    el.addEventListener('touchcancel', onUp, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchend', onUp)
      el.removeEventListener('touchcancel', onUp)
    }
  }, [])


  const strip = [...logos, ...logos]

  return (
    <section className="clients" id="clients" ref={sectionRef} aria-label="Klien CodifyHub">
      <div className="container">
        <h2>KLIEN CODIFYHUB</h2>

        <div className="logo-marquee" ref={marqueeRef}>
          <div className="logo-track">
            {strip.map((it, i) => (
              <div className="logo-item" key={`${it.alt}-${i}`} aria-hidden={i >= logos.length ? 'true' : 'false'}>
                <img src={it.src} alt={it.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="more">+100 klien lainnya</div>
      </div>
    </section>
  )
}
