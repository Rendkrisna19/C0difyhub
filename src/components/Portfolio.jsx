// src/components/Portfolio.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// === Import gambar (ganti sesuai file kamu) ===
import p1 from '../assets/About/project1.png'
import p2 from '../assets/About/project2.png'
import p3 from '../assets/About/project4.png'
import p4 from '../assets/About/project5.png'
import p5 from '../assets/About/project4.png'
import p6 from '../assets/About/project4.png'
import p7 from '../assets/About/project5.png'
import p8 from '../assets/About/project1.png'
import p9 from '../assets/About/project4.png'

// Konten (campur text + image)
const entries = [
  { type:'text', tag:'PORTFOLIO', title:'Kami telah berpengalaman', desc:'Menyelesaikan kebutuhan website, branding, dan digital marketing Anda.' },
  { type:'img',  img:p1 },

  { type:'img',  img:p2 },
  { type:'text', tag:'META ADS EROPA MOTOR', title:'Lead meningkat signifikan',
    desc:'Dengan fokus pada audien yang tepat, CPA turun dan jangkauan meningkat. Funnel yang rapi memastikan konversi & pertumbuhan bisnis.' },

  { type:'img',  img:p3 },
  { type:'text', tag:'INSTAGRAM @DAPRA.ID', title:'Konten elegan & konsisten',
    desc:'Tone emosional untuk audience kebersihan, menekankan kenyamanan, efisiensi, serta kualitas layanan. Hasil: engagement tinggi.' },

  { type:'text', tag:'INSTAGRAM @DELAVAL.ID', title:'Konten premium klinik',
    desc:'Narasi berkelas untuk produk dan layanan kecantikan premium. Hasil: impresi & interaksi naik, brand positioning lebih kuat.' },
  { type:'img',  img:p4 },

  { type:'text', tag:'SEM MULIASERVICE', title:'Search intent → konversi',
    desc:'Kampanye kata kunci bernilai tinggi & landing yang dioptimasi. Kepercayaan meningkat dan lead organik stabil.' },
  { type:'img',  img:p5 },

  { type:'text', tag:'WEBSITE ANTARALOGISTIC.COM', title:'Informasi padat & cepat',
    desc:'Optimasi arsitektur konten + pelacakan analitik. Pengalaman pengguna meningkat, bounce turun, lead bertambah.' },
  { type:'img',  img:p6 },

  { type:'text', tag:'WEBSITE ELKA JAYA MANDIRI', title:'Company profile modern',
    desc:'Desain modular yang mudah dikembangkan. Tim dapat mempresentasikan perusahaan dengan lebih percaya diri.' },
  { type:'img',  img:p7 },

  { type:'img',  img:p8 },
  { type:'img',  img:p9 },
]

export default function Portfolio(){
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal semua card saat masuk viewport
      gsap.utils.toArray<HTMLElement>('.p-card').forEach((card) => {
        gsap.from(card, {
          y: 24, opacity: 0,
          duration: .7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        })
      })

      // Ken-Burns in-view untuk gambar
      gsap.utils.toArray<HTMLElement>('.p-card.p-img').forEach((card) => {
        const img = card.querySelector('img')
        if (!img) return
        gsap.fromTo(img,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        )
      })

      // Stagger isi text card
      gsap.utils.toArray<HTMLElement>('.p-card .p-text').forEach((box) => {
        const kids = Array.from(box.children)
        gsap.from(kids, {
          y: 14, opacity: 0,
          duration: .5, ease: 'power2.out', stagger: .08,
          scrollTrigger: { trigger: box, start: 'top 90%' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="portfolio" id="work" ref={ref} aria-label="Portfolio CodifyHub">
      <div className="container">
        <div className="p-header">
          <div>
            <h2>PORTFOLIO</h2>
            <p>Kami telah berpengalaman menyelesaikan kebutuhan website, branding, dan digital marketing Anda.</p>
          </div>
          <a href="#contact" className="p-cta">Selengkapnya</a>
        </div>

        <div className="p-columns">
          {entries.map((item, i) => (
            <div className="p-item" key={i}>
              {item.type === 'img' ? (
                <article className="p-card p-img">
                  <figure className="p-figure">
                    <img className="kb" src={item.img} alt={item.title || `Portfolio ${i+1}`} loading="lazy" />
                  </figure>
                </article>
              ) : (
                <article className="p-card">
                  <div className="p-text">
                    {item.tag && <p className="p-tag">{item.tag}</p>}
                    {item.title && <h3 className="p-title">{item.title}</h3>}
                    {item.desc && <p className="p-desc">{item.desc}</p>}
                  </div>
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
