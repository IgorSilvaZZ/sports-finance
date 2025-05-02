import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Private } from "../../routes/private";

export default function Main() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen w-screen'>
        <main className='w-full h-full overflow-y-hidden'>
          <ReactQueryDevtools />
          <Private />
        </main>
      </div>
    </QueryClientProvider>
  );
}
