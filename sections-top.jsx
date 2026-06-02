/* ============================================================
   PETS COMPANY — Top sections
   Preloader · Header · Hero (3 variants) · Trust marquee
   ============================================================ */

/* ------------------------------------------------------------
   PRELOADER
   ------------------------------------------------------------ */
function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let p = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 350 : 1500;
    const step = 16;
    const id = setInterval(() => {
      p += (100 / (total / step)) * (0.6 + Math.random() * 0.8);
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => { setHide(true); setTimeout(onDone, 650); }, 320);
      }
      setProgress(Math.min(100, p));
    }, step);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={"preloader" + (hide ? " gone" : "")}>
      <div className="pre-glow" />
      <div className="pre-stack">
        <div className="pre-mark">
          <img src="assets/logo-mark.png" alt="PETS COMPANY" />
          <span className="pre-ring" />
        </div>
        <div className="pre-word">
          <strong>PETS COMPANY</strong>
          <em>Clínica Veterinária · 24 Horas</em>
        </div>
        <div className="pre-bar"><span style={{ width: progress + "%" }} /></div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   HEADER  (sticky floating)
   ------------------------------------------------------------ */
const NAV = [
  ["Início", "#top"],
  ["Serviços", "#servicos"],
  ["TaxiDog", "#taxidog"],
  ["Sobre", "#sobre"],
  ["Depoimentos", "#depoimentos"],
  ["Localização", "#local"],
  ["Contato", "#contato"],
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"hdr" + (scrolled ? " is-scrolled" : "")}>
      <div className="hdr-inner">
        <a href="#top" className="hdr-logo" aria-label="PETS COMPANY — início">
          <span className="hdr-mark"><img src="assets/logo-mark.png" alt="" /></span>
          <span className="hdr-word">
            <strong>PETS COMPANY</strong>
            <em>Clínica Veterinária 24h</em>
          </span>
        </a>
        <nav className="hdr-nav">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="hdr-actions">
          <a className="btn btn-primary hdr-cta" href="#agendar">
            <Icon name="sparkles" /> Agendar Agora
          </a>
          <button className="hdr-burger" aria-label="Menu" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div className={"drawer" + (open ? " open" : "")} onClick={() => setOpen(false)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-top">
            <span className="hdr-word dark">
              <strong>PETS COMPANY</strong>
              <em>Clínica Veterinária 24h</em>
            </span>
            <button className="drawer-x" aria-label="Fechar" onClick={() => setOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <nav className="drawer-nav">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label} <Icon name="chevron" width="18" height="18" />
              </a>
            ))}
          </nav>
          <a className="btn btn-primary btn-block" href="#agendar" onClick={() => setOpen(false)}>
            <Icon name="sparkles" /> Agendar Agora
          </a>
          <button className="btn btn-wa btn-block" onClick={() => { setOpen(false); openWhatsApp(); }}>
            <Icon name="whatsapp" /> WhatsApp
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   HERO  — three switchable variants
   ------------------------------------------------------------ */
const TRUST_ITEMS = [
  ["clock", "Clínica 24h"],
  ["shield", "Emergência"],
  ["scissors", "Banho & Tosa"],
  ["van", "TaxiDog"],
  ["stethoscope", "Equipe Especializada"],
];

function HeroChips() {
  return (
    <div className="hero-chips">
      {TRUST_ITEMS.map(([ic, label]) => (
        <span className="chip" key={label}>
          <Icon name="check" className="chip-check-ic" width="16" height="16" />
          {label}
        </span>
      ))}
    </div>
  );
}

function HeroCTAs() {
  return (
    <div className="hero-ctas">
      <button className="btn btn-wa btn-lg" onClick={() => openWhatsApp()}>
        <Icon name="whatsapp" /> Agendar pelo WhatsApp
      </button>
      <a className="btn btn-ghost btn-lg" href="#agendar">
        Falar com a Equipe <Icon name="arrow" />
      </a>
    </div>
  );
}

function FloatCard({ icon, title, sub, className }) {
  return (
    <div className={"float-card " + (className || "")}>
      <span className="fc-ic"><Icon name={icon} width="20" height="20" /></span>
      <div>
        <strong>{title}</strong>
        <em>{sub}</em>
      </div>
    </div>
  );
}

/* Variant A — Split: text left, photo composition right */
function HeroSplit() {
  return (
    <div className="hero hero-split">
      <div className="hero-copy">
        <Reveal as="span" className="hero-badge">
          <span className="pulse" /> Atendimento 24 horas · Contagem — MG
        </Reveal>
        <Reveal as="h1" className="hero-h1" delay={60}>
          Cuidado veterinário <span className="hl">24 horas</span> para quem faz parte da sua família.
        </Reveal>
        <Reveal as="p" className="hero-lead" delay={120}>
          Conforto, segurança e bem-estar em cada detalhe. Atendimento completo,
          emergências 24h, consultas, exames, banho &amp; tosa e o exclusivo serviço de TaxiDog.
        </Reveal>
        <Reveal delay={180}><HeroCTAs /></Reveal>
        <Reveal delay={240}><HeroChips /></Reveal>
      </div>
      <Reveal className="hero-visual" delay={140}>
        <div className="hv-frame">
          <Photo src={PHOTOS.heroDog} label="cão feliz" className="hv-main" eager alt="Cão feliz" />
          <Photo src={PHOTOS.heroCat} label="gato" className="hv-cat" alt="Gato" />
          <span className="hv-badge"><img src="assets/logo-mark.png" alt="" /></span>
          <FloatCard className="fc-a" icon="clock" title="24h por dia" sub="365 dias no ano" />
          <FloatCard className="fc-b" icon="heart" title="+5.000 pets" sub="atendidos com carinho" />
        </div>
      </Reveal>
    </div>
  );
}

/* Variant B — Centered on navy, photo arc below */
function HeroCentered() {
  return (
    <div className="hero hero-centered">
      <div className="paw-field" />
      <div className="hc-inner">
        <Reveal as="span" className="hero-badge on-dark">
          <span className="pulse" /> Clínica Veterinária · Pet Shop · TaxiDog
        </Reveal>
        <Reveal as="h1" className="hero-h1 big" delay={60}>
          Cuidado veterinário <span className="hl gold">24 horas</span><br />para quem é da família.
        </Reveal>
        <Reveal as="p" className="hero-lead light" delay={120}>
          Conforto, segurança e bem-estar em cada detalhe — emergências 24h, consultas,
          exames, banho &amp; tosa e o exclusivo TaxiDog.
        </Reveal>
        <Reveal delay={180} className="hc-ctas"><HeroCTAs /></Reveal>
        <Reveal delay={260} className="hc-strip">
          {TRUST_ITEMS.map(([ic, label]) => (
            <span className="hc-strip-item" key={label}><Icon name={ic} width="18" height="18" />{label}</span>
          ))}
        </Reveal>
      </div>
      <Reveal className="hc-photos" delay={220}>
        <Photo src={PHOTOS.kitten} label="gato" className="hcp hcp-1" alt="" />
        <Photo src={PHOTOS.heroDog} label="cão feliz" className="hcp hcp-2" eager alt="" />
        <Photo src={PHOTOS.puppy} label="filhote" className="hcp hcp-3" alt="" />
      </Reveal>
    </div>
  );
}

/* Variant C — Bento collage right */
function HeroBento() {
  return (
    <div className="hero hero-bento">
      <div className="hero-copy">
        <Reveal as="span" className="hero-badge">
          <span className="pulse" /> Pronto-atendimento 24h
        </Reveal>
        <Reveal as="h1" className="hero-h1" delay={60}>
          O cuidado que seu pet <span className="hl">merece</span>, a qualquer hora.
        </Reveal>
        <Reveal as="p" className="hero-lead" delay={120}>
          Atendimento veterinário completo com emergências 24 horas, banho &amp; tosa premium
          e o exclusivo TaxiDog que busca e leva seu pet com total segurança.
        </Reveal>
        <Reveal delay={180}><HeroCTAs /></Reveal>
        <Reveal delay={240} className="hero-mini-stats">
          <div><strong>24h</strong><em>todos os dias</em></div>
          <div><strong>+5 mil</strong><em>pets atendidos</em></div>
          <div><strong>4,9★</strong><em>avaliação</em></div>
        </Reveal>
      </div>
      <Reveal className="bento" delay={140}>
        <Photo src={PHOTOS.heroDog} label="cão feliz" className="bn bn-1" eager alt="" />
        <Photo src={PHOTOS.catGreen} label="gato" className="bn bn-2" alt="" />
        <Photo src={PHOTOS.grooming} label="banho & tosa" className="bn bn-3" alt="" />
        <div className="bn bn-cta">
          <span className="bn-mark"><img src="assets/logo-mark.png" alt="" /></span>
          <strong>Emergência<br />24 horas</strong>
          <button className="btn btn-wa" onClick={() => openWhatsApp()}>
            <Icon name="whatsapp" /> Chamar agora
          </button>
        </div>
      </Reveal>
    </div>
  );
}

/* Variant D — Reference: navy stage, pets cutout center, booking form right */
const HF_SERVICES = ["Consulta Veterinária", "Emergência", "Banho & Tosa", "Vacinação", "Exames", "Check-up", "TaxiDog", "Outro"];
const HF_PILLS = [
  ["clock", "Clínica 24h"],
  ["shield", "Emergências"],
  ["van", "Pet Taxi"],
  ["scissors", "Banho & Tosa"],
  ["activity", "Medicina Preventiva"],
];

function HeroFormCard() {
  const [form, setForm] = useState({ nome: "", telefone: "", servico: "", taxidog: true });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); openAppointment({ ...form, servico: form.servico || "Consulta Veterinária" }); };
  return (
    <form className="hf-card" onSubmit={submit}>
      <div className="hf-card-head">
        <span className="hf-card-ic"><Icon name="sparkles" width="20" height="20" /></span>
        <strong>Agende em segundos</strong>
      </div>
      <label className="hf-fld">
        <span>Nome completo</span>
        <input type="text" required placeholder="Digite seu nome" value={form.nome}
          onChange={(e) => set("nome", e.target.value)} />
      </label>
      <label className="hf-fld">
        <span>WhatsApp</span>
        <input type="tel" required placeholder="(31) 9 0000-0000" value={form.telefone}
          onChange={(e) => set("telefone", e.target.value)} />
      </label>
      <label className="hf-fld">
        <span>Serviço desejado</span>
        <div className="hf-select">
          <select value={form.servico} onChange={(e) => set("servico", e.target.value)}>
            <option value="" disabled>Selecione o serviço</option>
            {HF_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Icon name="chevron" width="18" height="18" />
        </div>
      </label>
      <label className={"hf-check" + (form.taxidog ? " on" : "")}>
        <input type="checkbox" checked={form.taxidog} onChange={(e) => set("taxidog", e.target.checked)} />
        <span className="hf-box"><Icon name="check" width="13" height="13" /></span>
        <span>Desejo transporte (busca e retorno) para meu pet.</span>
      </label>
      <button type="submit" className="btn btn-primary btn-block btn-lg hf-submit">
        <Icon name="whatsapp" /> Agendar via WhatsApp
      </button>
      <p className="hf-secure"><Icon name="shield" width="15" height="15" /> Seus dados estão protegidos</p>
    </form>
  );
}

function HeroForm() {
  return (
    <div className="hero hero-form">
      <div className="hf-copy">
        <Reveal as="h1" className="hero-h1 hf-h1">
          <span className="hl gold">24h</span> de cuidado veterinário para quem faz parte da sua família. <Icon name="paw" className="hf-paw" width="42" height="42" />
        </Reveal>
        <Reveal as="p" className="hero-lead light hf-lead" delay={80}>
          Clínica veterinária 24h, emergências, consultas, banho &amp; tosa, exames e o exclusivo
          serviço Pet Taxi, que leva e traz seu pet com segurança e carinho.
        </Reveal>
        <Reveal className="hf-ctas" delay={140}>
          <button className="btn btn-primary btn-lg" onClick={() => openWhatsApp()}>
            <Icon name="whatsapp" /> Agendar pelo WhatsApp
          </button>
          <a className="btn btn-ghost btn-lg on-navy" href={"tel:" + BRAND.phoneRaw}>
            <Icon name="phone" /> Ligar agora
          </a>
        </Reveal>
        <Reveal className="hf-pills" delay={200}>
          {HF_PILLS.map(([ic, label]) => (
            <span className="hf-pill" key={label}>
              <span className="hf-pill-ic"><Icon name={ic} width="20" height="20" /></span>
              {label}
            </span>
          ))}
        </Reveal>
      </div>

      <Reveal className="hf-pets" delay={120}>
        <img src="assets/hero-pets.png" alt="Cão e gato felizes" />
      </Reveal>

      <Reveal className="hf-form-wrap" delay={160}>
        <HeroFormCard />
      </Reveal>
    </div>
  );
}

function Hero({ variant }) {
  if (variant === "form") {
    return (
      <section className="hero-section hv-form" id="top">
        <div className="paw-field" />
        <div className="hero-bg-orbs" aria-hidden="true">
          <span className="orb orb-1" /><span className="orb orb-2" />
        </div>
        <div className="container"><HeroForm /></div>
      </section>
    );
  }
  return (
    <section className={"hero-section hv-" + variant} id="top">
      <div className="hero-bg-orbs" aria-hidden="true">
        <span className="orb orb-1" /><span className="orb orb-2" /><span className="orb orb-3" />
      </div>
      <div className="container">
        {variant === "centered" ? <HeroCentered /> : variant === "bento" ? <HeroBento /> : <HeroSplit />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   TRUST MARQUEE
   ------------------------------------------------------------ */
const MARQUEE = [
  ["clock", "24 Horas"], ["shield", "Emergência"], ["scissors", "Banho & Tosa"],
  ["van", "TaxiDog"], ["syringe", "Vacinação"], ["flask", "Exames"], ["stethoscope", "Consultas"],
];

function TrustMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map(([ic, label], i) => (
          <span className="marquee-item" key={i}>
            <Icon name={ic} width="20" height="20" /> {label}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Preloader, Header, Hero, TrustMarquee });
