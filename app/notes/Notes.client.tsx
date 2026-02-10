"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NotesResponse } from "@/lib/api";

const PAGE = 1;
const SEARCH = "";

export default function NotesClient() {
  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", PAGE, SEARCH],
    queryFn: () =>
      fetchNotes({
        page: PAGE,
        perPage: 12,
        search: SEARCH,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes</p>;

  return (
    <ul>
      {data.notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}
