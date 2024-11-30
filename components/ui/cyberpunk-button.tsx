import * as React from "react"
import { cn } from "@/lib/utils"

export interface CyberpunkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const CyberpunkButton = React.forwardRef<HTMLButtonElement, CyberpunkButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "cyberpunk-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CyberpunkButton.displayName = "CyberpunkButton"

export { CyberpunkButton }

