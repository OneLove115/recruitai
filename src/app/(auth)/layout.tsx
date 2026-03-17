export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
    >
      <a
        href="/"
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
      >
        ← Back to home
      </a>
      {children}
    </div>
  )
}
