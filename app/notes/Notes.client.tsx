"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import type { NotesResponse } from "@/types/note";

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData:keepPreviousData,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearchChange = (value: string) => {
    setPage(1); 
    setSearch(value);
  };
  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Could not fetch the list of notes.</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <NoteList notes={data.notes} />
      <Pagination
        pageCount={data.totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <button onClick={handleOpenModal}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>Modal Content</h2>
          <p>You can put anything here!</p>
          <button onClick={handleCloseModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}
