import emptyImage from "../assets/list-event-empty.png";

interface EmptyListProps {
  children: JSX.Element | JSX.Element[];
}

export const EmptyList = ({ children }: EmptyListProps) => {
  return (
    <div className='w-full flex flex-col flex-1 items-center justify-center gap-5 leading-tight'>
      <img
        src={emptyImage}
        alt='List empty events image'
        className='w-[200px]'
      />
      {children}
    </div>
  );
};
