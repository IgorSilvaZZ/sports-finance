import { forwardRef, TextareaHTMLAttributes } from "react";

import { cn } from "../../lib/mergeClasses";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, ...props }, forwardedRef) => {
    return (
      <>
        <div className='w-full flex flex-col gap-2'>
          <span className='text-sm font-semibold'>{label}</span>
          <textarea
            {...props}
            ref={forwardedRef}
            className={cn(
              "w-full px-3 py-3 outline-none bg-zinc-100 font-semibold resize-none text-sm",
              className
            )}
          />
        </div>
      </>
    );
  }
);
