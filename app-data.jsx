/* ============================================================
   PETS COMPANY — shared data, helpers, atoms
   Exposes everything to window for other babel scripts.
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Brand constants ---------- */
const BRAND = {
  phone: "(31) 3396-9433",
  phoneRaw: "+553133969433",
  whatsapp: "https://api.whatsapp.com/message/34NL4KF2YBWBA1?autoload=1&app_absent=0&utm_source=ig",
  instagram: "https://www.instagram.com/petscompanycabral/",
  address: {
    line1: "Alameda dos Sabiás, 665 — Sobreloja",
    line2: "Cabral · Contagem — MG",
    zip: "32146-024 · Brasil",
  },
};

/* Build a pre-filled WhatsApp message and open the chat */
function openWhatsApp(extra) {
  const base =
    "Olá! Gostaria de falar com a equipe da PETS COMPANY." +
    (extra ? "\n\n" + extra : "");
  // The supplied link is a click-to-chat shortlink that doesn't accept ?text,
  // so we open it directly; the message is shown to guide the user.
  window.open(BRAND.whatsapp, "_blank", "noopener");
  return base;
}

function openAppointment({ nome, telefone, servico, taxidog }) {
  // Compose the message per the brief (used as the visible confirmation).
  let msg = "Olá!\n";
  if (nome) msg += `Meu nome é ${nome}.\n`;
  if (telefone) msg += `Meu telefone é ${telefone}.\n`;
  msg += `\nGostaria de agendar:\n${servico || "Consulta Veterinária"}`;
  if (taxidog) msg += "\n\nTambém gostaria de utilizar o serviço TaxiDog.";
  msg += "\n\nObrigado!";
  window.open(BRAND.whatsapp, "_blank", "noopener");
  return msg;
}

/* ---------- Icons (simple stroke set) ---------- */
function Icon({ name, ...rest }) {
  const P = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    whatsapp: <path fill="currentColor" stroke="none" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.05 20.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.25 3.74.59.26 1.05.41 1.42.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    heart: <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    sparkles: <path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4L12 3ZM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />,
    stethoscope: <><path d="M5 3v5a4 4 0 0 0 8 0V3" /><path d="M9 13v2a5 5 0 0 0 10 0v-1" /><circle cx="19" cy="11" r="2" /></>,
    syringe: <><path d="m18 2 4 4" /><path d="m17 7 3-3" /><path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-1.7.7H5l-2 2" /><path d="m9 11 4 4" /><path d="m12 8 4 4" /></>,
    scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.1 15.9M14.5 12.5 20 18M8.1 8.1 12 12" /></>,
    flask: <><path d="M9 3h6M10 3v6.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3" /><path d="M8 14h8" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    van: <><path d="M2 16V7a1 1 0 0 1 1-1h11v10M14 8h4l3 4v4h-3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /><path d="M9 18h6" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    star: <path fill="currentColor" stroke="none" d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    paw: <><circle cx="7.5" cy="9" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="7.4" r="1.7" fill="currentColor" stroke="none"/><circle cx="16.5" cy="9" r="1.6" fill="currentColor" stroke="none"/><path fill="currentColor" stroke="none" d="M12 11.5c-2.3 0-4.2 1.7-4.2 3.7 0 1.5 1.2 2.3 2.6 2.3.7 0 1.1-.3 1.6-.3s.9.3 1.6.3c1.4 0 2.6-.8 2.6-2.3 0-2-1.9-3.7-4.2-3.7Z"/></>,
    home: <path d="M3 11l9-8 9 8M5 9.5V21h14V9.5" />,
    truck: <><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
    bag: <path d="M6 8h12l1 12H5L6 8ZM9 8a3 3 0 0 1 6 0" />,
    route: <><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.4 18.5H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.6"/></>,
    quote: <path fill="currentColor" stroke="none" d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6a3 3 0 0 1 3-3V7Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-4a3 3 0 0 1 3-3V7Z"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    up: <path d="m6 14 6-6 6 6" />,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...P} {...rest}>
      {paths[name]}
    </svg>
  );
}

/* ---------- Photo (stock image with branded fallback) ---------- */
function Photo({ src, alt, label, className = "", style, eager }) {
  const ref = useRef(null);
  return (
    <div className={"photo " + className} style={style}>
      <img
        src={src}
        alt={alt || ""}
        loading={eager ? "eager" : "lazy"}
        onError={(e) => { e.currentTarget.parentNode.classList.add("failed"); }}
      />
      <div className="ph-fallback">
        <Icon name="paw" width="34" height="34" />
        <span>{label || "foto"}</span>
      </div>
    </div>
  );
}

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "", as = "div", style, ...rest }) {
  const ref = useReveal();
  const El = as;
  return (
    <El ref={ref} className={"reveal " + className} style={{ "--reveal-delay": delay + "ms", ...style }} {...rest}>
      {children}
    </El>
  );
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "", prefix = "", duration = 1600, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !started.current) {
          started.current = true;
          if (reduce) { setVal(to); return; }
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("pt-BR");
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ---------- Stock photo URLs (Unsplash, with graceful fallback) ---------- */
const PHOTOS = {
  heroDog: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1100&q=80&auto=format&fit=crop",
  heroCat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&q=80&auto=format&fit=crop",
  collie: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1000&q=80&auto=format&fit=crop",
  vetCare: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1000&q=80&auto=format&fit=crop",
  puppy: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=900&q=80&auto=format&fit=crop",
  kitten: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=900&q=80&auto=format&fit=crop",
  grooming: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=900&q=80&auto=format&fit=crop",
  catGreen: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=900&q=80&auto=format&fit=crop",
  goldenSmile: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&q=80&auto=format&fit=crop",
  preventionDog: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1000&q=80&auto=format&fit=crop",
  person1: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
  person2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
  person3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
  person4: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop",
};

Object.assign(window, {
  BRAND, openWhatsApp, openAppointment,
  Icon, Photo, Reveal, useReveal, Counter, PHOTOS,
});
