import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({ label, ...props }: TextAreaProps) => {
  return (
    <>
      <div className='w-full flex flex-col gap-2'>
        <span className='text-sm font-semibold'>{label}</span>
        <textarea
          {...props}
          className='w-full px-4 py-4 outline-none bg-zinc-100 font-semibold'
        />
      </div>
    </>
  );
};
