import { Private } from "../../routes/private";

export default function Main() {
  return (
    <>
      <div className='h-screen w-screen'>
        <main className='w-full px-12 h-full'>
          <Private />
        </main>
      </div>
    </>
  );
}
