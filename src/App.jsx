import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'
import AboutUs from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Client from './components/Clients'
import WhatsappWidget from './components/WhatsappWidget'
import News from './components/News'
import SystemCTA from './components/SystemCTA'
import Footer from './components/Footer'

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
      <SystemCTA
        image="/cta/system.jpg"                 // path gambar real kamu
        title="KAMI JUGA MENYEDIAKAN LAYANAN PEMBUATAN SISTEM SESUAI KEBUTUHAN ANDA"
        buttonText="CodifyHub.co.id"
        buttonHref="https://codifyhub.co.id"
      />
      <Footer />
      <WhatsappWidget
        phone="6282275373233"
        message="Halo CodifyHub, saya mau konsultasi pembuatan website."
      />
    </>
  )
}
