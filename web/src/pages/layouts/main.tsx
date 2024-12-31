import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Private } from "../../routes/private";

export default function Main() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <main className="w-full px-12 h-full">
          <ReactQueryDevtools />
          <Private />
        </main>
      </div>
    </QueryClientProvider>
  );
}
