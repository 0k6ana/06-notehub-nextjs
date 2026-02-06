"use client"
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/app/lib/api";
import { notFound } from "next/navigation";
import NoteDetailsClient from "./NoteDetails.client";
import type { Note } from "@/types/note";

type  NotePageProps = {
  params: { id: string };
};

export default async function NotePage({ params }: NotePageProps ) {
  const queryClient = new QueryClient();

  try{
      await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });
  }catch(error){
  notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}


