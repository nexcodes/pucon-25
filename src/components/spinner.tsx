import { cn } from "@/lib/utils";
import React from "react";

// Import the shadcn/ui components
import { Loader2 } from "lucide-react";

// Define the props for our Spinner component
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "destructive";
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    // Map size to Tailwind classes
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };

    // Map variant to Tailwind classes
    const variantClasses = {
      default: "text-gray-400",
      primary: "text-blue-600",
      secondary: "text-purple-600",
      destructive: "text-red-600",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <Loader2
          className={cn(
            "animate-spin",
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
