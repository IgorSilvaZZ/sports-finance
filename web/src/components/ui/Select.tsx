import { forwardRef, SelectHTMLAttributes } from "react";

import { cn } from "../../lib/mergeClasses";

import { OptionsSelectType } from "../../utils/optionsSports";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionsSelectType[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, ...props }, forwardedRef) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{label}</span>
          <select
            {...props}
            ref={forwardedRef}
            className={cn(
              "px-4 py-4 outline-none bg-zinc-100 font-semibold",
              className,
            )}
            /* {...register("type")} */
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
  },
);
