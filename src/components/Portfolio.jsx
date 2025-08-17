import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/**
 * Ganti konten di bawah sesuai proyekmu.
 * Untuk "img", pakai path dari public/portfolio/*.jpg
 */
const entries = [
  // kolom akan otomatis terbagi; urutan sesuai array ini
  { type:'text', tag:'PORTFOLIO', title:'Kami telah berpengalaman', desc:'Menyelesaikan kebutuhan website, branding, dan digital marketing Anda.' },
  { type:'img',  img:'/portfolio/1.jpg' },

  { type:'img',  img:'/portfolio/2.jpg' },
  { type:'text', tag:'META ADS EROPA MOTOR', title:'Lead meningkat signifikan',
    desc:'Dengan fokus pada audien yang tepat, CPA turun dan jangkauan meningkat. Funnel yang rapi memastikan konversi & pertumbuhan bisnis.' },

  { type:'img',  img:'/portfolio/3.jpg' },
  { type:'text', tag:'INSTAGRAM @DAPRA.ID', title:'Konten elegan & konsisten',
    desc:'Tone emosional untuk audience kebersihan, menekankan kenyamanan, efisiensi, serta kualitas layanan. Hasil: engagement tinggi.' },

  { type:'text', tag:'INSTAGRAM @DELAVAL.ID', title:'Konten premium klinik',
    desc:'Narasi berkelas untuk produk dan layanan kecantikan premium. Hasil: impresi & interaksi naik, brand positioning lebih kuat.' },
  { type:'img',  img:'/portfolio/4.jpg' },

  { type:'text', tag:'SEM MULIASERVICE', title:'Search intent → konversi',
    desc:'Kampanye kata kunci bernilai tinggi & landing yang dioptimasi. Kepercayaan meningkat dan lead organik stabil.' },
  { type:'img',  img:'/portfolio/5.jpg' },

  { type:'text', tag:'WEBSITE ANTARALOGISTIC.COM', title:'Informasi padat & cepat',
    desc:'Optimasi arsitektur konten + pelacakan analitik. Pengalaman pengguna meningkat, bounce turun, lead bertambah.' },
  { type:'img',  img:'/portfolio/6.jpg' },

  { type:'text', tag:'WEBSITE ELKA JAYA MANDIRI', title:'Company profile modern',
    desc:'Desain modular yang mudah dikembangkan. Tim dapat mempresentasikan perusahaan dengan lebih percaya diri.' },
  { type:'img',  img:'/portfolio/7.jpg' },

  // tambah lagi sesuai kebutuhan…
  { type:'img',  img:'/portfolio/8.jpg' },
  { type:'img',  img:'/portfolio/9.jpg' },
]

export default function Portfolio(){
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.p-item').forEach((el) => {
        gsap.from(el, {
          y: 20, opacity: 0, duration: .6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
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
                  <img src={item.img} alt={item.title || `Portfolio ${i+1}`} loading="lazy" />
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
