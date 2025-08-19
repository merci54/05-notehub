import axios from "axios"
import type { Note } from "../types/note";

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface fetchNotesProps {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (page: number, query: string) => {
    const res = await axios.get<fetchNotesProps>('/notes', {
        params: {
            page,
            search: query
        }
    });
    return res.data
}


export const deleteNote = async ({id}: Pick<Note, "id">) => {
    const res = await axios.delete<Note>(`/notes/${id}`);
    return res.data
}

export const createNote = async (newNote: Omit<Note, 'id' | "createdAt" | "updatedAt">) => {
    const res = await axios.post<Note>('/notes', newNote);
    return res.data
}