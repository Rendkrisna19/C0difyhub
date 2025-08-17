import { FaInstagram, FaTiktok, FaLinkedinIn } from 'react-icons/fa'
import logo from '../assets/kabinet.png' // pastikan path benar (pakai alias @ kalau sudah diset)

export default function Footer({
  // set "variant='green'" untuk tampilan hijau seperti contoh
  variant = 'blue',    // 'blue' | 'green'
  email   = 'cs@codifyhub.co.id',
  phone   = '+62 822-7537-3233',
  badgeSrc = '/badges/kominfo.png' // taruh file opsional di public/badges/kominfo.png
}){
  const style =
    variant === 'green'
      ? { '--footer-bg':'#11A97E', '--footer-bg-2':'#0E8E6C' } // hijau mirip screenshot
      : { '--footer-bg':'#0F1E47', '--footer-bg-2':'#0C1838' } // biru CodifyHub

  return (
    <footer className="footer" style={style} aria-labelledby="footer-title">
      <div className="container">
        <div className="fgrid">
          {/* Brand + description */}
          <div className="f-col f-brand">
            <a href="#home" className="logo">
              <img src={logo} alt="CodifyHub" />
              <span>CodifyHub</span>
            </a>
            <p>
              Solusi pembuatan website dan sistem yang <strong>cepat</strong>, <strong>modern</strong>,
              dan <strong>mudah dikembangkan</strong>. Kami memegang prinsip: build yang rapi,
              performa tinggi, dan animasi yang terasa hidup.
            </p>
            <p>
              Tim kami melayani kebutuhan branding, landing page,
              company profile, e-commerce ringan, hingga dashboard kustom.
            </p>
          </div>

          {/* Kolom link 1 */}
          <div className="f-col">
            <h4 id="footer-title">CODIFYHUB</h4>
            <ul>
              <li><a href="#about">Tentang Kami</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#services">Layanan</a></li>
              <li><a href="#news">Berita Terkini</a></li>
              <li><a href="#work">Artikel & Studi Kasus</a></li>
            </ul>
          </div>

          {/* Kolom link 2 */}
          <div className="f-col">
            <h4>PRODUK</h4>
            <ul>
              <li><a href="#services">Website</a></li>
              <li><a href="#services">Branding</a></li>
              <li><a href="#services">Ads & Tracking</a></li>
              <li><a href="#work">Portofolio</a></li>
            </ul>
          </div>

          {/* Contact + sosmed */}
          <div className="f-col f-contact">
            <h4>HUBUNGI KAMI</h4>
            <div className="muted">{email}</div>
            <a className="item" href="tel:+6282275373233">+62 822-7537-3233</a>

            <div className="f-social" aria-label="Sosial media">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok size={16} /></a>
            </div>

            {/* Badge opsional */}
            <div className="f-badge">
              <img src={badgeSrc} alt="Badge legal/sertifikasi" onError={(e)=>{e.currentTarget.style.display='none'}}/>
            </div>
          </div>
        </div>

        <div className="f-bottom">
          <div>© {new Date().getFullYear()} CodifyHub. All rights reserved.</div>
          <div>Made with React + Vite · GSAP · Embla</div>
        </div>
      </div>
    </footer>
  )
}
