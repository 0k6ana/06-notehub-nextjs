"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/app/lib/api";

export type NoteDetailsClientProps = {
  id: string;
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading note</p>;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}
