import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import AppRouter from "./router/router";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </QueryClientProvider>
  );
}
