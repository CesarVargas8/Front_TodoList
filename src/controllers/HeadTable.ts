import { HeadItem } from '../components/DataTable';

export const columns: HeadItem[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'task1', label: 'Tarea', minWidth: 200 },
  {
    id: 'dateTask',
    label: 'Fecha de creación',
    minWidth: 100,
    format: (value: string | number) => new Date(value).toLocaleString()
  }
];
