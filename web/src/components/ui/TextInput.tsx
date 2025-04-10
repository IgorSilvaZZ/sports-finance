import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "../../lib/mergeClasses";
import { Label } from "./Label";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, className, ...props }, forwardedRef) => {
    return (
      <>
        <div className='w-full flex flex-col gap-2'>
          <Label text={label} />
          <input
            {...props}
            ref={forwardedRef}
            className={cn(
              "w-full px-4 py-4 outline-none bg-zinc-100 font-semibold",
              className
            )}
          />
        </div>
      </>
    );
  }
);
