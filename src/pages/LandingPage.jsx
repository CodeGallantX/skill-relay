import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button";

/* -------------------- Demo content -------------------- */
const demoCourses = [
  { id: "c1", title: "Short-Form Editing", author: "Mia Clark", minutes: 6, emoji: "🎬" },
  { id: "c2", title: "Public Speaking", author: "Sarah Foster", minutes: 7, emoji: "🎤" },
  { id: "c3", title: "React Hooks 101", author: "Ada Lin", minutes: 5, emoji: "⚛️" },
  { id: "c4", title: "Digital Painting", author: "Darnel Lee", minutes: 8, emoji: "🎨" },
  { id: "c5", title: "Personal Brand", author: "Naomi Z.", minutes: 4, emoji: "✨" },
];

const learnerReviews = [
  { id: "l1", name: "Sarah Chen", role: "UX Designer", text: "SkillRelay helped me learn React in just 2 weeks. The bite-sized format fits my schedule. I'm now earning $2k/mo sharing my design lessons.", stars: 5 },
  { id: "l2", name: "Hakeem O.", role: "Student", text: "Daily micro-lessons kept me consistent. I built a portfolio and landed an internship.", stars: 5 },
  { id: "l3", name: "Amara P.", role: "Marketing", text: "Clear, practical lessons with immediate results.", stars: 4 },
];
const creatorReviews = [
  { id: "c1", name: "Marcus Johnson", role: "Marketing Expert", text: "10k+ learners and dependable payouts. Upload → publish in minutes. Best creator ROI so far.", stars: 5 },
  { id: "c2", name: "Lena R.", role: "Illustrator", text: "Simple tools. Bundles and coupons give steady income without fuss.", stars: 5 },
  { id: "c3", name: "Toby M.", role: "Engineer", text: "Fast to publish and solid analytics. Love it.", stars: 5 },
];

/* ====================================================== */

export default function LandingPage() {
  const nav = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviewTab, setReviewTab] = useState("learners");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const go = (to) => nav(to);

  return (
    <div className="min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* keyframes for marquee + hover-pause */}
      <style>{`
        @keyframes sr-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sr-marquee:hover .sr-marquee-track { animation-play-state: paused; }
      `}</style>

      {/* =============================== NAV =============================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => go("/")} className="flex items-center gap-3">
            <div className="h-10 w-10 grid place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-300 text-white text-sm font-bold shadow-[0_0_24px_rgba(59,130,246,.55)]">
              SR
            </div>
            <span className="text-2xl font-bold tracking-tight">SkillRelay</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-[15px] md:flex">
            {[
              ["Home", "#home"],
              ["Courses", "#demo"],
              ["Features", "#features"],
              ["Testimonials", "#reviews"],
              ["Pricing", "#pricing"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="text-zinc-300 transition hover:text-white">
                {label}
              </a>
            ))}

            <Button onClick={() => go("/signin")} variant="outline" className="rounded-xl border-white/20 bg-white/5 hover:bg-white/10">
              Sign In
            </Button>
            <Button onClick={() => go("/signup")} className="rounded-xl px-5">
              Get Started
            </Button>

            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
{/*             <button
              aria-label="Open menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5"
            >
              <div className="h-0.5 w-5 bg-white mb-1" />
              <div className="h-0.5 w-5 bg-white mb-1" />
              <div className="h-0.5 w-5 bg-white" />
            </button> */}
            <Menu aria-label="Open menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="rounded-xl border border-white/15 bg-white/5" />
          </div>
        </div>

        {/* Mobile sheet */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0B1120]/90 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl flex flex-col gap-3 px-4 sm:px-6 lg:px-8 py-4 text-base">
              {[
                ["Home", "#home"],
                ["Courses", "#demo"],
                ["Features", "#features"],
                ["Testimonials", "#reviews"],
                ["Pricing", "#pricing"],
              ].map(([label, href]) => (
                <a key={href} onClick={() => setMobileOpen(false)} href={href} className="py-2">
                  {label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => { setMobileOpen(false); go("/signin"); }}
                  variant="outline"
                  className="flex-1 rounded-xl border-white/20 bg-white/5 hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button onClick={() => { setMobileOpen(false); go("/signup"); }} className="flex-1 rounded-xl">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================== HERO ============================== */}
      <section id="home" className="relative overflow-hidden border-b border-white/10 bg-[#0A0F1C]">
        {/* glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-12%] top-[8%] h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-[-6%] top-[22%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        {/* grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="mx-auto max-w-7xl grid items-center gap-12 px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-black shadow-[0_8px_30px_rgba(251,191,36,.35)] ring-1 ring-white/10">
              <span>🚀</span> Now in Beta — Join Early Access
            </span>

            <h1 className="mt-5 max-w-full break-words text-[38px] leading-tight font-extrabold sm:text-[42px] md:text-6xl lg:text-7xl">
              <span className="block">Learn better.</span>
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent">
                Teach confidently. Earn fairly.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] md:text-base text-zinc-300">
              Short, high-impact lessons from real practitioners. Create courses in minutes and grow your audience.
            </p>

            {/* Mobile quick demo */}
            <MiniDemoCarousel />

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row max-w-[25%] md:w-full">
              <Button
                onClick={() => go("/signup")}
                className="w-full rounded-xl px-7 py-5 text-base shadow-[0_10px_40px_rgba(37,99,235,.4)] hover:shadow-[0_10px_50px_rgba(37,99,235,.55)] sm:w-auto"
              >
                Sign Up Free
              </Button>
              <Button
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="w-full rounded-xl border-blue-500/40 px-7 py-5 text-base text-blue-300  sm:w-auto"
              >
                Browse Courses
              </Button>
              {/* <Button
                onClick={() => go("/signup")}
                variant="outline"
                className="w-full rounded-xl border-white/20 px-7 py-5 text-base text-zinc-100 hover:bg-white/10 sm:w-auto"
              >
                Teach on SkillRelay
              </Button> */}
            </div>

            {/* Desktop stats */}
            <div className="mt-10 hidden items-center gap-12 md:flex">
              <Stat to={10000} label="Active Learners" />
              <Stat to={500} label="Expert Creators" />
              <Stat to={50000} label="Skill Videos" />
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400 md:hidden">
              <li className="flex items-center gap-2"><span>⚡</span> Bite-size lessons</li>
              <li className="flex items-center gap-2"><span>💳</span> Creator payouts</li>
              <li className="flex items-center gap-2"><span>⭐</span> Ratings & reviews</li>
            </ul>
          </div>

          {/* Right: desktop preview */}
          <div className="hidden lg:block">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ======================= DEMO COURSES (MARQUEE) =================== */}
      <section id="demo" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-4 overflow-x-hidden">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">Trending Demo Courses</h2>
          <div className="text-sm text-zinc-400">Auto-slides →</div>
        </div>

        {/* marquee container */}
        <div className="sr-marquee relative mt-7 -mx-4 px-4 overflow-hidden">
          {/* Track is 2x width to loop seamlessly */}
          <div
            className="sr-marquee-track flex gap-4 md:gap-6 w-[200%]"
            style={{ animation: "sr-marquee 20s linear infinite" }}
          >
            {[...demoCourses, ...demoCourses].map((c, idx) => (
              <CourseCard key={c.id + "-" + idx} c={c} onEnroll={() => go("/signup")} />
            ))}
          </div>

          {/* gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0F1C] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0F1C] to-transparent" />
        </div>
      </section>

      {/* ============================ FEATURES ============================ */}
      <FeaturesSection />

      {/* ============================ REVIEWS ============================= */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 overflow-x-hidden">
        <h2 className="text-center text-4xl font-extrabold md:text-5xl">
          Loved by <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            {reviewTab === "learners" ? "Learners" : "Creators"}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
          Join thousands who are already transforming their careers.
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-sm gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 md:max-w-none md:border-0 md:bg-transparent md:p-0">
          <TabBtn active={reviewTab === "learners"} onClick={() => setReviewTab("learners")}>Learners</TabBtn>
          <TabBtn active={reviewTab === "creators"} onClick={() => setReviewTab("creators")}>Creators</TabBtn>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {(reviewTab === "learners" ? learnerReviews : creatorReviews).map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* =========================== PRICING CTA ========================== */}
      <section id="pricing" className="border-t border-white/10">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-600 via-blue-600 to-amber-400 opacity-95" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">Ready to Transform Your Skills?</h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Join thousands of learners and creators already building their future. Start today with our free plan.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <Button onClick={() => go("/signup")} className="rounded-2xl px-8 py-4 text-lg">Get Started Free</Button>
              <Button onClick={() => go("/signin")} variant="outline" className="rounded-2xl px-8 py-4 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20">Sign In</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================ */}
      <FooterPro />
    </div>
  );
}

/* ====================== Subcomponents ====================== */

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl px-4 py-2 text-sm transition ${active ? "bg-blue-500/25 text-blue-100" : "bg-white/0 text-zinc-300 hover:bg-white/10"}`}
    >
      {children}
    </button>
  );
}

function MiniDemoCarousel() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const stopScrolling = useRef(() => {}); // Use ref for stopScrolling to avoid re-creation

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollIntervalId; // Renamed to avoid conflict and clarify it's an ID
    const startAutoScrolling = () => {
      scrollIntervalId = setInterval(() => { // Assigned to the declared variable
        console.log('Auto-scrolling:', {
          scrollLeft: scrollContainer.scrollLeft,
          clientWidth: scrollContainer.clientWidth,
          scrollWidth: scrollContainer.scrollWidth,
        });
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          const cardWidth = scrollContainer.querySelector('.snap-start')?.offsetWidth || 0;
          const gap = 16;
          scrollContainer.scrollLeft += (cardWidth + gap);
        }
      }, 3000);
    };

    stopScrolling.current = () => { // Assign to ref's current
      clearInterval(scrollIntervalId); // Clear the correct ID
    };

    // Mouse drag functionality
    const handleMouseDown = (e) => {
      isDragging.current = true;
      stopScrolling.current(); // Stop auto-scrolling when dragging starts
      startX.current = e.pageX - scrollContainer.offsetLeft;
      scrollLeft.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
      scrollContainer.style.userSelect = 'none';
      console.log('MouseDown:', {
        isDragging: isDragging.current,
        startX: startX.current,
        scrollLeft: scrollLeft.current,
      });
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault(); // Prevent text selection and other default behaviors
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX.current) * 1.5; // Multiplier for faster drag
      scrollContainer.scrollLeft = scrollLeft.current - walk;
      console.log('MouseMove:', {
        isDragging: isDragging.current,
        pageX: e.pageX,
        x: x,
        walk: walk,
        newScrollLeft: scrollContainer.scrollLeft,
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      startAutoScrolling(); // Resume auto-scrolling when dragging stops
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.userSelect = 'auto';
    };

    // Initial setup
    startAutoScrolling();
    scrollContainer.style.cursor = 'grab';

    // Event listeners for mouse drag
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    scrollContainer.addEventListener('mousemove', handleMouseMove);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mouseleave', handleMouseUp); // Treat mouse leave as mouse up

    // Clean up on unmount
    return () => {
      stopScrolling.current();
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      scrollContainer.removeEventListener('mousemove', handleMouseMove);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []); // Empty dependency array means this runs once on mount and unmount

  return (
    <div className="mt-7 md:hidden">
      <div className="mb-2 text-sm text-zinc-400">Quick look</div>
      {/* full-bleed on mobile to avoid visual clipping */}
      <div ref={scrollRef} className="-mx-4 px-4 snap-x snap-mandatory overflow-x-auto touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-4 pr-2">
          {demoCourses.map((c) => ( // Removed .slice(0, 4)
            <div key={c.id} className="snap-start min-w-[calc(100vw-32px)] sm:min-w-[360px] rounded-2xl border border-white/10 bg-[#0D1426] p-5">
              <div className="grid h-40 place-items-center rounded-xl bg-blue-500/10 text-5xl ring-1 ring-blue-400/10">
                {c.emoji}
              </div>
              <div className="mt-3 text-[17px] font-semibold leading-snug">{c.title}</div>
              <div className="text-[12px] text-zinc-400">{c.author} • {c.minutes} min</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ c, onEnroll }) {
  return (
    <article className="snap-start min-w-[88vw] md:min-w-[360px] rounded-3xl border border-white/10 bg-[#0D1426] p-5 md:p-6 transition hover:border-blue-500/40">
      <div className="grid h-48 place-items-center rounded-2xl bg-blue-500/10 text-6xl ring-1 ring-blue-400/10">
        <span aria-hidden>{c.emoji}</span>
      </div>
      <h3 className="mt-4 text-[19px] md:text-[20px] font-semibold leading-snug">{c.title}</h3>
      <p className="text-[12px] text-zinc-400">{c.author}</p>
      <div className="mt-2 flex items-center gap-2 text-[12px] text-blue-300">
        <span className="rounded bg-blue-500/10 px-2 py-0.5">{c.minutes} min</span>
        <span className="text-zinc-500">Demo</span>
      </div>
      <Button onClick={onEnroll} className="mt-4 w-full rounded-xl">
        Enroll for Free (Demo)
      </Button>
    </article>
  );
}

function ReviewCard({ r }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#131a2d] p-6 md:p-8 shadow-[0_12px_48px_rgba(2,6,23,.45)]">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white font-semibold">
          {r.name[0]}
        </div>
        <div>
          <div className="font-semibold text-[15px]">{r.name}</div>
          <div className="text-[12px] text-zinc-400">{r.role}</div>
        </div>
      </div>
      <div className="mt-3 text-yellow-300">
        {"★".repeat(r.stars)}<span className="text-zinc-600">{"★".repeat(5 - r.stars)}</span>
      </div>
      <p className="mt-3 text-[15px] text-zinc-300 leading-relaxed">{r.text}</p>
    </div>
  );
}

function FeaturesSection() {
  const items = [
    {
      title: "Learn Anything",
      body: "Access thousands of bite-size video lessons—from coding to cooking—designed for busy professionals.",
      icon: <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-lg">▶</div>,
    },
    {
      title: "Share Your Expertise",
      body: "Create and upload your own skill videos with intuitive tools. Build your audience and become an expert.",
      icon: <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-400 text-black text-lg">⤴</div>,
    },
    {
      title: "Monetize Your Skills",
      body: "Earn from subscriptions, one-time purchases, or tips with transparent, creator-first payouts.",
      icon: <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 text-white text-lg">$</div>,
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 overflow-x-hidden">
      <h2 className="text-center text-4xl font-extrabold md:text-5xl">Everything You Need to Succeed</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
        Whether you’re learning new skills or sharing your expertise, we’ve got the tools to help you thrive.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((f) => (
          <div key={f.title} className="rounded-3xl border border-white/10 bg-[#121a2b] p-7 md:p-8 shadow-[0_20px_60px_rgba(2,6,23,.45)]">
            <div>{f.icon}</div>
            <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-[15px] text-zinc-300 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-[620px] rounded-3xl border border-white/10 bg-[#0D1426] p-5 ring-1 ring-blue-500/30 shadow-[0_40px_140px_-20px_rgba(37,99,235,.6)]">
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400/80" />
            <span className="text-xs text-zinc-300">SKILLRELAY</span>
          </div>
          <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-300">Live</div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["Setup Basics", "Digital Painting", "Public Speaking", "React Hooks", "UI Motion", "Personal Brand"].map((t, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[#111A33] to-[#0B1226] p-3 transition hover:border-blue-500/40">
              <div className="h-20 rounded-xl bg-blue-500/10 ring-1 ring-blue-400/10 group-hover:ring-blue-400/30" />
              <div className="mt-2 text-[13px] font-semibold leading-5">{t}</div>
              <div className="text-[11px] text-zinc-400">Demo Author</div>
              <div className="mt-1 inline-block rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-300">5–9 min</div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-blue-500/10 blur-2xl" />
      </div>
    </div>
  );
}

function FooterPro() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1120]">
      <div className="mx-auto max-w-7xl grid gap-10 px-4 sm:px-6 lg:px-8 py-16 md:py-20 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-300 text-white text-sm font-bold">
              SR
            </div>
            <span className="text-lg font-semibold">SkillRelay</span>
          </div>
          <p className="max-w-xs text-sm text-zinc-400">
            The fastest way to learn and share skills through bite-size video lessons.
          </p>
        </div>

        <FooterCol title="Product" links={["Features", "Pricing", "Mobile App", "API"]} />
        <FooterCol title="Company" links={["About", "Blog", "Careers", "Contact"]} />
        <FooterCol title="Support" links={["Help Center", "Community", "Privacy Policy", "Terms of Service"]} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} SkillRelay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-zinc-400">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-zinc-200">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10"
    >
      {isDark ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}

function Stat({ to, label }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const steps = 30, dur = 800;
    const tick = setInterval(() => {
      i++; setN(Math.round((to * i) / steps));
      if (i >= steps) clearInterval(tick);
    }, dur / steps);
    return () => {};
  }, [to]);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold">{n.toLocaleString()}+</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}
