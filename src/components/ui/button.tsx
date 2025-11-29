"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
    {
        variants: {
            variant: {
                default: "bg-emerald-deep text-bone border border-gold/30 hover:border-gold",
                destructive:
                    "bg-plum text-bone hover:bg-plum/90",
                outline:
                    "border border-emerald-teal bg-transparent text-emerald-teal hover:text-bone",
                secondary:
                    "bg-emerald-teal/20 text-bone border border-emerald-teal/50",
                ghost: "text-bone hover:text-gold",
                link: "text-blush underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-8 py-2",
                sm: "h-9 rounded-sm px-3",
                lg: "h-14 rounded-sm px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // For default variant, we add the gold fill animation
        if (variant === 'default' && !asChild) {
            return (
                <motion.button
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref as any}
                    whileHover="hover"
                    initial="initial"
                    {...(props as any)}
                >
                    <motion.div
                        className="absolute inset-0 bg-gold z-0"
                        variants={{
                            initial: { y: "100%" },
                            hover: { y: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 mix-blend-difference">{children}</span>
                </motion.button>
            )
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
