/* ============================================================
   PETS COMPANY — Bottom sections
   Testimonials · Location · Final CTA · Footer · Floating UI
   ============================================================ */

/* ------------------------------------------------------------
   TESTIMONIALS  (carousel)
   ------------------------------------------------------------ */
const REVIEWS = [
  { name: "Mariana Alves", pet: "tutora do Thor", photo: "person2",
    text: "Levei meu cãozinho às 3h da manhã numa emergência e fui atendida na hora. Equipe atenciosa e cuidadosa. Salvaram meu Thor!" },
  { name: "Rafael Souza", pet: "tutor da Mel", photo: "person1",
    text: "O TaxiDog mudou a minha rotina. Buscam e trazem a Mel com todo cuidado. Pontuais e super carinhosos com ela." },
  { name: "Camila Ribeiro", pet: "tutora da Nina", photo: "person3",
    text: "Estrutura impecável e profissionais que realmente amam animais. Faço todos os check-ups da Nina aqui. Recomendo de olhos fechados." },
  { name: "Diego Martins", pet: "tutor do Bóris", photo: "person4",
    text: "Banho e tosa premium de verdade. O Bóris volta cheiroso e relaxado. Atendimento humano do começo ao fim." },
  { name: "Patrícia Lima", pet: "tutora da Lola", photo: "person2",
    text: "Atendimento 24h faz toda diferença. Sempre que precisei, a Pets Company estava de portas abertas. Gratidão enorme!" },
];

function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={n + " de 5 estrelas"}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" width="17" height="17" className={i < n ? "" : "off"} />
      ))}
    </span>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const go = (d) => setIdx((i) => (i + d + REVIEWS.length) % REVIEWS.length);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5500);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section testi-section" id="depoimentos">
      <div className="container center">
        <Reveal as="span" className="eyebrow">Depoimentos</Reveal>
        <Reveal as="h2" className="section-title" delay={60}>Quem confia, recomenda</Reveal>
        <Reveal as="p" className="section-lead" delay={120}>
          A confiança de milhares de famílias que escolhem a Pets Company para cuidar de quem amam.
        </Reveal>
      </div>
      <Reveal className="container testi-wrap">
        <button className="testi-nav prev" aria-label="Anterior" onClick={() => go(-1)}><Icon name="chevron" /></button>
        <div className="testi-viewport">
          <div className="testi-track" ref={trackRef} style={{ transform: `translateX(-${idx * 100}%)` }}>
            {REVIEWS.map((r, i) => (
              <article className="testi-card" key={i}>
                <span className="testi-quote"><Icon name="quote" width="34" height="34" /></span>
                <Stars n={5} />
                <p>{r.text}</p>
                <div className="testi-author">
                  <Photo src={PHOTOS[r.photo]} label="tutor" className="testi-ava" alt="" />
                  <div><strong>{r.name}</strong><em>{r.pet}</em></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <button className="testi-nav next" aria-label="Próximo" onClick={() => go(1)}><Icon name="chevron" /></button>
      </Reveal>
      <div className="testi-dots">
        {REVIEWS.map((_, i) => (
          <button key={i} className={i === idx ? "on" : ""} aria-label={"Depoimento " + (i + 1)} onClick={() => setIdx(i)} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   LOCATION
   ------------------------------------------------------------ */
function Location() {
  return (
    <section className="section location-section" id="local">
      <div className="container loc-grid">
        <div className="loc-copy">
          <Reveal as="span" className="eyebrow">Onde estamos</Reveal>
          <Reveal as="h2" className="section-title" delay={60}>Venha nos visitar</Reveal>
          <Reveal as="div" className="loc-address" delay={120}>
            <span className="la-ic"><Icon name="pin" width="22" height="22" /></span>
            <div>
              <strong>{BRAND.address.line1}</strong>
              <span>{BRAND.address.line2}</span>
              <span>{BRAND.address.zip}</span>
            </div>
          </Reveal>
          <Reveal as="div" className="loc-rows" delay={160}>
            <a href={"tel:" + BRAND.phoneRaw}><span className="lr-ic"><Icon name="phone" width="18" height="18" /></span>{BRAND.phone}</a>
            <span><span className="lr-ic"><Icon name="clock" width="18" height="18" /></span>Aberto 24 horas · todos os dias</span>
          </Reveal>
          <Reveal className="loc-ctas" delay={200}>
            <a className="btn btn-navy" href="https://www.google.com/maps/search/?api=1&query=Alameda+dos+Sabias+665+Cabral+Contagem+MG" target="_blank" rel="noopener">
              <Icon name="pin" /> Como chegar
            </a>
            <a className="btn btn-ghost" href={"tel:" + BRAND.phoneRaw}>
              <Icon name="phone" /> Ligar agora
            </a>
          </Reveal>
        </div>

        <Reveal className="loc-map" delay={120}>
          <div className="map-stylized">
            <div className="map-grid-lines" />
            <span className="map-road r1" /><span className="map-road r2" /><span className="map-road r3 v" /><span className="map-road r4 v" />
            <span className="map-block b1" /><span className="map-block b2" /><span className="map-block b3" /><span className="map-block b4" />
            <span className="map-pin">
              <span className="mp-pulse" />
              <span className="mp-dot"><Icon name="pin" width="22" height="22" /></span>
            </span>
            <div className="map-card">
              <span className="mc-mark"><img src="assets/logo-mark.png" alt="" /></span>
              <div><strong>PETS COMPANY</strong><em>Cabral · Contagem — MG</em></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   FINAL CTA
   ------------------------------------------------------------ */
function FinalCTA() {
  return (
    <section className="section final-cta" id="contato">
      <div className="paw-field" />
      <div className="fc-orbs"><span /><span /></div>
      <div className="container center fc-inner">
        <Reveal as="span" className="eyebrow on-navy">Estamos prontos para cuidar</Reveal>
        <Reveal as="h2" className="fc-title" delay={60}>Seu pet merece o melhor cuidado</Reveal>
        <Reveal as="p" className="section-lead" style={{ color: "rgba(255,255,255,.82)" }} delay={120}>
          Fale agora com a nossa equipe e agende um atendimento em poucos segundos.
        </Reveal>
        <Reveal className="fc-btns" delay={180}>
          <button className="btn btn-wa btn-lg" onClick={() => openWhatsApp()}>
            <Icon name="whatsapp" /> Agendar pelo WhatsApp
          </button>
          <button className="btn btn-gold btn-lg" onClick={() => openWhatsApp("Gostaria de solicitar o serviço TaxiDog.")}>
            <Icon name="van" /> Solicitar TaxiDog
          </button>
          <a className="btn btn-ghost on-navy btn-lg" href={"tel:" + BRAND.phoneRaw}>
            <Icon name="phone" /> Ligar agora
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   FOOTER
   ------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="ft-brand">
          <a href="#top" className="ft-logo">
            <span className="hdr-mark"><img src="assets/logo-mark.png" alt="" /></span>
            <span className="hdr-word"><strong>PETS COMPANY</strong><em>Clínica Veterinária e Pet Shop</em></span>
          </a>
          <p>Cuidado veterinário 24 horas, banho &amp; tosa e o exclusivo TaxiDog em Contagem — MG. Porque seu pet é da família.</p>
          <div className="ft-social">
            <a href={BRAND.instagram} target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <button onClick={() => openWhatsApp()} aria-label="WhatsApp"><Icon name="whatsapp" width="20" height="20" /></button>
            <a href={"tel:" + BRAND.phoneRaw} aria-label="Telefone"><Icon name="phone" width="20" height="20" /></a>
          </div>
        </div>
        <div className="ft-col">
          <h4>Serviços</h4>
          <a href="#servicos">Consultas</a>
          <a href="#servicos">Emergência 24h</a>
          <a href="#servicos">Banho &amp; Tosa</a>
          <a href="#servicos">Vacinação &amp; Exames</a>
          <a href="#taxidog">TaxiDog</a>
        </div>
        <div className="ft-col">
          <h4>Navegação</h4>
          <a href="#top">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#local">Localização</a>
          <a href="#agendar">Agendar</a>
        </div>
        <div className="ft-col ft-contact">
          <h4>Contato</h4>
          <p><Icon name="pin" width="16" height="16" /> {BRAND.address.line1}<br /><span>{BRAND.address.line2} · {BRAND.address.zip}</span></p>
          <a href={"tel:" + BRAND.phoneRaw}><Icon name="phone" width="16" height="16" /> {BRAND.phone}</a>
          <p><Icon name="clock" width="16" height="16" /> Aberto 24 horas, todos os dias</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} PETS COMPANY · Clínica Veterinária e Pet Shop</span>
        <span>Feito com <Icon name="heart" width="14" height="14" /> para quem ama os animais</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------
   FLOATING ELEMENTS
   ------------------------------------------------------------ */
function Floating() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="floaters">
        <button className={"f-top" + (top ? " show" : "")} aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Icon name="up" />
        </button>
        <a className="f-call" href={"tel:" + BRAND.phoneRaw} aria-label="Ligar"><Icon name="phone" /></a>
        <button className="f-wa" onClick={() => openWhatsApp()} aria-label="WhatsApp">
          <Icon name="whatsapp" />
          <span className="f-wa-label">Fale conosco</span>
        </button>
      </div>
      {/* mobile sticky CTA bar */}
      <div className="mobile-cta">
        <a href={"tel:" + BRAND.phoneRaw} className="mc-call"><Icon name="phone" width="20" height="20" /> Ligar</a>
        <button className="mc-wa" onClick={() => openWhatsApp()}><Icon name="whatsapp" width="20" height="20" /> Agendar no WhatsApp</button>
      </div>
    </>
  );
}

Object.assign(window, { Testimonials, Location, FinalCTA, Footer, Floating });
