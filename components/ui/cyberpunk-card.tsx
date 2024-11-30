import * as React from "react"
import { cn } from "@/lib/utils"

interface CyberpunkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowIntensity?: 'sm' | 'md' | 'lg'
}

export function CyberpunkCard({ className, glowIntensity = 'md', ...props }: CyberpunkCardProps) {
  return (
    <div
      className={cn(
        "cyberpunk-card rounded-lg transition-all duration-300",
        {
          'hover:shadow-sm hover:shadow-primary/30': glowIntensity === 'sm',
          'hover:shadow-md hover:shadow-primary/40': glowIntensity === 'md',
          'hover:shadow-lg hover:shadow-primary/50': glowIntensity === 'lg',
        },
        className
      )}
      {...props}
    />
  )
}

export function CyberpunkCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
}

export function CyberpunkCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("cyberpunk-glow text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

export function CyberpunkCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function CyberpunkCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  )
}

export function CyberpunkCardFooter({ className, ...props }: React.

