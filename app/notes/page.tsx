import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const PAGE = 1;
const PER_PAGE = 12;
const SEARCH = "";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", PAGE, SEARCH],
      queryFn: () =>
        fetchNotes({
          page: PAGE,
          perPage: PER_PAGE,
          search: SEARCH,
        }),
    });
  } catch {
    return <p>Cannot fetch notes</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
