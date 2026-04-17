import { Construction } from 'lucide-react'

export default function Placeholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Construction size={28} className="text-white/30" />
      </div>
      <h2 className="text-xl font-bold text-white/70">{name}</h2>
      <p className="text-sm text-white/30">Coming Soon — we'll fill this in the next steps.</p>
    </div>
  )
}
