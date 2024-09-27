import { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, ...props }, forwardedRef) => {
    return (
      <>
        <div className='w-full flex flex-col gap-2'>
          <span className='text-sm font-semibold'>{label}</span>
          <input
            {...props}
            ref={forwardedRef}
            className='w-full px-4 py-4 outline-none bg-zinc-100 font-semibold'
          />
        </div>
      </>
    );
  }
);
