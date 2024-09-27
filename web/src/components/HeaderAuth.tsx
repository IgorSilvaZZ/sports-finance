import { SoccerBall } from "@phosphor-icons/react";

export const HeaderAuth = () => {
  return (
    <>
      <div className='flex items-center gap-4'>
        <SoccerBall size={38} />
        <p className='text-lg uppercase text-zinc-500 font-semibold'>
          Sports Finance
        </p>
      </div>
    </>
  );
};
