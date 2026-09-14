import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn btn--${variant}`}>
      {children}
    </button>
  )
}
