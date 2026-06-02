/* ============================================================
   PETS COMPANY — Middle sections
   Appointment · Why-us · Services · Pet Táxi · Prevention · Stats
   ============================================================ */

/* ------------------------------------------------------------
   APPOINTMENT CARD
   ------------------------------------------------------------ */
const SERVICES_OPTS = [
  "Consulta Veterinária", "Emergência", "Banho & Tosa", "Vacinação",
  "Exames", "Check-up", "TaxiDog", "Outro",
];

function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Appointment() {
  const [form, setForm] = useState({ nome: "", telefone: "", servico: "Consulta Veterinária", taxidog: false });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    openAppointment(form);
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };
  return (
    <section className="section appt-section" id="agendar">
      <div className="paw-field" />
      <div className="container appt-grid">
        <div className="appt-pitch">
          <Reveal as="span" className="eyebrow on-navy">Agende em segundos</Reveal>
          <Reveal as="h2" className="section-title" style={{ color: "#fff" }} delay={60}>
            Agende o atendimento do seu pet pelo WhatsApp
          </Reveal>
          <Reveal as="p" className="section-lead" style={{ color: "rgba(255,255,255,.8)" }} delay={120}>
            Preencha os dados e enviamos você direto para a nossa equipe. Resposta rápida,
            sem espera, com todo o cuidado que seu melhor amigo merece.
          </Reveal>
          <Reveal className="appt-perks" delay={180}>
            {[["clock", "Resposta em minutos"], ["shield", "Atendimento 24h"], ["van", "TaxiDog disponível"]].map(([ic, t]) => (
              <span key={t}><Icon name={ic} width="18" height="18" /> {t}</span>
            ))}
          </Reveal>
          <Reveal className="appt-phone" delay={240}>
            <a href={"tel:" + BRAND.phoneRaw}><Icon name="phone" width="18" height="18" /> {BRAND.phone}</a>
          </Reveal>
        </div>

        <Reveal className="appt-card" delay={120}>
          <form onSubmit={submit}>
            <div className="appt-card-head">
              <span className="ach-ic"><Icon name="sparkles" width="22" height="22" /></span>
              <div>
                <strong>Solicitar agendamento</strong>
                <em>É gratuito e sem compromisso</em>
              </div>
            </div>

            <label className="fld">
              <span>Nome completo</span>
              <input type="text" required placeholder="Seu nome" value={form.nome}
                onChange={(e) => set("nome", e.target.value)} />
            </label>
            <label className="fld">
              <span>WhatsApp</span>
              <input type="tel" required placeholder="(31) 9 0000-0000" value={form.telefone}
                onChange={(e) => set("telefone", maskPhone(e.target.value))}
                maxLength={16} />
            </label>
            <label className="fld">
              <span>Serviço desejado</span>
              <div className="select-wrap">
                <select value={form.servico} onChange={(e) => set("servico", e.target.value)}>
                  {SERVICES_OPTS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <Icon name="chevron" width="18" height="18" />
              </div>
            </label>

            <label className={"taxi-check" + (form.taxidog ? " on" : "")}>
              <input type="checkbox" checked={form.taxidog}
                onChange={(e) => set("taxidog", e.target.checked)} />
              <span className="tc-box"><Icon name="check" width="14" height="14" /></span>
              <span className="tc-label">
                <Icon name="van" width="20" height="20" />
                Quero utilizar o serviço <strong>TaxiDog</strong>
              </span>
            </label>

            <button type="submit" className="btn btn-wa btn-block btn-lg">
              <Icon name="whatsapp" /> Agendar pelo WhatsApp
            </button>
            <p className={"appt-sent" + (sent ? " show" : "")}>
              <Icon name="check" width="16" height="16" /> Tudo certo! Abrimos o WhatsApp para concluir seu agendamento.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   WHY CHOOSE US
   ------------------------------------------------------------ */
const WHY = [
  ["clock", "Atendimento 24 Horas", "Plantão veterinário todos os dias do ano. Estamos aqui sempre que seu pet precisar."],
  ["stethoscope", "Equipe Especializada", "Veterinários experientes e uma equipe que trata cada animal como se fosse único."],
  ["sparkles", "Estrutura Moderna", "Ambiente equipado, acolhedor e seguro, pensado para o conforto do seu pet."],
  ["scissors", "Banho & Tosa Premium", "Produtos de qualidade e profissionais dedicados para deixar seu pet impecável."],
  ["van", "TaxiDog Exclusivo", "Buscamos e levamos seu pet com conforto e segurança, facilitando sua rotina."],
  ["heart", "Atendimento Humanizado", "Carinho, atenção e respeito em cada etapa — porque amor também é cuidado."],
];

function WhyUs() {
  return (
    <section className="section why-section" id="sobre">
      <div className="container center">
        <Reveal as="span" className="eyebrow">Por que a Pets Company</Reveal>
        <Reveal as="h2" className="section-title" delay={60}>Por que escolher a PETS COMPANY?</Reveal>
        <Reveal as="p" className="section-lead" delay={120}>
          Mais que uma clínica, somos um centro completo de cuidado e bem-estar para o seu melhor amigo.
        </Reveal>
      </div>
      <div className="container">
        <Carousel count={WHY.length} trackClass="why-grid">
          {WHY.map(([ic, title, body], i) => (
            <Reveal className="why-card" key={title} delay={i * 70}>
              <span className="why-ic"><Icon name={ic} width="26" height="26" /></span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="why-no">{String(i + 1).padStart(2, "0")}</span>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SERVICES
   ------------------------------------------------------------ */
const SERVICES = [
  ["stethoscope", "Consultas Veterinárias", "Avaliação completa da saúde do seu pet com diagnóstico preciso."],
  ["shield", "Emergência 24h", "Pronto-atendimento a qualquer hora, todos os dias do ano."],
  ["scissors", "Banho & Tosa", "Higiene e estética com produtos premium e muito carinho."],
  ["syringe", "Vacinação", "Calendário vacinal em dia para proteger seu pet de doenças."],
  ["flask", "Exames", "Laboratoriais e de imagem para um cuidado preventivo e seguro."],
  ["heart", "Check-ups", "Avaliações periódicas que garantem mais saúde e longevidade."],
  ["activity", "Medicina Preventiva", "Acompanhamento contínuo para prevenir antes de tratar."],
  ["clock", "Monitoramento de Saúde", "Internação e observação com cuidado dedicado e atento."],
  ["van", "TaxiDog", "Transporte porta a porta com conforto e total segurança."],
];

function Services() {
  return (
    <section className="section services-section" id="servicos">
      <div className="container center">
        <Reveal as="span" className="eyebrow">Nossos serviços</Reveal>
        <Reveal as="h2" className="section-title" delay={60}>Cuidado completo, do focinho ao rabo</Reveal>
        <Reveal as="p" className="section-lead" delay={120}>
          Tudo o que seu pet precisa em um só lugar — atendimento clínico, estética e transporte.
        </Reveal>
      </div>
      <div className="container">
        <Carousel count={SERVICES.length} trackClass="services-grid">
          {SERVICES.map(([ic, title, body], i) => (
            <Reveal className="svc-card" key={title} delay={(i % 3) * 80}>
              <span className="svc-ic"><Icon name={ic} width="24" height="24" /></span>
              <h3>{title}</h3>
              <p>{body}</p>
              <button className="svc-link" onClick={() => openWhatsApp("Tenho interesse em: " + title)}>
                Saiba mais <Icon name="arrow" width="17" height="17" />
              </button>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   PET TÁXI
   ------------------------------------------------------------ */
const TAXI_BENEFITS = [
  "Busca em domicílio", "Retorno seguro para casa", "Transporte para consultas",
  "Transporte para exames", "Transporte para banho e tosa", "Transporte para vacinação",
  "Equipe treinada",
];

function PetTaxi() {
  return (
    <section className="section taxi-section" id="taxidog">
      <div className="paw-field" />
      <div className="container taxi-grid">
        <div className="taxi-copy">
          <Reveal as="span" className="eyebrow on-navy">Serviço exclusivo</Reveal>
          <Reveal as="h2" className="section-title" style={{ color: "#fff" }} delay={60}>
            TaxiDog <span style={{ color: "var(--gold)" }}>PETS COMPANY</span>
          </Reveal>
          <Reveal as="p" className="taxi-sub" delay={120}>
            Buscamos e levamos seu pet com conforto, segurança e praticidade.
          </Reveal>
          <Reveal as="p" className="section-lead" style={{ color: "rgba(255,255,255,.78)" }} delay={150}>
            O TaxiDog foi criado para facilitar a sua rotina e proporcionar uma experiência mais
            confortável para o seu pet — do portão de casa até a clínica e de volta.
          </Reveal>
          <Reveal className="taxi-benefits" delay={200}>
            {TAXI_BENEFITS.map((b) => (
              <span key={b}><Icon name="check" width="16" height="16" /> {b}</span>
            ))}
          </Reveal>
          <Reveal delay={260}>
            <button className="btn btn-gold btn-lg" onClick={() => openWhatsApp("Gostaria de solicitar o serviço TaxiDog.")}>
              <Icon name="van" /> Solicitar TaxiDog
            </button>
          </Reveal>
        </div>

        <Reveal className="taxi-visual" delay={140}>
          <div className="taxi-route">
            <span className="rt-line" />
            <span className="rt-pin rt-a"><Icon name="home" width="16" height="16" /><em>Sua casa</em></span>
            <span className="rt-pin rt-b"><Icon name="pin" width="16" height="16" /><em>Clínica</em></span>
            <span className="rt-van"><Icon name="truck" width="22" height="22" /></span>
          </div>
          <div className="taxi-van-img">
            <Photo src="assets/pet-taxi-van.png" label="Pet Táxi" className="taxi-van-photo" alt="Van TaxiDog Pets Company" />
          </div>
          <FloatCard className="taxi-fc" icon="shield" title="Transporte seguro" sub="Equipe treinada" />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   PREVENTION
   ------------------------------------------------------------ */
function Prevention() {
  return (
    <section className="section prevention-section">
      <div className="container prev-grid">
        <Reveal className="prev-visual">
          <Photo src={PHOTOS.collie} label="cão saudável" className="prev-photo" alt="" />
          <Reveal className="prev-float" delay={260}>
            <span className="pf-ic"><Icon name="paw" width="22" height="22" /></span>
            <div><strong>Prevenção</strong><em>é tudo!</em></div>
          </Reveal>
          <div className="prev-stat">
            <strong><Counter to={2} suffix="x" /></strong>
            <em>mais qualidade de vida com acompanhamento regular</em>
          </div>
        </Reveal>
        <div className="prev-copy">
          <Reveal as="span" className="eyebrow">Saúde em primeiro lugar</Reveal>
          <Reveal as="h2" className="section-title" delay={60}>Prevenção é tudo</Reveal>
          <Reveal as="p" className="section-lead" delay={120}>
            Consultas regulares ajudam seu pet a viver mais, com mais saúde e qualidade de vida.
            Pequenos cuidados hoje evitam grandes preocupações amanhã.
          </Reveal>
          <Reveal className="prev-list" delay={180}>
            {[
              ["syringe", "Vacinas e vermifugação em dia"],
              ["flask", "Exames preventivos periódicos"],
              ["heart", "Acompanhamento nutricional"],
              ["stethoscope", "Check-ups de rotina"],
            ].map(([ic, t]) => (
              <div key={t}><span className="pl-ic"><Icon name={ic} width="20" height="20" /></span>{t}</div>
            ))}
          </Reveal>
          <Reveal delay={240}>
            <button className="btn btn-primary btn-lg" onClick={() => openWhatsApp("Quero agendar um check-up preventivo para meu pet.")}>
              Agendar um check-up <Icon name="arrow" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   STATISTICS
   ------------------------------------------------------------ */
const STATS = [
  ["24h", "Atendimento contínuo", null],
  ["365", "Dias por ano", null],
  ["100", "% de compromisso", "%"],
  ["5", "Mil pets atendidos", "+ mil"],
];

function Stats() {
  return (
    <section className="section-tight stats-section">
      <div className="paw-field" />
      <div className="container stats-grid">
        {STATS.map(([val, label, suf], i) => (
          <Reveal className="stat" key={label} delay={i * 90}>
            <strong>
              {val === "24h" ? "24h" : <Counter to={parseInt(val)} suffix={suf || ""} />}
            </strong>
            <em>{label}</em>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Appointment, WhyUs, Services, PetTaxi, Prevention, Stats });
