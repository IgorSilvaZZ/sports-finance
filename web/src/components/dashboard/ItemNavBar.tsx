interface ItemNavBarProps {
  children: string;
  handleClick: () => void;
}

export const ItemNavBar = ({
  children: title,
  handleClick,
}: ItemNavBarProps) => {
  return (
    <>
      <span
        className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'
        onClick={handleClick}
      >
        {title}
      </span>
    </>
  );
};
