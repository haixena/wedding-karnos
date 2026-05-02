"use client";

import { useEffect, useState } from "react";

export default function DashboardPageClient({ data }: any) {
  const [rsvps, setRsvps] = useState<any>(data.totalData);
  const [hadirCount, setHadirCount] = useState<any>(data.totalHadir);
  const [mungkinHadirCount, setMungkinHadirCount] = useState<number>(
    data.totalMungkinHadir,
  );
  const [tidakHadirCount, setTidakHadirCount] = useState<number>(
    data.totalTidakHadir,
  );
  const [totalGuestsCount, setTotalGuestsCount] = useState<number>(
    data.totalGuests,
  );

  const total = rsvps.length;
  const hadir = rsvps.totalHadir;
  const tidakHadir = rsvps.totalTidakHadir;
  const hadirPct = total ? Math.round((hadir / total) * 100) : 0;
  const tidakPct = total ? Math.round((tidakHadir / total) * 100) : 0;

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      setRsvps(data.totalData);
      setHadirCount(data.totalHadir);
      setMungkinHadirCount(data.totalMungkinHadir);
      setTidakHadirCount(data.totalTidakHadir);
      setTotalGuestsCount(data.totalGuests);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500&display=swap');
        body { font-family: 'Raleway', sans-serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .bg-dot-pattern {
          background-image: radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .card-inset::before {
          content: '';
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(201,168,76,0.1);
          pointer-events: none;
        }
        .td-truncate {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
        }
      `}</style>

      <div
        className="min-h-screen px-4 py-10 md:px-8 relative"
        style={{
          background:
            "linear-gradient(160deg, #fdf6e3 0%, #f5e6c8 60%, #ede0c0 100%)",
        }}
      >
        {/* Dot pattern overlay */}
        <div className="bg-dot-pattern fixed inset-0 pointer-events-none z-0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* ── HEADER ── */}
          <header className="text-center mb-12 pb-8 border-b border-amber-400/20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-10 bg-amber-600/40" />
              <span className="font-cinzel text-[0.55rem] tracking-[0.45em] uppercase text-amber-700">
                ✦ Dashboard ✦
              </span>
              <span className="h-px w-10 bg-amber-600/40" />
            </div>
            <h1
              className="font-cormorant font-light italic text-amber-950 mb-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              Konfirmasi Kehadiran
            </h1>
            <p className="font-cinzel text-[0.65rem] tracking-[0.3em] text-amber-700/60">
              Wida Karno &amp; Elinda Nurwahidah · 23 · 05 · 2026
            </p>
          </header>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {/* Total Tamu */}
            <div className="card-inset relative bg-white/70 backdrop-blur-sm border border-amber-400/25 p-6 text-center hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-2xl block mb-3">👥</span>
              <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-amber-700/70 block mb-2">
                Total Reservasi
              </span>
              <span className="font-cormorant font-light text-5xl text-amber-950 block leading-none">
                {total}
              </span>
              <div className="mt-4 h-px bg-amber-200/60 w-full" />
            </div>

            {/* Hadir */}
            <div className="card-inset relative bg-white/70 backdrop-blur-sm border border-amber-400/25 p-6 text-center hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-2xl block mb-3 text-zinc-700/70">✓</span>
              <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-green-700/70 block mb-2">
                Hadir
              </span>
              <span className="font-cormorant font-light text-5xl text-green-800 block leading-none">
                {hadirCount}
              </span>
              <div className="mt-4 h-px bg-green-200/60 w-full overflow-hidden">
                <div
                  className="h-full bg-green-500/50"
                  style={{ width: `${hadirPct}%` }}
                />
              </div>
            </div>

            {/* Mungkin Hadir */}
            <div className="card-inset relative bg-white/70 backdrop-blur-sm border border-amber-400/25 p-6 text-center hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-2xl block mb-3 text-zinc-700/70">❓</span>
              <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-red-700/70 block mb-2">
                Mungkin Hadir
              </span>
              <span className="font-cormorant font-light text-5xl text-red-800 block leading-none">
                {mungkinHadirCount}
              </span>
              <div className="mt-4 h-px bg-red-200/60 w-full overflow-hidden">
                <div
                  className="h-full bg-red-400/50"
                  style={{ width: `${tidakPct}%` }}
                />
              </div>
            </div>

            {/* Tidak Hadir */}
            <div className="card-inset relative bg-white/70 backdrop-blur-sm border border-amber-400/25 p-6 text-center hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-2xl block mb-3 text-zinc-700/70">✗</span>
              <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-red-700/70 block mb-2">
                Tidak Hadir
              </span>
              <span className="font-cormorant font-light text-5xl text-red-800 block leading-none">
                {tidakHadirCount}
              </span>
              <div className="mt-4 h-px bg-red-200/60 w-full overflow-hidden">
                <div
                  className="h-full bg-red-400/50"
                  style={{ width: `${tidakPct}%` }}
                />
              </div>
            </div>

            {/* Total Pax */}
            <div className="card-inset relative bg-white/70 backdrop-blur-sm border border-amber-400/25 p-6 text-center hover:-translate-y-0.5 transition-transform duration-200">
              <span className="text-2xl block mb-3">🌹</span>
              <span className="font-cinzel text-[0.55rem] tracking-[0.3em] uppercase text-amber-700/70 block mb-2">
                Total
              </span>
              <span className="font-cormorant font-light text-5xl text-amber-700 block leading-none">
                {totalGuestsCount}
              </span>
              <div className="mt-4 h-px bg-amber-300/40 w-full" />
            </div>
          </div>

          {/* ── TABLE HEADER ── */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="font-cormorant font-light italic text-amber-950 text-2xl">
              Daftar Tamu
            </h2>
            <span className="font-cinzel text-[0.58rem] tracking-[0.25em] uppercase text-amber-700 border border-amber-400/30 px-3 py-1.5">
              {total} Reservasi
            </span>
          </div>

          {/* Ornament divider */}
          <div className="flex items-center gap-2 mb-6">
            <span className="flex-1 h-px bg-amber-400/20" />
            <span className="text-amber-500 text-[0.5rem]">✦</span>
            <span className="text-amber-500 text-[0.35rem]">✦</span>
            <span className="text-amber-500 text-[0.5rem]">✦</span>
            <span className="flex-1 h-px bg-amber-400/20" />
          </div>

          {/* ── TABLE ── */}
          <div className="relative bg-white/70 backdrop-blur-sm border border-amber-400/20 overflow-x-auto">
            {/* Inner frame */}
            <div className="absolute inset-[5px] border border-amber-400/8 pointer-events-none z-10" />

            <table className="w-full min-w-[700px]">
              <thead>
                <tr
                  className="border-b border-amber-400/20"
                  style={{ background: "rgba(201,168,76,0.06)" }}
                >
                  {[
                    "#",
                    "Nama",
                    "No. HP",
                    "Status",
                    "Total Tamu",
                    "Ucapan",
                    "Waktu",
                  ].map((h) => (
                    <th
                      key={h}
                      className="font-cinzel text-[0.55rem] tracking-[0.25em] uppercase text-amber-700 px-5 py-4 text-left font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <p className="font-cormorant italic text-amber-700/40 text-xl">
                        Belum ada konfirmasi kehadiran
                      </p>
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp: any, idx: any) => (
                    <tr
                      key={rsvp.id}
                      className="border-b border-amber-400/10 last:border-0 transition-colors duration-150"
                      style={{ ["--tw-bg-opacity" as any]: 1 }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(201,168,76,0.04)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      {/* No */}
                      <td className="font-cinzel text-[0.65rem] text-amber-400/60 px-5 py-4">
                        {String(idx + 1).padStart(2, "0")}
                      </td>

                      {/* Nama */}
                      <td className="font-cormorant italic text-amber-950 text-base px-5 py-4 whitespace-nowrap">
                        {rsvp.name}
                      </td>

                      {/* No HP */}
                      <td className="text-amber-800/70 text-sm px-5 py-4 tracking-wide whitespace-nowrap">
                        {rsvp.phone}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-zinc-700">
                        {rsvp.attendance === "hadir" && <span>✓ Hadir</span>}

                        {rsvp.attendance === "tidak hadir" && (
                          <span>✗ Tidak Hadir</span>
                        )}

                        {rsvp.attendance === "mungkin hadir" && (
                          <span>? Mungkin</span>
                        )}
                      </td>

                      {/* Pax */}
                      <td className="font-cinzel text-amber-600 text-sm px-5 py-4 text-center">
                        {rsvp.guests ?? "—"}
                      </td>

                      {/* Ucapan */}
                      <td className="px-5 py-4" title={rsvp.message}>
                        <span className="text-sm italic text-amber-800/60">
                          {rsvp.quote || (
                            <span className="opacity-30 not-italic">—</span>
                          )}
                        </span>
                      </td>

                      {/* Waktu */}
                      <td className="px-5 py-4">
                        <span className="text-[0.78rem] text-amber-800/60 block whitespace-nowrap">
                          {new Date(rsvp.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="text-[0.68rem] text-amber-700/40 whitespace-nowrap">
                          {new Date(rsvp.created_at).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <p className="font-cinzel text-[0.55rem] tracking-[0.25em] text-amber-700/35 text-center mt-8">
            ✦ Data diperbarui secara real-time ✦
          </p>
        </div>
      </div>
    </>
  );
}
