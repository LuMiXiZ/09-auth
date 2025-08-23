import { nextServer } from "./api";
import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";

export interface NoteSearchResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type ServerResponse = {
  success: boolean;
};

export type PatchUser = {
  username?: string;
  email: string;
};

export type ApiError = {
  error: string;
  response?: {
    data: {
      response: {
        message: string;
      };
    };
  };
};

export const fetchNotes = async (
  { page = 1, perPage = 12, search, tag }: FetchNotesParams = {
    page: 1,
    perPage: 12,
  }
): Promise<NoteSearchResponse> => {
  const params: FetchNotesParams = { page, perPage };
  if (search && search.trim() !== "") {
    params.search = search.trim();
  }
  if (tag && tag !== "All") {
    params.tag = tag.trim();
  }
  const response = await nextServer.get<NoteSearchResponse>(`/notes`, {
    params,
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (id: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", id);
  return response.data;
};

export const login = async (id: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", id);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<ServerResponse>("/auth/session");
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export const patchMe = async (patchUser: PatchUser) => {
  const { data } = await nextServer.patch<User>(`/users/me`, patchUser);
  return data;
};

export const logOut = async () => {
  const response = await nextServer.post<ServerResponse>("/auth/logout");
  return response.data;
};
