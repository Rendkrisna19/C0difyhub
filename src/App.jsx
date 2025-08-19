import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'
import AboutUs from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Client from './components/Clients'
import WhatsappWidget from './components/WhatsappWidget'
import News from './components/News'
import Footer from './components/Footer'
import FlowingMenuCTA from './components/FlowingMenuCTA';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <Portfolio />
      <Client />
      <News />
      <FlowingMenuCTA
        eyebrow="CodifyHub"
        title="Kami membangun"
        highlight="Website & Sistem Kustom"
        subtitle="React + Vite + GSAP • performa tinggi, UX modern, animasi halus."
        ctaText="Chat via WhatsApp"
        ctaHref="https://wa.me/6282275373233?text=Halo%20CodifyHub"
        items={['MURAH', 'BERKUALITAS', 'AMANAH', 'TERPERCAYA', 'CEPAT', 'NYAMAN']}
      />
      <Footer />
      <WhatsappWidget
        phone="6282275373233"
        message="Halo CodifyHub, saya mau konsultasi pembuatan website."
      />
    </>
  )
}
