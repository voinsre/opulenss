import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative group">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-none border-b border-bone/20 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-bone/30 focus-visible:outline-none focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full group-focus-within:w-full" />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
