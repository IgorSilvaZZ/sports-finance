import { forwardRef, LabelHTMLAttributes } from "react";
import { cn } from "../../lib/mergeClasses";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ text, className, ...props }) => {
    return (
      <label {...props} className={cn("text-sm font-semibold", className)}>
        {text}
      </label>
    );
  }
);
