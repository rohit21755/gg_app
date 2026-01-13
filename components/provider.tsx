// app/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ToastProvider } from "@/contexts/ToastContext";
import { RegistrationProvider } from "@/contexts/RegistrationContext";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
