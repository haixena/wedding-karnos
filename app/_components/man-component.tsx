"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createConfirm } from "../actions";
import { toast } from "sonner";

const FloralDivider = () => (
  <div className="flex items-center gap-2 mx-auto max-w-[200px] my-8">
    <span className="flex-1 h-px bg-zinc-400 opacity-40" />
    <span className="text-zinc-400 text-[0.5rem] opacity-70">✦</span>
    <span className="text-zinc-400 text-[0.35rem] opacity-70">✦</span>
    <span className="text-zinc-400 text-[0.5rem] opacity-70">✦</span>
    <span className="flex-1 h-px bg-zinc-400 opacity-40" />
  </div>
);

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center my-12 flex-wrap">
      {[
        { label: "Hari", value: timeLeft.days },
        { label: "Jam", value: timeLeft.hours },
        { label: "Menit", value: timeLeft.minutes },
        { label: "Detik", value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center min-w-[80px]">
          <span
            className="font-['Cinzel',serif] text-4xl md:text-5xl text-zinc-700 border border-zinc-400/30 w-[90px] h-[90px] flex items-center justify-center mb-2 bg-amber-400/20"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            className="text-zinc-800 text-[0.6rem] tracking-widest uppercase opacity-60"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function WeddingInvitation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const searchParam = useSearchParams();
  const name = searchParam.get("to");

  const NameL = "Wida Karno";
  const NameP = "Elinda Nurwahidah";
  const ParentNameL = "Bpk. Eme Casma (Alm.) & Ibu. Mimin";
  const ParentNameP = "Bpk. Dede Darusalam (Alm.) & Ibu. Esih Surayasih";
  const DANA = ["083121171181", "WIDA KAFINO"];
  const BANK = ["4303-0101-1349-536", "WIDA KARNO"];
  const DAYDATE = "Minggu, 24 Mei 2026";
  const GMAPS =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.221082360135!2d108.2886381!3d-6.7428659999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f27ad6f105829%3A0x6d366f92a756c2e3!2sRumah%20sundawa!5e0!3m2!1sid!2sid!4v1777560954968!5m2!1sid!2sid";

  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [form, setForm] = useState<any>({
    nama: "",
    phone: "",
    attendance: "",
    guest: 1,
    quote: "",
  });
  const [error, setError] = useState<string>("");
  const [hasConfirm, setHasConfirm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendConfirm = async () => {
    if (loading) return;
    if (form.nama.length == 0) return setError("Nama");
    if (form.phone.length == 0) return setError("Nomor telepon");
    if (form.attendance.length == 0) return setError("Kehadiran");
    if (form.quote.length > 64) return;

    if (hasConfirm == "true") {
      toast.message("Anda telah melakukan konfirmasi sebelumnya.");
      return;
    }

    setLoading(true);

    const res = await createConfirm(form);

    if (!res.success) {
      toast.error("Gagal mengirim RSVP");
      setLoading(false);
    } else {
      localStorage.setItem("hasConfirm", "true");
      toast.success("RSVP berhasil dikirim 🎉");
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setVisible(true), 100);
    // Auto play music after opening
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .then(() => setMusicPlaying(true))
          .catch(() => {});
      }
    }, 900);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  useEffect(() => {
    const value = localStorage.getItem("hasConfirm");
    setHasConfirm(value);
  }, []);

  useEffect(() => {
    if (!opened || !visible) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened, visible]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Raleway:wght@300;400&display=swap');
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal.in-view { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .btn-fill::before {
          content: ''; position: absolute; inset: 0;
          background: #C9A84C; transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .btn-fill:hover::before { transform: scaleX(1); }
        .btn-fill:hover { color: #1A1208; }
        .btn-fill span { position: relative; z-index: 1; }

        /* Cover subtle pattern */
        .cover-pattern::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .cover-pattern::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 40%, rgba(253,238,200,0.6) 0%, transparent 55%),
                      radial-gradient(ellipse at 70% 70%, rgba(232,213,163,0.4) 0%, transparent 50%);
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .scroll-bounce { animation: bounce 2s ease-in-out infinite; }

        @keyframes musicPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .music-pulse { animation: musicPulse 1.5s ease-in-out infinite; }

        @keyframes leafFloat {
          0%, 100% { transform: translateY(0) rotate(-5deg); opacity: 0.6; }
          50% { transform: translateY(-12px) rotate(5deg); opacity: 0.9; }
        }
        .leaf-1 { animation: leafFloat 5s ease-in-out infinite; }
        .leaf-2 { animation: leafFloat 7s ease-in-out infinite 1s; }
        .leaf-3 { animation: leafFloat 6s ease-in-out infinite 2s; }
      `}</style>

      {/* Hidden audio element - use a royalty-free wedding music URL or local file */}
      <audio ref={audioRef} loop preload="auto">
        {/* Ganti src dengan URL lagu pernikahan pilihan Anda */}
        <source src="/song.m4a" type="audio/mpeg" />
      </audio>

      {/* ── COVER / ENVELOPE SCREEN ── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center flex-col transition-all duration-700 ease-in-out ${opened ? "opacity-0 pointer-events-none invisible" : "opacity-100"}`}
        style={{
          background:
            "linear-gradient(145deg, #FDF6E3 0%, #F5E6C8 40%, #EDD9A3 70%, #E8CFA0 100%)",
        }}
      >
        {/* Background pattern layer */}
        <div className="absolute inset-0 cover-pattern" />

        {/* Decorative floating leaves/petals */}
        <div className="absolute top-16 left-12 text-4xl leaf-1 opacity-30 select-none">
          🌸
        </div>
        <div className="absolute top-32 right-16 text-3xl leaf-2 opacity-25 select-none">
          🌿
        </div>
        <div className="absolute bottom-28 left-20 text-3xl leaf-3 opacity-25 select-none">
          🌷
        </div>
        <div
          className="absolute bottom-16 right-12 text-4xl leaf-1 opacity-20 select-none"
          style={{ animationDelay: "3s" }}
        >
          🌸
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-amber-500/40" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-amber-500/40" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-amber-500/40" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-amber-500/40" />

        {/* Inner frame */}
        <div className="absolute inset-5 border border-amber-400/20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          {/* Ornamental top */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-16 bg-amber-600/40 inline-block" />
            <span className="text-amber-600 text-sm">✦</span>
            <span className="h-px w-16 bg-amber-600/40 inline-block" />
          </div>

          <p
            className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-3 opacity-80"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Undangan Pernikahan
          </p>

          <h1
            className="text-5xl md:text-7xl font-light italic text-amber-900 leading-tight mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Wida Karno
          </h1>
          <p
            className="text-2xl italic text-amber-700 my-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &amp;
          </p>
          <h1
            className="text-5xl md:text-7xl font-light italic text-amber-900 leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Elinda Nurwahidah
          </h1>

          <p
            className="text-sm tracking-[0.25em] font-bold text-zinc-700 mb-10"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            23 · MEI · 2026
          </p>

          <p
            className="text-sm tracking-[0.25em] text-amber-700 mb-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Kepada Bpk/Ibu, Saudara/i
          </p>

          <p
            className="text-lg font-bold tracking-[0.25em] text-amber-700 mb-10"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {name || ""}
          </p>

          {/* Open button */}
          <button
            className="btn-fill inline-flex items-center gap-3 px-8 py-3 border border-amber-600/60 text-amber-800 relative overflow-hidden transition-colors duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
            }}
            onClick={handleOpen}
          >
            <span>✦ Buka Undangan ✦</span>
          </button>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="h-px w-16 bg-amber-600/40 inline-block" />
            <span className="text-amber-600 text-sm">✦</span>
            <span className="h-px w-16 bg-amber-600/40 inline-block" />
          </div>
        </div>
      </div>

      {/* NOTIFICATION */}
      <div></div>

      {/* ── MAIN PAGE ── */}
      <div
        className={`bg-[#FAF6EF] min-h-screen transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ fontFamily: "'Raleway', sans-serif", color: "#1A1208" }}
      >
        {/* Music toggle button */}
        {visible && (
          <button
            onClick={toggleMusic}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-amber-500 bg-white/90 backdrop-blur-sm flex items-center justify-center text-amber-600 shadow-lg transition-all duration-300 hover:bg-amber-50 ${musicPlaying ? "music-pulse" : ""}`}
            title={musicPlaying ? "Pause Music" : "Play Music"}
          >
            {musicPlaying ? "♪" : "♩"}
          </button>
        )}

        {/* HERO */}
        <section
          className="min-h-screen flex items-center justify-center text-center px-6 py-16 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #2a1500 0%, #1a0e00 60%, #0d0902 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(201,168,76,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #FDF6E3 0%, #F5E6C8 40%, #EDD9A3 70%, #E8CFA0 100%)",
            }}
          />
          <div className="absolute inset-5 border border-amber-400/20 pointer-events-none" />
          <div className="absolute inset-[18px] border border-amber-400/8 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <p
              className="text-[0.65rem] tracking-[0.4em] text-zinc-800 uppercase mb-8 opacity-80"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              — Dengan Menyebut Nama Allah —
            </p>
            <h1
              className="font-light leading-none text-zinc-700 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 12vw, 7rem)",
              }}
            >
              Wida Karno
              <span
                className="block italic text-amber-800"
                style={{ fontSize: "0.6em", lineHeight: "1.4" }}
              >
                &amp;
              </span>
              Elinda Nurwahidah
            </h1>
            <p
              className="mt-6 tracking-[0.3em] text-amber-200/70"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
              }}
            >
              Sabtu, 23 mei 2026{" "}
            </p>
          </div>

          <div
            className="absolute bottom-10 left-1/2 scroll-bounce flex flex-col items-center gap-2 text-amber-400/50"
            style={{
              transform: "translateX(-50%)",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
            }}
          >
            <svg
              className="w-4 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            SCROLL
          </div>
        </section>

        {/* QUOTE */}
        <section className="bg-[#FDF9F2] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="reveal">
              <p
                className="italic text-[#4A3520] mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
                }}
              >
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                untukmu pasangan hidup dari jenismu sendiri, supaya kamu
                cenderung dan merasa tenteram kepadanya. dan Dia menjadikan
                antaramu rasa kasih dan sayang."
              </p>
              <FloralDivider />
              <p
                className="text-[0.78rem] text-[#8a7060] tracking-[0.15em]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                QS. AR-RUM : 21
              </p>
            </div>
          </div>
        </section>

        {/* COUPLE */}
        <section className="bg-[#FDF9F2] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-amber-600 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Mempelai
              </span>
              <h2
                className="font-light italic text-[#4A3520] mb-12"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                }}
              >
                Kami Yang Berbahagia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-4">
              <div className="text-center reveal">
                <div className="w-24 h-24 border border-amber-400 rounded-full flex items-center justify-center mx-auto mb-5 bg-white shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
                  <span
                    className="text-4xl italic text-amber-600 rounded-full overflow-hidden"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <img src="/l.jpeg" alt="" />
                  </span>
                </div>
                <p
                  className="text-xl italic text-[#4A3520] mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {NameL}
                </p>
                <p className="text-xs text-[#8a7060] leading-6">
                  Putra Ketiga dari
                  <br />
                  {ParentNameL}
                </p>
              </div>

              <div className="reveal reveal-delay-1 hidden md:block text-center">
                <span
                  className="text-6xl italic text-amber-500"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  &amp;
                </span>
              </div>

              <div className="text-center reveal reveal-delay-2">
                <div className="w-24 h-24 border border-amber-400 rounded-full flex items-center justify-center mx-auto mb-5 bg-white shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
                  <span
                    className="text-4xl italic text-amber-600 rounded-full overflow-hidden"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <img src="/p.jpeg" alt="" />
                  </span>
                </div>
                <p
                  className="text-xl italic text-[#4A3520] mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {NameP}
                </p>
                <p className="text-xs text-[#8a7060] leading-6">
                  Putri Pertama dari
                  <br />
                  {ParentNameP}
                </p>
              </div>
            </div>
            <div className="max-w-2xl mx-auto text-center mt-10">
              <div className="reveal">
                <p
                  className="italic text-[#4A3520] mb-6 leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.3rem, 4vw, 1.2rem)",
                  }}
                >
                  Untuk melaksanakan syariat agama-Mu, mengikuti Sunnah Rasul-Mu
                  dalam membentuk rumah tangga yang Sakinah dan memperoleh
                  keturunan yang shaleh, yang taat kepada-Mu serta berbakti
                  kepada kedua orang tua.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="bg-[#FAF6EF] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-amber-600 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Rangkaian Acara
              </span>
              <h2
                className="font-light italic text-[#4A3520] mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                }}
              >
                Hari Pernikahan
              </h2>
              <p className="text-sm text-[#5a4530] leading-8 font-light">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud untuk
                menyelenggarakan pernikahan putra-putri kami yang insya Allah
                akan diselenggarakan pada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {[
                {
                  icon: "🕌",
                  type: "Akad Nikah",
                  time: "08.00 WIB",
                  date: DAYDATE,
                  venue: "Dusun Margajaya RT 03 RW 02 Desa Pasir",
                  address: "Kecamatan Palasah, Kabupaten Majalengka.",
                  delay: "reveal-delay-1",
                },
                {
                  icon: "🌹",
                  type: "Resepsi",
                  time: "09.00 WIB – SELESAI",
                  date: DAYDATE,
                  venue: "Dusun Margajaya RT 03 RW 02 Desa Pasir",
                  address: "Kecamatan Palasah, Kabupaten Majalengka.",
                  delay: "reveal-delay-2",
                },
              ].map((ev) => (
                <div
                  key={ev.type}
                  className={`reveal ${ev.delay} border border-amber-300/40 p-10 bg-white text-center relative`}
                >
                  <div className="absolute inset-[6px] border border-amber-200/20 pointer-events-none" />
                  <span className="text-3xl block mb-4">{ev.icon}</span>
                  <p
                    className="text-[0.7rem] tracking-[0.3em] text-amber-600 uppercase mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {ev.type}
                  </p>
                  <p
                    className="text-2xl italic text-[#4A3520] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {ev.time}
                  </p>
                  <p className="text-xs text-[#8a7060] mb-4">{ev.date}</p>
                  <p
                    className="text-lg text-[#4A3520] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {ev.venue}
                  </p>
                  <p className="text-xs text-[#8a7060] leading-6 whitespace-pre-line">
                    {ev.address}
                  </p>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto text-center mt-10">
              <div className="reveal">
                <p
                  className="italic text-[#4A3520] mb-6 leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.3rem, 4vw, 1.2rem)",
                  }}
                >
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa dan
                  restu kepada kedua mempelai.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section
          className="py-20 px-6 text-center"
          style={{
            background:
              "linear-gradient(145deg, #FDF6E3 0%, #F5E6C8 40%, #EDD9A3 70%, #E8CFA0 100%)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-zinc-800 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Menghitung Hari
              </span>
              <h2
                className="font-light italic text-zinc-700 mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                }}
              >
                Menuju Hari Bahagia
              </h2>
            </div>
            <CountdownTimer targetDate="2026-05-23T08:00:00" />
          </div>
        </section>

        {/* LOCATION */}
        <section className="bg-[#FDF9F2] py-20">
          <div className="max-w-2xl mx-auto text-center pb-20">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-amber-600 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Lokasi
              </span>
              <p className="text-md text-[#5a4530] leading-8 font-light mb-10">
                Desa Waringin, Blok Selasa RT01/RW02 (Abug).
                <br />
                Kecamatan Palasah, Kabupaten Majalengka.
              </p>
              {/* <h2
                className="font-light italic text-[#4A3520] mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 6vw, 3rem)",
                }}
              >
                Momen Bersama
              </h2> */}
            </div>
            <div
              className="reveal reveal-delay-1 grid grid-cols-3 gap-2 mx-auto pb-10"
              style={{ gridTemplateRows: "160px 160px" }}
            >
              <iframe
                src={GMAPS}
                width={700}
                height={450}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* {["📷", "🌸", "💛", "🌿", "💍"].map((icon, i) => (
                <div
                  key={i}
                  className={`bg-amber-50 border border-amber-200/40 flex items-center justify-center text-4xl text-amber-400/60 relative overflow-hidden ${i === 0 ? "row-span-2" : ""}`}
                >
                  <span className="relative z-10">{icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-transparent" />
                </div>
              ))} */}
            </div>
          </div>
        </section>

        <section className="bg-[#FAF6EF] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-amber-600 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                NO REKENING
              </span>
              <p className="text-sm text-[#5a4530] leading-8 font-light mb-8">
                Undangan via transfer
              </p>
            </div>
            <div className="">
              <img className="w-[300px] mx-auto" src="/dana.png" alt="DANA" />
              <div className="text-lg">
                <p>{DANA[0]}</p>
                <div>a/n {DANA[1]}</div>
              </div>
            </div>

            <div className="mt-20">
              <img className="w-[300px] mx-auto" src="/bri.png" alt="BRI" />
              <div className="text-lg">
                <p>{BANK[0]}</p>
                <div>a/n {BANK[1]}</div>
              </div>
            </div>

            {/* <div>Dana 083121171181 a/n WIDA KAFINO</div>
            <div>Bri 4303 0101 1349 536 a/n WIDA KARNO</div> */}
          </div>
        </section>

        {/* RSVP */}
        <section className="bg-[#FAF6EF] py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="reveal">
              <span
                className="block text-[0.62rem] tracking-[0.4em] text-amber-600 uppercase mb-5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Konfirmasi Kehadiran
              </span>
              <p className="text-sm text-[#5a4530] leading-8 font-light mb-8">
                Mohon konfirmasi kehadiran Anda paling lambat
                <br />7 hari sebelum acara. Terima kasih.
              </p>
            </div>

            <form
              className="reveal flex flex-col gap-4 max-w-md mx-auto text-left"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                {
                  name: "nama",
                  label: "Nama Lengkap",
                  type: "text",
                  placeholder: "Masukkan nama Anda",
                },
                {
                  name: "phone",
                  label: "Nomor Telepon",
                  type: "tel",
                  placeholder: "08xx-xxxx-xxxx",
                },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-[0.62rem] tracking-[0.25em] text-amber-600 uppercase">
                    {label}
                  </label>

                  <input
                    name={name}
                    value={form[name]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm((prev: any) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-amber-300/40 bg-white text-[#4A3520] text-sm outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              ))}

              {[
                {
                  name: "attendance",
                  label: "Kehadiran",
                  options: [
                    { value: "", text: "Pilih konfirmasi" },
                    { value: "hadir", text: "✓ Saya akan hadir" },
                    { value: "tidak hadir", text: "✗ Saya tidak dapat hadir" },
                    { value: "mungkin hadir", text: "? Mungkin hadir" },
                  ],
                },
                {
                  name: "guest",
                  label: "Jumlah Tamu",
                  options: [
                    { value: "1", text: "1 orang" },
                    { value: "2", text: "2 orang" },
                    { value: "3", text: "3 orang" },
                    { value: "4", text: "4+ orang" },
                  ],
                },
              ].map(({ name, label, options }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-[0.62rem] tracking-[0.25em] text-amber-600 uppercase">
                    {label}
                  </label>

                  <select
                    name={name}
                    value={form[name]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm((prev: any) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-amber-300/40 bg-white text-[#4A3520] text-sm outline-none focus:border-amber-500 transition-colors appearance-none"
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.text}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label
                  className="text-[0.62rem] tracking-[0.25em] text-amber-600 uppercase"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Ucapan & Doa
                </label>
                <textarea
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                  className="w-full px-4 py-3 border border-amber-300/40 bg-white text-[#4A3520] text-sm outline-none focus:border-amber-500 transition-colors resize-y min-h-[100px]"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                />
                <p
                  className={`${form.quote.length > 40 ? "text-red-500" : "text-zinc-700"}`}
                >
                  {form.quote.length}/40
                </p>
              </div>

              {form.quote.length > 64 ? (
                <div className="text-center text-zinc-800 p-3 border border-amber-400/50 bg-amber-400/20">
                  Ucapan maksimal hanya 40 karakter.
                </div>
              ) : null}

              {error.length > 0 ? (
                <div className="text-center text-zinc-800 p-3 border border-amber-400/50 bg-amber-400/20">
                  {error} tidak boleh kosong.
                </div>
              ) : null}

              <button
                onClick={sendConfirm}
                type="submit"
                className="btn-fill px-10 py-4 bg-zinc-700 text-amber-100 border border-amber-500/60 relative overflow-hidden transition-colors duration-300 mt-2"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                }}
              >
                <span>{loading ? "Tunggu Sebentar" : "Kirim Konfirmasi"}</span>
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="py-16 px-6 text-center"
          style={{
            background:
              "linear-gradient(145deg, #FDF6E3 0%, #F5E6C8 40%, #EDD9A3 70%, #E8CFA0 100%)",
          }}
        >
          <FloralDivider />
          <p
            className="font-light italic text-zinc-800 mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            }}
          >
            Karno &amp; Elinda
          </p>
          <p
            className="text-[0.78rem] text-zinc-700 tracking-[0.15em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            23 · 06 · 2026 · MAJALENGKA
          </p>
          <div className="mt-6">
            <FloralDivider />
          </div>
          <p
            className="text-[0.7rem] text-amber-700 mt-4 tracking-[0.1em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Terima kasih telah hadir di hari bahagia kami
          </p>
          <div className="translate-y-10">
            <FloralDivider />
            <p
              className="text-[0.7rem] text-amber-700 mt-4 tracking-[0.1em]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Created by RAP Project
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/08994845556"
                target="_blank"
                className="text-[0.7rem] text-amber-700 mt-4 tracking-[0.1em]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Whatsapp
              </a>
              <a
                href="https://instagram.com/rivalperm__"
                target="_blank"
                className="text-[0.7rem] text-amber-700 mt-4 tracking-[0.1em]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
