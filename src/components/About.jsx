import { useMemo, useRef, useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

// === Import gambar di sini ===
// Ganti file sesuai yang kamu punya di /src/assets
import img1 from '../assets/About/project1.png'
import img2 from '../assets/About/project5.png'
import img3 from '../assets/About/project2.png'
import img4 from '../assets/About/project3.png'
import img5 from '../assets/About/project4.png'
// kalau belum punya semuanya, sementara bisa arahkan beberapa import ke file yang sama

const IMAGES = [img1, img2, img3, img4, img5]

export default function About(){
  const carRef = useRef(null)

  // init tsparticles (wajib async)
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  // opsi particles: lembut & ringan
  const options = useMemo(() => ({
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
    el.classList.toggle('paused', paused)
  }

  return (
    <section id="about" className="section about" aria-label="About CodifyHub">
      {/* Particles background */}
      <div className="particles-wrap" aria-hidden>
        <Particles id="tsp" init={particlesInit} options={options} />
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

            <p style={{ marginBottom: 0 }}>
              Kami bantu dari <strong>ide</strong> → <strong>desain</strong> → <strong>launch</strong> → <strong>maintenance</strong>.
              Konsultasi gratis untuk memetakan kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Right: carousel infinite */}
          <div
            ref={carRef}
            className="carousel"
            onMouseEnter={() => handlePause(true)}
            onMouseLeave={() => handlePause(false)}
            onTouchStart={() => handlePause(true)}
            onTouchEnd={() => handlePause(false)}
          >
            <div className="carousel-track">
              {/* duplikasi 2x untuk loop mulus */}
              {[...IMAGES, ...IMAGES].map((src, i) => (
                <img key={i} src={src} alt={`Showcase ${i % IMAGES.length + 1}`} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
