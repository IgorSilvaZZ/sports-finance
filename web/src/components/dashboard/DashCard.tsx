interface DashCarProps {
  label: string;
  value: number | string;
}

export const DashCard = ({ label, value }: DashCarProps) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-5 px-5 gap-3 h-full w-72 rounded-lg shadow-lg'>
        <span className='text-xl font-semibold text-skyLight'>{label}</span>
        <span className='text-lg'>{value}</span>
      </div>
    </>
  );
};
