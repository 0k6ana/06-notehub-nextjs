"use client";

import { useQuery, QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

type NoteDetailsClientProps = {
  dehydratedState: unknown;
};

const queryClient = new QueryClient();

export default function NoteDetailsClient({ dehydratedState }: NoteDetailsClientProps) {
  const { id } = useParams<{ id: string }>();

  hydrate(queryClient, dehydratedState);

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
