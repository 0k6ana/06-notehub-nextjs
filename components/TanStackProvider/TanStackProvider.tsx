"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export interface TanStackProviderProps {
    children: ReactNode;
}

const TanStackProvider = ({ children }:TanStackProviderProps ) => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};

export default TanStackProvider;
