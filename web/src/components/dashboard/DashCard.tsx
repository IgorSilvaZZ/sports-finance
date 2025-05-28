interface DashCardProps {
  label: string;
  value: number | string;
}

export const DashCard = ({ label, value }: DashCardProps) => {
  return (
    <>
      <div className='w-40 flex flex-col items-center justify-center p-4 gap-2 flex-1 bg-slate-100 border border-slate-200 rounded-lg shadow-sm relative'>
        <div className='absolute top-2 right-2'>📅</div>
        <span className='text-sm text-gray-500'>{label}</span>
        <span className='text-xl font-semibold text-gray-900'>{value}</span>
      </div>
    </>
  );
};
