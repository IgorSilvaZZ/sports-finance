import { FormHTMLAttributes, forwardRef, ReactNode } from "react";

import { cn } from "../../lib/mergeClasses";

interface FormModalBaseProps extends FormHTMLAttributes<HTMLFormElement> {
  handleSubmit?: () => void;
  children?: ReactNode;
}

export const FormModalBase = forwardRef<HTMLFormElement, FormModalBaseProps>(
  ({ className, children, handleSubmit, ...props }, forwardedRef) => {
    return (
      <>
        <form
          {...props}
          ref={forwardedRef}
          className={cn("w-full flex flex-col gap-4 mt-5", className)}
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </>
    );
  }
);
