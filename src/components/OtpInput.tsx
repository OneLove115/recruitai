'use client'

import { useRef, KeyboardEvent, ClipboardEvent } from 'react'

interface OtpInputProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export default function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '')

  function handleChange(i: number, char: string) {
    const d = char.replace(/\D/g, '').slice(0, 1)
    const next = [...digits]
    next[i] = d
    onChange(next.join(''))
    if (d && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted.padEnd(6, '').slice(0, 6))
    refs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
