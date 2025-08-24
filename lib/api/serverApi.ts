import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import type { Note } from "@/types/note";
import type {
  FetchNotesParams,
  NoteSearchResponse,
  ServerResponse,
} from "./clientApi";

export const fetchNotes = async (
  { page = 1, perPage = 12, search, tag }: FetchNotesParams = {
    page: 1,
    perPage: 12,
  }
): Promise<NoteSearchResponse> => {
  const cookieData = cookies();
  const params: FetchNotesParams = { page, perPage };

  if (search && search.trim() !== "") params.search = search.trim();
  if (tag && tag !== "All") params.tag = tag.trim();

  const { data } = await nextServer.get<NoteSearchResponse>("/notes", {
    params,
    headers: { Cookie: cookieData.toString() },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieData = cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer.get<ServerResponse>("auth/session", {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};

export const getServerMe = async () => {
  const cookieData = await cookies();
  const { data } = await nextServer.get<User>("users/me", {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};
