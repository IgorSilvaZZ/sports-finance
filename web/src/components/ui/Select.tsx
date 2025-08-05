import { forwardRef, SelectHTMLAttributes } from "react";

import { cn } from "../../lib/mergeClasses";

import { OptionsSelectType } from "../../types/FieldsType";

import { Label } from "./Label";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionsSelectType[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, ...props }, forwardedRef) => {
    return (
      <>
        <div className='flex flex-col gap-2'>
          <Label text={label} />
          <select
            {...props}
            ref={forwardedRef}
            className={cn(
              "px-3 py-3 rounded-md outline-none bg-zinc-100 font-semibold",
              className
            )}
          >
            {options.map(({ label, value }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
);
