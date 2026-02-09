"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
      }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Could not fetch the list of notes.</p>;

  return <NoteList notes={data.notes} />;
}
