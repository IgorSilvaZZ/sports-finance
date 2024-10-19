interface DashCardProps {
  label: string;
  value: number | string;
  subTitle?: string;
}

export const DashCard = ({ label, subTitle, value }: DashCardProps) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-3 px-3 gap-3 h-full w-64 rounded-lg shadow-lg'>
        <div className='w-full h-14 flex flex-col gap-1 items-center justify-center'>
          <span className='text-lg font-semibold text-skyLight'>{label}</span>
          <span className='text-[11px] text-zinc-400'>{subTitle ?? ""}</span>
        </div>
        <span className='text-base'>{value}</span>
      </div>
    </>
  );
};
