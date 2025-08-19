import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin)

export default function Hero(){
  const scope = useRef(null)
  const TITLE = 'Bangun Website Premium Bersama CodifyHub'

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // BG motion
      gsap.utils.toArray('.dot').forEach((d, i) => {
        gsap.set(d, { top: 80 + (i % 6) * 70, left: 40 + Math.floor(i / 6) * 140 })
      })
      gsap.to('.dot', { autoAlpha:.15, duration:1.6, ease:'sine.inOut', repeat:-1, yoyo:true, stagger:.06 })
      gsap.to('.beam', { x:'+=180', duration:14, ease:'none', repeat:-1, yoyo:true })
      gsap.to('.device', { y:-10, rotation:-2, duration:2.8, ease:'sine.inOut', repeat:-1, yoyo:true })

      // Headline typing loop
      const chars = gsap.utils.toArray('.typing-char')
      const resetChars = () => gsap.set(chars, { opacity:0, y:6, filter:'blur(2px)' })
      const play = () => {
        resetChars()
        gsap.timeline()
          .to(chars, { opacity:1, y:0, filter:'blur(0px)', duration:0.04, stagger:0.045, ease:'none' })
          .to({}, { duration:1 })
          .to([...chars].reverse(), { opacity:0, y:6, filter:'blur(2px)', duration:0.03, stagger:0.04, ease:'none', onComplete:play })
      }
      play()

      // ==== Code in monitor (typing + syntax color + scroll) ====
      const snippets = [
        "/* CodifyHub ⚡ Build fast with React + Vite + GSAP */",
        "import { gsap } from 'gsap'",
        "const brand = 'CodifyHub'",
        "const API = '/api/projects'",
        "async function fetchProjects(){",
        "  const res = await fetch(API)",
        "  const data = await res.json()",
        "  return data.filter(p => p.published)",
        "}",
        "const stack = ['React','Vite','GSAP']",
        "gsap.to('.cta', { y:-2, duration:.6 })",
        "router.get('/health', (_,res)=>res.json({ ok:true }))",
        "console.log(brand, '🚀 ready')",
      ]

      const slots = gsap.utils.toArray('.code-line .code-text')
      const lineHeight = 18
      const screenH = (document.querySelector('.code-screen')?.clientHeight || 160) - 40
      const linesVisible = Math.max(6, Math.floor(screenH / lineHeight))
      let i = 0

      const escapeHtml = (s) => s.replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]) )
      const colorize = (line) => {
        let s = escapeHtml(line)

        // comments dulu
        s = s.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/g, '<span class="tok-cm">$1</span>')

        // strings & template
        s = s.replace(/(`[^`]*`|'[^']*'|"[^"]*")/g, '<span class="tok-str">$1</span>')

        // numbers
        s = s.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="tok-num">$1</span>')

        // keywords
        s = s.replace(/\b(import|from|const|let|var|function|async|await|return|export|new|class|if|else|true|false|null|undefined)\b/g, '<span class="tok-kw">$1</span>')

        // functions (identifier followed by ()
        s = s.replace(/(?<![\w$])(\/?)([A-Za-z_]\w*)(?=\s*\()/g, '$1<span class="tok-fn">$2</span>')

        // brand
        s = s.replace(/\bCodifyHub\b/g, '<span class="tok-brand">CodifyHub</span>')

        // operators
        s = s.replace(/([=:+\-*/{}()[\],.<>])/g, '<span class="tok-op">$1</span>')

        return s
      }

      const typeNext = () => {
        const slotEl = /** @type {HTMLElement} */ (slots[i % slots.length])
        const text = snippets[i % snippets.length]
        if (!slotEl) return
        gsap.set(slotEl, { text: '' })

        const dur = Math.min(1.6, Math.max(0.6, 0.03 * text.length))
        gsap.to(slotEl, {
          text,
          duration: dur, ease: 'none',
          onComplete: () => {
            // ganti ke HTML berwarna
            slotEl.innerHTML = colorize(text)

            i++
            if (i > linesVisible) {
              gsap.to('.code-scroll', { y: -(i - linesVisible) * lineHeight, duration:.45, ease:'power1.out' })
            }
            // pindah caret
            const carets = gsap.utils.toArray('.code-caret')
            carets.forEach(el => { if (el && el.style) el.style.display = 'none' })
            const caretOf = slotEl.nextElementSibling
            if (caretOf && caretOf.style) caretOf.style.display = 'inline-block'

            typeNext()
          }
        })
      }
      typeNext()
    }, scope)
    return () => ctx.revert()
  }, [])

  const renderTitle = () =>
    Array.from(TITLE).map((ch, i) => (
      <span key={i} className="typing-char">{ch === ' ' ? '\u00A0' : ch}</span>
    ))

  const renderCodeLines = () =>
    Array.from({ length: 60 }).map((_, i) => (
      <div className="code-line" key={i}>
        <span className="code-gutter">{String(i + 1).padStart(2, '0')}</span>
        <span className="code-text"></span>
        <span className="code-caret" style={{ display: i === 0 ? 'inline-block' : 'none' }} />
      </div>
    ))

  return (
    <section className="hero" id="home" ref={scope} aria-label="CodifyHub Hero">
      {/* background halus */}
      <div className="beam" style={{
        top:120, left:0, width:280, height:2, position:'absolute',
        background:'linear-gradient(90deg, rgba(29,62,138,0) 0%, rgba(29,62,138,.35) 50%, rgba(29,62,138,0) 100%)',
        opacity:.5
      }}/>
      {Array.from({length:24}).map((_,i)=><div key={i} className="dot" style={{position:'absolute'}} />)}

      <div className="hero-grid">
        <div>
          <h1 className="hero-title type-row" aria-label={TITLE}>
            {renderTitle()} <span className="caret" aria-hidden="true" />
          </h1>
          <p className="hero-sub">Website kencang, modern, dan interaktif untuk bisnis Anda.</p>
          <div className="cta">
            <a href="#contact" className="btn primary">Diskusi Project Sekarang</a>
            <a href="#work" className="btn">Lihat Portofolio</a>
          </div>
        </div>

        {/* Device dengan layar kode */}
        <div className="device-wrap">
          <div className="device">
            <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#1D3E8A"/><stop offset="100%" stopColor="#2B5AC8"/>
                </linearGradient>
                <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(20,30,60,.25)"/>
                </filter>
              </defs>
              <rect x="80" y="60" rx="18" ry="18" width="480" height="300" fill="#0F172A" stroke="#E9ECF3" strokeWidth="6" filter="url(#shadow)"/>
              <rect x="110" y="90" width="180" height="20" rx="8" fill="url(#g1)"/>
              <rect x="110" y="120" width="420" height="12" rx="6" fill="#1f2937" opacity=".4"/>
              <rect x="110" y="150" width="420" height="12" rx="6" fill="#1f2937" opacity=".35"/>
              <rect x="110" y="180" width="320" height="12" rx="6" fill="#1f2937" opacity=".3"/>
              <rect x="110" y="210" width="260" height="120" rx="12" fill="url(#g1)" opacity=".85"/>
              <rect x="300" y="360" width="40" height="40" rx="8" fill="#e5e7eb"/>
              <rect x="160" y="400" width="320" height="18" rx="9" fill="#e5e7eb"/>
            </svg>

            {/* overlay layar */}
            <div className="code-screen">
              <div className="code-chip">codifyhub</div>
              <div className="code-scroll">{renderCodeLines()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 