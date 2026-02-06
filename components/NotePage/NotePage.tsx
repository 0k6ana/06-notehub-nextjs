

import Link from 'next/link';
import type { Note } from '@/types/note';

type NotePageProps = {
  item: Note;
};

const NotePage = ({ item }: NotePageProps) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`}>{item.title}</Link>
    </li>
  );
};

export default NotePage

