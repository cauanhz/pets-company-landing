/* ============================================================
   PETS COMPANY — App composition + Tweaks
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split",
  "headingFont": "Baloo 2",
  "accent": "navy",
  "showMarquee": true,
  "motion": true
}/*EDITMODE-END*/;

const ACCENTS = {
  navy:   { "--accent": "#163668" },
  red:    { "--accent": "#c1133b" },
  gold:   { "--accent": "#d4922a" },
};

const HEAD_FONTS = {
  "Baloo 2": "'Baloo 2', system-ui, sans-serif",
  "Fredoka": "'Fredoka', system-ui, sans-serif",
  "Quicksand": "'Quicksand', system-ui, sans-serif",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--font-head", HEAD_FONTS[t.headingFont] || HEAD_FONTS["Baloo 2"]);
    const a = ACCENTS[t.accent] || ACCENTS.navy;
    r.style.setProperty("--accent", a["--accent"]);
    document.body.classList.toggle("no-motion", !t.motion);
  }, [t.headingFont, t.accent, t.motion]);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Header />
      <main className={loaded ? "loaded" : ""}>
        <Hero variant={t.heroVariant} />
        {t.showMarquee && <TrustMarquee />}
        <Appointment />
        <WhyUs />
        <Services />
        <PetTaxi />
        <Prevention />
        <Stats />
        <Testimonials />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <Floating />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Estilo do hero" value={t.heroVariant}
          options={["split", "centered", "bento"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakSection label="Tipografia & cor" />
        <TweakSelect label="Fonte dos títulos" value={t.headingFont}
          options={["Baloo 2", "Fredoka", "Quicksand"]}
          onChange={(v) => setTweak("headingFont", v)} />
        <TweakRadio label="Acento" value={t.accent}
          options={["navy", "red", "gold"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Movimento" />
        <TweakToggle label="Faixa animada" value={t.showMarquee}
          onChange={(v) => setTweak("showMarquee", v)} />
        <TweakToggle label="Animações" value={t.motion}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
