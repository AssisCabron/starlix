import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Since I didn't install class-variance-authority, I will implement a simple version or install it.
// Actually, standard is to use it. I should probably have installed it.
// I will just use a standard switch or object map for now to save a tool call, 
// OR I can quickly install it. The prompt didn't strictly say I couldn't add more deps.
// But I can write a robust component without it using clsx/tailwind-merge.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "neon"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(255,0,60,0.5)] border border-transparent",
      outline: "border border-primary/50 bg-transparent hover:bg-primary/10 text-primary hover:border-primary",
      ghost: "hover:bg-white/10 text-foreground",
      neon: "bg-transparent border border-primary text-primary shadow-[0_0_10px_#FF003C] hover:shadow-[0_0_20px_#FF003C,inset_0_0_10px_rgba(255,0,60,0.5)] hover:text-white hover:bg-primary transition-all duration-300",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-md px-8 text-lg uppercase tracking-wider",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
