import type { ComponentProps } from 'react'
import { cn } from '../utils/cn'

type CardProps = ComponentProps<'div'> & { name: string }

export function Card({ className, name, ...props }: CardProps) {
  return <div data-slot="card" data-testid={`card-${name}`} className={cn('flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm', className)} {...props} />
}
