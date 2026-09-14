import { useQuery } from "@tanstack/react-query";
import { fetchBooks, fetchCharacters, fetchSettings } from "./content";

export function useBooks() {
  return useQuery({ queryKey: ["books"], queryFn: fetchBooks, staleTime: 60_000 });
}

export function useCharacters() {
  return useQuery({ queryKey: ["characters"], queryFn: fetchCharacters, staleTime: 60_000 });
}

export function useSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: fetchSettings, staleTime: 60_000 });
}

export function useLibrary() {
  const books = useBooks();
  const characters = useCharacters();
  const settings = useSettings();
  return {
    books: books.data ?? [],
    characters: characters.data ?? [],
    settings: settings.data ?? {},
    loading: books.isLoading || characters.isLoading,
    settingsLoading: settings.isLoading,
    error: books.error || characters.error,
    refetch: () => {
      void books.refetch();
      void characters.refetch();
      void settings.refetch();
    },
  };
}
