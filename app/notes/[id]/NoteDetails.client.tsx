'use client';

import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import NoteDetailsClientInner from "./NoteDetailsClientInner";

type NoteDetailsClientProps = {
  dehydratedState: unknown;
};

const queryClient = new QueryClient();

export default function NoteDetailsClient({ dehydratedState }: NoteDetailsClientProps) {

  hydrate(queryClient, dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsClientInner />
    </QueryClientProvider>
  );
}
