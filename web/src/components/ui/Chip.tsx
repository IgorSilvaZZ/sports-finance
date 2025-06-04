import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../../lib/mergeClasses";

export const Chip = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          "bg-zinc-200 text-zinc-800 text-xs px-2 py-1 rounded-full max-w-28",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
