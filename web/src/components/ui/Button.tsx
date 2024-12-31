import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/mergeClasses";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <button
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-4 w-full mt-3 bg-red-500 text-white font-semibold transition-colors hover:bg-red-600 disabled:bg-zinc-100",
        className,
      )}
    >
      {children}
    </button>
  );
});
