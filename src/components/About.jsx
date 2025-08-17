import { useMemo, useRef } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const imgs = [
  '../assets/about1.jpg',
  '../assets/about1.jpg',
  '../assets/about1.jpg',
  '../assets/about1.jpg',
  '../assets/about1.jpg',
  
]

export default function About(){
  const carRef = useRef(null)

  // opsi particles: lembut & ringan, warna mengikuti biru CodifyHub
  const options = useMemo(()=>({
    background: { color: { value: '#ffffff' } },
    fpsLimit: 60,
    particles: {
      number: { value: 30, density: { enable: true, area: 800 } },
      color: { value: ['#1D3E8A', '#2B5AC8'] },
      opacity: { value: 0.15 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.6, direction: 'none', outModes: 'out' },
      links: { enable: true, color: '#1D3E8A', opacity: 0.12, distance: 140, width: 1 }
    },
    detectRetina: true,
    fullScreen: { enable: false }
  }), [])

  const handlePause = (paused) => {
    const el = carRef.current
    if (!el) return
    if (paused) el.classList.add('paused')
    else el.classList.remove('paused')
  }

  return (
    <section id="about" className="section about" aria-label="About CodifyHub">
      {/* Particles background */}
      <div className="particles-wrap" aria-hidden>
        <Particles
          id="tsp"
          init={loadFull}
          options={options}
        />
      </div>

      <div className="container content">
        <div className="about-grid">
          {/* Left: text */}
          <div>
            <h2>Mengenal CodifyHub</h2>
            <p>
              Kami membangun website cepat, aman, dan mudah dikembangkan.
              Fokus kami: performa, UI/UX modern, dan animasi yang terasa hidup.
            </p>

            <div className="badges">
              <span className="badge">React + Vite</span>
              <span className="badge">GSAP Motion</span>
              <span className="badge">SEO & Lighthouse 90+</span>
              <span className="badge">Support & Garansi</span>
            </div>

            <p style={{marginBottom:0}}>
              Kami bantu dari <strong>ide</strong> → <strong>desain</strong> → <strong>launch</strong> → <strong>maintenance</strong>.
              Konsultasi gratis untuk memetakan kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Right: carousel infinite */}
          <div
            ref={carRef}
            className="carousel"
            onMouseEnter={()=>handlePause(true)}
            onMouseLeave={()=>handlePause(false)}
            onTouchStart={()=>handlePause(true)}
            onTouchEnd={()=>handlePause(false)}
          >
            <div className="carousel-track">
              {/* duplikasi 2x untuk loop mulus */}
              {[...imgs, ...imgs].map((src, i)=>(
                <img key={i} src={src} alt={`Showcase ${i%imgs.length + 1}`} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
