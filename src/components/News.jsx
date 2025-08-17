import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

/**
 * Siapkan gambar di public/news/1.jpg ... 6.jpg
 * Ganti judul/deskripsi/link sesuai kebutuhan.
 */
const posts = [
  {
    img: '/news/1.jpg',
    title: 'Dorong Pertumbuhan Bisnis dengan Teknologi',
    excerpt: 'Di era transformasi digital, TI berevolusi jadi pilar operasional dan pertumbuhan.',
    href: '#'
  },
  {
    img: '/news/2.jpg',
    title: 'HTTPS Lebih Aman untuk Website Anda? Cek Dulu Faktanya',
    excerpt: 'Peretasan makin marak. HTTPS dan praktik keamanan web jadi wajib.',
    href: '#'
  },
  {
    img: '/news/3.jpg',
    title: 'CV Nore Inovasi Resmi Pindah Kantor',
    excerpt: 'Pengumuman perpindahan kantor, layanan tetap berjalan seperti biasa.',
    href: '#'
  },
  {
    img: '/news/4.jpg',
    title: 'Tips Landing Page yang Mengonversi',
    excerpt: 'Struktur hero, social proof, dan CTA yang jelas menaikkan konversi.',
    href: '#'
  },
  {
    img: '/news/5.jpg',
    title: 'Performance Matters: React + Vite',
    excerpt: 'Stack ringan bikin TTFB & LCP cepat, SEO dan UX ikut naik.',
    href: '#'
  },
  {
    img: '/news/6.jpg',
    title: 'Branding Digital yang Konsisten',
    excerpt: 'Guideline visual memperkuat ingatan merek dan kepercayaan.',
    href: '#'
  },
]

export default function News(){
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false }, [autoplay.current])
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)

  useEffect(() => {
    if (!embla) return
    const onSelect = () => {
      setPrevDisabled(!embla.canScrollPrev())
      setNextDisabled(!embla.canScrollNext())
    }
    embla.on('select', onSelect)
    onSelect()
  }, [embla])

  return (
    <section className="news" id="news" aria-label="Berita Terkini">
      <div className="container">
        <div className="news-head">
          <h2>BERITA TERKINI</h2>

          {/* Controls muncul di desktop; di mobile tetap ada di atas */}
          <div className="embla__controls">
            <button className="embla__btn" onClick={()=>embla && embla.scrollPrev()} disabled={prevDisabled} aria-label="Sebelumnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="embla__btn" onClick={()=>embla && embla.scrollNext()} disabled={nextDisabled} aria-label="Berikutnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a className="news-more" href="#">Selengkapnya</a>
          </div>
        </div>

        <div className="embla news-carousel" ref={emblaRef}
             onMouseEnter={()=>autoplay.current && autoplay.current.stop()}
             onMouseLeave={()=>autoplay.current && autoplay.current.play()}>
          <div className="embla__container">
            {posts.map((p, i)=>(
              <article className="embla__slide news-card" key={i}>
                <a className="news-img" href={p.href}>
                  <img src={p.img} alt={p.title} loading="lazy" />
                </a>
                <div className="news-body">
                  <h3 className="news-title"><a href={p.href}>{p.title}</a></h3>
                  <p className="news-excerpt">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
