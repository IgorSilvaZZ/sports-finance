import { ElementType } from "react";

type TextSizeType = "small" | "medium" | "large" | "extraLarge";

interface TextSizes {
  [key: string]: string;
}

interface DashCardProps {
  label: string;
  value: number | string;
  icon?: ElementType;
  width?: string;
  titleSize?: TextSizeType;
  subTitleSize?: TextSizeType;
}

const sizeTexts: TextSizes = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-lg",
  extraLarge: "text-xl",
};

export const Card = ({
  label,
  value,
  icon: Icon,
  titleSize = "medium",
  subTitleSize = "extraLarge",
}: DashCardProps) => {
  const sizeTitle = sizeTexts[titleSize];
  const sizeSubTitle = sizeTexts[subTitleSize];

  return (
    <>
      <div className='flex flex-col items-center justify-center flex-1 gap-2 p-4 bg-slate-100 border border-slate-200 rounded-lg shadow-sm relative transition-shadow hover:shadow-md'>
        <div className='absolute top-2 right-2'>{Icon && <Icon />}</div>
        <span className={`${sizeTitle} text-gray-500`}>{label}</span>
        <span className={`${sizeSubTitle} font-semibold text-gray-900`}>
          {value}
        </span>
      </div>
    </>
  );
};
