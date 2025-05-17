import { Toaster } from "../ui/sonner";
import { QueryProvider } from "./query-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster richColors />
      {children}
    </QueryProvider>
  );
};
