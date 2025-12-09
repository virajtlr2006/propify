"use client"

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-transparent to-blue-950/10" />

      <div
        className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-400/10 rounded-full blur-3xl"
        style={{ animation: "float-up 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-tl from-teal-500/12 to-cyan-400/8 rounded-full blur-3xl"
        style={{ animation: "float-up 10s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-blue-500/12 to-cyan-400/8 rounded-full blur-3xl opacity-60"
        style={{ animation: "float-up 12s ease-in-out infinite 2s" }}
      />

      <div
        className="absolute top-0 right-1/4 w-2 h-96 bg-gradient-to-b from-cyan-500/25 via-cyan-400/12 to-transparent blur-lg"
        style={{
          animation: "float-up 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-40 left-1/3 w-1.5 h-80 bg-gradient-to-b from-blue-500/20 via-blue-400/10 to-transparent blur-lg"
        style={{
          animation: "float-up 5s ease-in-out infinite 0.5s",
        }}
      />
      <div
        className="absolute top-1/2 right-1/5 w-1 h-96 bg-gradient-to-b from-teal-500/15 to-transparent blur-lg"
        style={{
          animation: "float-up 6s ease-in-out infinite 1s",
        }}
      />

      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-cyan-400/60 rounded-full blur-sm" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400/50 rounded-full blur-sm" />
      <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-teal-400/60 rounded-full blur-sm" />
      <div className="absolute top-1/3 left-1/5 w-2.5 h-2.5 bg-cyan-400/40 rounded-full blur-sm" />
      <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-400/50 rounded-full blur-sm" />
    </div>
  )
}
