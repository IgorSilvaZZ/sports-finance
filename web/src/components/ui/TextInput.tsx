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
              "w-full py-3 px-3 rounded-md outline-none bg-zinc-100 font-semibold",
              className
            )}
          />
        </div>
      </>
    );
  }
);
