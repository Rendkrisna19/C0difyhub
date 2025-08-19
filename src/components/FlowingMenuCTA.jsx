// src/components/FlowingMenuCTA.jsx
import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FlowingMenuCTA({
  eyebrow = 'CodifyHub',
  title = 'Kami membangun',
  highlight = 'Aplikasi Web',
  subtitle = 'Cepat, modern, SEO-ready, dan scalable.',
  ctaText = 'CodifyHub.co.id',
  ctaHref = '#',
  items = ['MOJAVE', 'SONOMA', 'MONTEREY', 'VENTURA', 'SEQUOIA', 'SIERRA'],
}) {
  const wrapRef = useRef(null);
  const [rowH, setRowH] = useState(88);
  const mouseY = useMotionValue(-9999);
  const y = useSpring(mouseY, { stiffness: 220, damping: 26, mass: 0.2 });

  // hitung tinggi tiap bar agar responsif
  useLayoutEffect(() => {
    const calc = () => {
      if (!wrapRef.current) return;
      const h = wrapRef.current.getBoundingClientRect().height;
      setRowH(h / items.length);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [items.length]);

  // posisi pointer relatif container
  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseY.set(e.clientY - r.top);
  };
  const onTouchMove = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseY.set(t.clientY - r.top);
  };
  const onLeave = () => mouseY.set(-9999);

  // style per bar (ala React Bits flowing)
  const makeStyles = (i) => {
    const center = (i + 0.5) * rowH;
    const dist = useTransform(y, (v) => Math.abs(v - center));

    const scaleY = useTransform(dist, [0, rowH * 1.2, rowH * 3], [1.12, 1.04, 1]);
    const bg = useTransform(dist, [0, rowH * 2.2], ['rgba(43,90,200,.18)', 'rgba(43,90,200,0)']);
    const shadow = useTransform(
      dist,
      [0, rowH * 2],
      ['0 18px 42px rgba(29,62,138,.28)', '0 6px 14px rgba(16,24,40,.06)']
    );
    const shift = useTransform(dist, [0, rowH * 2.2], [8, 0]);

    return { scaleY, background: bg, boxShadow: shadow, x: shift };
  };

  return (
    <section className="flowmenu-cta" aria-label="Flowing Menu CTA">
      <div className="container">
        <div className="fm-head">
          <p className="fm-eyebrow">{eyebrow}</p>
          <h2 className="fm-title">
            {title} <br />
            <span className="fm-highlight">{highlight}</span>
          </h2>
          {subtitle && <p className="fm-sub">{subtitle}</p>}
          <a className="fm-btn" href={ctaHref} target="_blank" rel="noreferrer">
            {ctaText}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div
          className="flowmenu"
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onLeave}
        >
          {items.map((label, i) => {
            const s = makeStyles(i);
            return (
              <motion.div key={label} className="fm-row" style={s}>
                <span>{label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
