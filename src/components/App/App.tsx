import 'modern-normalize';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import ErrorStub from '../ErrorStub/ErrorStub';
import Loading from '../Loading/Loading';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const debouncedSetQuery = useDebouncedCallback(setSearchQuery, 300);
  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes(page, searchQuery),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={debouncedSetQuery} />
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isError && <ErrorStub />}
      {isLoading && <Loading />}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
