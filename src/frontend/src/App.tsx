import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Atom,
  Award,
  BookOpen,
  ChevronDown,
  Cpu,
  ExternalLink,
  FlaskConical,
  Github,
  GraduationCap,
  Layers,
  Lightbulb,
  Linkedin,
  Mail,
  Menu,
  Microscope,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

function PlaceholderBox({
  label,
  children,
}: { label?: string; children: React.ReactNode }) {
  return (
    <div className="placeholder-box">
      {label && <span className="placeholder-label">{label}</span>}
      <p className="placeholder-text">{children}</p>
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
}: { id?: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-2">
      <span
        className="text-xs font-mono uppercase tracking-widest mb-3 block"
        style={{ color: "oklch(0.70 0.14 195)" }}
      >
        {eyebrow}
      </span>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <div className="glow-line" />
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitContact = useSubmitContactForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitContact.mutate(contactForm, {
      onSuccess: () => {
        toast.success("Message sent! I'll get back to you soon.");
        setContactForm({ name: "", email: "", message: "" });
      },
      onError: () => toast.error("Failed to send message. Please try again."),
    });
  }

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "oklch(0.10 0.022 265)" }}
    >
      <Toaster />

      {/* ── STICKY NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "oklch(0.10 0.022 265 / 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.25 0.030 265)" : "none",
        }}
      >
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: "oklch(0.94 0.010 265)" }}
            data-ocid="nav.link.1"
          >
            <span style={{ color: "oklch(0.70 0.14 195)" }}>Q</span>Photonics
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  className="px-3 py-2 text-sm rounded-md transition-colors duration-150 font-medium"
                  style={{ color: "oklch(0.75 0.04 265)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color =
                      "oklch(0.70 0.14 195)";
                    (e.target as HTMLElement).style.background =
                      "oklch(0.18 0.025 265)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color =
                      "oklch(0.75 0.04 265)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md"
            style={{ color: "oklch(0.80 0.04 265)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t"
              style={{
                background: "oklch(0.12 0.025 265)",
                borderColor: "oklch(0.25 0.030 265)",
              }}
            >
              <ul className="container mx-auto px-6 py-4 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-ocid={`nav.link.${i + 1}`}
                      className="block px-3 py-2 text-sm rounded-md"
                      style={{ color: "oklch(0.80 0.04 265)" }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/generated/hero-quantum-bg.dim_1600x900.jpg')",
            }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.08 0.030 265 / 0.92) 0%, oklch(0.10 0.025 265 / 0.80) 60%, oklch(0.08 0.025 195 / 0.75) 100%)",
            }}
          />

          <div className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 max-w-2xl"
            >
              {/* Profile photo placeholder */}
              <div
                className="w-36 h-36 rounded-full flex flex-col items-center justify-center border-2 border-dashed text-center p-3 cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  borderColor: "oklch(0.70 0.14 195)",
                  background: "oklch(0.15 0.030 265 / 0.60)",
                }}
              >
                <span className="text-3xl mb-1">📷</span>
                <span
                  className="text-xs italic leading-tight"
                  style={{ color: "oklch(0.70 0.14 195)" }}
                >
                  Upload your professional headshot here
                </span>
              </div>

              {/* Name */}
              <div>
                <div
                  className="text-xs font-mono uppercase tracking-widest mb-2"
                  style={{ color: "oklch(0.70 0.14 195)" }}
                >
                  PhD Research Scholar
                </div>
                <h1
                  className="font-display text-5xl md:text-7xl font-bold leading-tight mb-3"
                  style={{ color: "oklch(0.97 0.005 265)" }}
                >
                  [Your Full Name]
                </h1>
                <p
                  className="text-lg md:text-xl"
                  style={{ color: "oklch(0.75 0.05 265)" }}
                >
                  [Department Name] · [University Name]
                </p>
              </div>

              {/* Tagline placeholder */}
              <PlaceholderBox label="✍ Your tagline">
                One sentence about your research focus, e.g., &quot;Designing
                integrated photonic circuits for quantum information processing
                and on-chip quantum communication."
              </PlaceholderBox>

              {/* CTAs */}
              <div className="flex gap-4 mt-2">
                <Button
                  asChild
                  size="lg"
                  data-ocid="hero.primary_button"
                  style={{
                    background: "oklch(0.55 0.18 265)",
                    color: "oklch(0.97 0.005 265)",
                  }}
                >
                  <a href="#research">View Research</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  data-ocid="hero.secondary_button"
                  style={{
                    borderColor: "oklch(0.70 0.14 195)",
                    color: "oklch(0.70 0.14 195)",
                    background: "transparent",
                  }}
                >
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ChevronDown size={24} style={{ color: "oklch(0.70 0.14 195)" }} />
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Who I Am" title="About Me" />
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <PlaceholderBox label="✍ Your Biography (3–4 sentences)">
                  Write your introduction here. Include: where you are from,
                  your academic background, what drives your passion for quantum
                  photonics, and your long-term research vision. Example:
                  &quot;I am a PhD scholar from [City, Country] working at the
                  intersection of integrated photonics and quantum optics. My
                  journey began with a deep curiosity in [undergraduate
                  interest]. I am driven by the goal of bringing quantum
                  technologies closer to real-world applications through
                  scalable on-chip devices.&quot;
                </PlaceholderBox>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div
                  className="rounded-lg p-5"
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <h3
                    className="font-display text-lg font-semibold mb-4"
                    style={{ color: "oklch(0.94 0.010 265)" }}
                  >
                    Research Interests
                  </h3>
                  <PlaceholderBox label="✍ List 3–5 core research interests">
                    Replace this box with bullet points of your core research
                    areas. Examples: Silicon photonics · Quantum entanglement
                    sources · Integrated waveguide design · Single-photon
                    emitters · Nonlinear optics · Photonic crystal cavities ·
                    Quantum key distribution (QKD)
                  </PlaceholderBox>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── RESEARCH ── */}
        <section id="research" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="What I Work On" title="Research" />

            {/* Thesis card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.16 0.040 265), oklch(0.14 0.030 195))",
                border: "1px solid oklch(0.30 0.060 265)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg shrink-0"
                  style={{ background: "oklch(0.55 0.18 265 / 0.20)" }}
                >
                  <Atom size={24} style={{ color: "oklch(0.70 0.18 265)" }} />
                </div>
                <div className="flex-1">
                  <Badge
                    className="mb-3 text-xs"
                    style={{
                      background: "oklch(0.55 0.18 265 / 0.25)",
                      color: "oklch(0.80 0.12 265)",
                      border: "none",
                    }}
                  >
                    PhD Thesis
                  </Badge>
                  <PlaceholderBox label="✍ Your PhD Thesis Project">
                    Title: [Your PhD Thesis Title Here]. Summarize your main
                    research project in 2–3 sentences: What problem are you
                    solving? What is your approach (e.g., design, fabrication,
                    simulation)? What is the expected impact on quantum
                    technologies? Also add: Lab/Group: [Your Research Group
                    Name] at [University]. Supervisor: Prof. [Name].
                  </PlaceholderBox>
                </div>
              </div>
            </motion.div>

            {/* Research topic cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: <Layers size={20} />,
                  title: "Photonic Integration",
                  color: "195",
                },
                {
                  icon: <Zap size={20} />,
                  title: "Quantum Sources",
                  color: "265",
                },
                {
                  icon: <Microscope size={20} />,
                  title: "Device Fabrication",
                  color: "220",
                },
              ].map((topic, i) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <div
                    className="p-2 rounded-lg inline-flex mb-3"
                    style={{
                      background: `oklch(0.65 0.14 ${topic.color} / 0.15)`,
                      color: `oklch(0.72 0.14 ${topic.color})`,
                    }}
                  >
                    {topic.icon}
                  </div>
                  <h3
                    className="font-display font-semibold text-base mb-2"
                    style={{ color: "oklch(0.92 0.010 265)" }}
                  >
                    {topic.title}
                  </h3>
                  <PlaceholderBox
                    label={`✍ Research topic ${(i as number) + 1}`}
                  >
                    Describe this research area in 2–3 sentences. What specific
                    techniques, materials, or phenomena does this involve in
                    your work?
                  </PlaceholderBox>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── PUBLICATIONS ── */}
        <section id="publications" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Scholarly Output" title="Publications" />

            {/* Instructions banner */}
            <div
              className="rounded-lg p-4 mb-8 flex items-start gap-3"
              style={{
                background: "oklch(0.55 0.18 265 / 0.12)",
                border: "1px solid oklch(0.40 0.12 265)",
              }}
            >
              <BookOpen
                size={18}
                style={{
                  color: "oklch(0.70 0.14 195)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <p
                className="text-sm italic"
                style={{ color: "oklch(0.75 0.06 265)" }}
              >
                Add your publications in standard citation format. Include
                journal articles, conference papers, and preprints. No
                publications yet? You can list preprints from arXiv or
                conference abstracts.
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (n - 1) * 0.08 }}
                  className="rounded-lg p-5"
                  data-ocid={`publications.item.${n}`}
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="font-mono text-sm font-semibold shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
                      style={{
                        background: "oklch(0.55 0.18 265 / 0.20)",
                        color: "oklch(0.70 0.14 265)",
                      }}
                    >
                      {n}
                    </span>
                    <PlaceholderBox label={`✍ Publication ${n}`}>
                      Format: [Author1, Author2, **Your Name**, Author3].
                      &quot;[Paper Title].&quot;
                      <em> Journal/Conference Name</em>, vol. X, pp. XX–XX,
                      Year. DOI: https://doi.org/[your-doi]. Tip: copy your
                      citation from Google Scholar and paste it here.
                    </PlaceholderBox>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="What I've Built" title="Projects" />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { status: "In Progress", statusColor: "195", num: 1 },
                { status: "Completed", statusColor: "140", num: 2 },
                { status: "In Progress", statusColor: "195", num: 3 },
              ].map((proj) => (
                <motion.div
                  key={proj.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (proj.num - 1) * 0.1 }}
                  className="rounded-xl p-5 flex flex-col gap-4"
                  data-ocid={`projects.item.${proj.num}`}
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <PlaceholderBox label={`✍ Project ${proj.num} title`}>
                      [Project Name Here]
                    </PlaceholderBox>
                    <Badge
                      className="shrink-0 text-xs ml-2"
                      style={{
                        background: `oklch(0.60 0.14 ${proj.statusColor} / 0.18)`,
                        color: `oklch(0.72 0.14 ${proj.statusColor})`,
                        border: "none",
                      }}
                    >
                      {proj.status}
                    </Badge>
                  </div>

                  <PlaceholderBox label="✍ Project description">
                    Describe this project in 2–3 sentences. What was the goal?
                    What methods/tools did you use (e.g., FDTD simulation,
                    cleanroom fabrication, Python scripting)? What were the
                    outcomes or results?
                  </PlaceholderBox>

                  <div className="flex flex-wrap gap-2">
                    {["FDTD Simulation", "Python", "Lumerical"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: "oklch(0.35 0.04 265)",
                          color: "oklch(0.65 0.04 265)",
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className="text-xs border-dashed"
                      style={{
                        borderColor: "oklch(0.45 0.08 195)",
                        color: "oklch(0.60 0.09 195)",
                      }}
                    >
                      + Add your tools
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── SKILLS ── */}
        <section id="skills" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Technical Expertise" title="Skills" />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu size={20} />,
                  title: "Technical / Simulation",
                  hint: "List simulation tools (e.g., Lumerical FDTD, COMSOL Multiphysics, CST Studio, Meep), programming languages (Python, MATLAB, C++), and design tools (Cadence Virtuoso, KLayout, GDS-II). Include your proficiency level if desired.",
                },
                {
                  icon: <FlaskConical size={20} />,
                  title: "Lab / Experimental",
                  hint: "List fabrication techniques you have hands-on experience with, e.g., Electron Beam Lithography (EBL), photolithography, dry/wet etching, PVD/CVD deposition, and characterization tools like SEM, AFM, optical spectrum analyzer, lock-in amplifier.",
                },
                {
                  icon: <Lightbulb size={20} />,
                  title: "Soft Skills",
                  hint: "List transferable skills such as: scientific writing and grant proposals, oral presentations at conferences, student mentoring/teaching, project management, interdisciplinary collaboration, data analysis and visualization.",
                },
              ].map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: "oklch(0.70 0.14 195 / 0.15)",
                        color: "oklch(0.70 0.14 195)",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <h3
                      className="font-display font-semibold text-sm"
                      style={{ color: "oklch(0.92 0.010 265)" }}
                    >
                      {skill.title}
                    </h3>
                  </div>
                  <PlaceholderBox label="✍ Your skills">
                    {skill.hint}
                  </PlaceholderBox>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── EDUCATION ── */}
        <section id="education" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Academic Background" title="Education" />

            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
                style={{
                  background:
                    "linear-gradient(to bottom, oklch(0.70 0.14 195), oklch(0.40 0.10 265), transparent)",
                }}
              />

              <div className="space-y-6">
                {[
                  {
                    degree: "PhD",
                    hint: "[Your PhD Degree Title], e.g., Doctor of Philosophy in Photonics Engineering. University: [University Name], [City, Country]. Duration: [Start Year] – Present. Thesis title: [Your Thesis Title]. Advisor: Prof. [Supervisor's Name]. Department: [Department Name].",
                    num: 1,
                  },
                  {
                    degree: "M.Tech / M.Sc",
                    hint: "(Include only if applicable) [Degree Name], e.g., M.Tech in Electronics & Communication. University: [University Name], [City, Country]. Year: [YYYY]–[YYYY]. Thesis/Project: [Optional title]. Grade: [CGPA or distinction, if notable].",
                    num: 2,
                  },
                  {
                    degree: "B.Tech / B.Sc",
                    hint: "[Degree Name], e.g., B.Tech in Electronics Engineering. University: [University Name], [City, Country]. Year: [YYYY]–[YYYY]. Specialization: [Optional]. Grade: [CGPA or percentage, if notable].",
                    num: 3,
                  },
                ].map((edu) => (
                  <motion.div
                    key={edu.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (edu.num - 1) * 0.12 }}
                    className="flex gap-6"
                    data-ocid={`education.item.${edu.num}`}
                  >
                    {/* Timeline dot */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: "oklch(0.55 0.18 265 / 0.25)",
                          border: "2px solid oklch(0.55 0.18 265)",
                          boxShadow: "0 0 12px oklch(0.55 0.18 265 / 0.35)",
                        }}
                      >
                        <GraduationCap
                          size={16}
                          style={{ color: "oklch(0.80 0.12 265)" }}
                        />
                      </div>
                    </div>

                    <div
                      className="flex-1 rounded-xl p-5"
                      style={{
                        background: "oklch(0.14 0.025 265)",
                        border: "1px solid oklch(0.25 0.030 265)",
                      }}
                    >
                      <Badge
                        className="mb-3 text-xs"
                        style={{
                          background: "oklch(0.55 0.18 265 / 0.20)",
                          color: "oklch(0.78 0.12 265)",
                          border: "none",
                        }}
                      >
                        {edu.degree}
                      </Badge>
                      <PlaceholderBox label={`✍ ${edu.degree} details`}>
                        {edu.hint}
                      </PlaceholderBox>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── AWARDS ── */}
        <section id="awards" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Recognition" title="Awards & Honors" />

            <div
              className="rounded-lg p-4 mb-8 flex items-start gap-3"
              style={{
                background: "oklch(0.65 0.14 60 / 0.10)",
                border: "1px solid oklch(0.50 0.12 60)",
              }}
            >
              <Award
                size={18}
                style={{
                  color: "oklch(0.72 0.14 60)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <p
                className="text-sm italic"
                style={{ color: "oklch(0.75 0.06 265)" }}
              >
                Include fellowships, travel grants, best paper awards,
                department honors, merit scholarships, competitive exam
                rankings, or recognition letters.
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (n - 1) * 0.08 }}
                  className="rounded-lg p-5 flex items-start gap-4"
                  data-ocid={`awards.item.${n}`}
                  style={{
                    background: "oklch(0.14 0.025 265)",
                    border: "1px solid oklch(0.25 0.030 265)",
                  }}
                >
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{
                      background: "oklch(0.65 0.14 60 / 0.15)",
                      color: "oklch(0.72 0.14 60)",
                    }}
                  >
                    <Award size={18} />
                  </div>
                  <PlaceholderBox label={`✍ Award / Honor ${n}`}>
                    Award Name — Awarding Body — Year. Brief description: what
                    was it for? E.g., &quot;Prime Minister's Research Fellowship
                    (PMRF) — Government of India — 2023. Prestigious fellowship
                    awarded to top PhD scholars for research excellence in
                    science and technology.&quot;
                  </PlaceholderBox>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator style={{ borderColor: "oklch(0.20 0.025 265)" }} />

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading eyebrow="Get In Touch" title="Contact" />

            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3
                  className="font-display text-xl font-semibold mb-5"
                  style={{ color: "oklch(0.92 0.010 265)" }}
                >
                  Send a Message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm mb-1.5 block"
                      style={{ color: "oklch(0.75 0.04 265)" }}
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Jane Smith"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.input"
                      style={{
                        background: "oklch(0.16 0.025 265)",
                        borderColor: "oklch(0.28 0.030 265)",
                        color: "oklch(0.92 0.010 265)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm mb-1.5 block"
                      style={{ color: "oklch(0.75 0.04 265)" }}
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      style={{
                        background: "oklch(0.16 0.025 265)",
                        borderColor: "oklch(0.28 0.030 265)",
                        color: "oklch(0.92 0.010 265)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-sm mb-1.5 block"
                      style={{ color: "oklch(0.75 0.04 265)" }}
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="I'd love to discuss your research on..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      data-ocid="contact.textarea"
                      style={{
                        background: "oklch(0.16 0.025 265)",
                        borderColor: "oklch(0.28 0.030 265)",
                        color: "oklch(0.92 0.010 265)",
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitContact.isPending}
                    data-ocid="contact.submit_button"
                    className="w-full"
                    style={{
                      background: "oklch(0.55 0.18 265)",
                      color: "oklch(0.97 0.005 265)",
                    }}
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  {submitContact.isError && (
                    <p
                      className="text-sm"
                      data-ocid="contact.error_state"
                      style={{ color: "oklch(0.65 0.18 25)" }}
                    >
                      Failed to send. Please try again.
                    </p>
                  )}
                  {submitContact.isSuccess && (
                    <p
                      className="text-sm"
                      data-ocid="contact.success_state"
                      style={{ color: "oklch(0.70 0.14 140)" }}
                    >
                      Message sent successfully!
                    </p>
                  )}
                </form>
              </motion.div>

              {/* Social / contact links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h3
                  className="font-display text-xl font-semibold mb-5"
                  style={{ color: "oklch(0.92 0.010 265)" }}
                >
                  Find Me Online
                </h3>
                {[
                  {
                    icon: <Mail size={18} />,
                    label: "Email",
                    hint: "your.email@university.edu",
                    note: "Replace with your institutional email",
                  },
                  {
                    icon: <Linkedin size={18} />,
                    label: "LinkedIn",
                    hint: "linkedin.com/in/your-profile",
                    note: "Your LinkedIn URL",
                  },
                  {
                    icon: <ExternalLink size={18} />,
                    label: "Google Scholar",
                    hint: "scholar.google.com/citations?user=XXXXX",
                    note: "Your Google Scholar profile URL",
                  },
                  {
                    icon: <ExternalLink size={18} />,
                    label: "ResearchGate",
                    hint: "researchgate.net/profile/Your-Name",
                    note: "Your ResearchGate profile URL",
                  },
                  {
                    icon: <Github size={18} />,
                    label: "GitHub",
                    hint: "github.com/yourusername",
                    note: "Your GitHub username (if applicable)",
                  },
                  {
                    icon: <ExternalLink size={18} />,
                    label: "ORCID",
                    hint: "orcid.org/0000-0000-0000-0000",
                    note: "Your ORCID iD",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-lg p-4"
                    style={{
                      background: "oklch(0.14 0.025 265)",
                      border: "1px dashed oklch(0.35 0.060 195)",
                    }}
                  >
                    <div
                      className="p-2 rounded-md shrink-0"
                      style={{
                        background: "oklch(0.70 0.14 195 / 0.15)",
                        color: "oklch(0.70 0.14 195)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        className="text-xs font-mono uppercase tracking-wider mb-0.5"
                        style={{ color: "oklch(0.55 0.10 195)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-sm italic"
                        style={{ color: "oklch(0.62 0.09 195)" }}
                      >
                        ✍ {item.note}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.45 0.04 265)" }}
                      >
                        e.g. {item.hint}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 mt-8"
        style={{
          background: "oklch(0.08 0.020 265)",
          borderTop: "1px solid oklch(0.22 0.025 265)",
        }}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p
                className="font-display text-lg font-semibold"
                style={{ color: "oklch(0.90 0.010 265)" }}
              >
                [Your Full Name]
              </p>
              <p className="text-sm" style={{ color: "oklch(0.55 0.04 265)" }}>
                PhD Research Scholar · Integrated Quantum Photonics ·
                [University Name]
              </p>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.45 0.04 265)" }}>
              © {new Date().getFullYear()} ·{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: "oklch(0.55 0.08 195)" }}
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
