"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NotesResponse } from "@/lib/api";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !data) return <p>Could not fetch the list of notes.</p>;

  return (
    <>
      <SearchBox
        value={search}
        onChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
      />

      {data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <button onClick={() => setIsModalOpen(true)}>Add Note</button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
