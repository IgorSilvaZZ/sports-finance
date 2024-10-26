import { FormHTMLAttributes, forwardRef, ReactNode } from "react";

import { cn } from "../../lib/mergeClasses";

interface FormModalBaseProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export const FormModalBase = forwardRef<HTMLFormElement, FormModalBaseProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <>
        <form
          {...props}
          ref={forwardedRef}
          className={cn("w-full flex flex-col gap-4 mt-5", className)}
        >
          {children}
        </form>
      </>
    );
  }
);
