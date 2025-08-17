export default function SystemCTA({
  image = '/cta/system.jpg',           // letakkan gambar real di public/cta/system.jpg
  title = 'KAMI JUGA MENYEDIAKAN LAYANAN PEMBUATAN SISTEM SESUAI KEBUTUHAN ANDA',
  buttonText = 'Kunjungi CodifyHub',
  buttonHref = '#'
}){
  return (
    <section className="system-cta" aria-label="Custom System CTA">
      <div className="container">
        <div className="cta-grid">
          {/* Kiri: gambar REAL (bukan icon) */}
          <figure className="cta-illus">
            <img src={image} alt="Ilustrasi layanan pembuatan sistem" loading="lazy" />
          </figure>

          {/* Kanan: judul + tombol */}
          <div className="cta-content">
            <h2>{title}</h2>
            <a className="cta-button" href={buttonHref} target="_blank" rel="noreferrer">
              {buttonText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
