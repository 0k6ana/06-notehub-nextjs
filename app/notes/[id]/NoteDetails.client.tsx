'use client';

import { QueryClient, QueryClientProvider, useQuery, hydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "@/app/notes/[id]/Note.Details.module.css";

type NoteDetailsClientProps = {
  dehydratedState: unknown;
};

const queryClient = new QueryClient();

export default function NoteDetailsClient({ dehydratedState }: NoteDetailsClientProps) {

  hydrate(queryClient, dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsContent />
    </QueryClientProvider>
  );
}

function NoteDetailsContent() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, 
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.tag}>{data.tag}</p>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
}
