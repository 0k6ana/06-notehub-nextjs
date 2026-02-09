import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./[id]/NoteDetails.client";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const resolvedParams = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", resolvedParams.id],
      queryFn: () => fetchNoteById(resolvedParams.id),
    });
  } catch {
    notFound();
  }

  return <NoteDetailsClient dehydratedState={dehydrate(queryClient)} />;
}
