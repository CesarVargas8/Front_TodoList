import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useState } from 'react';

import { Task } from '../models/userData';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';

export interface HeadItem {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center' | 'inherit' | 'right' | 'left' | 'justify' | undefined;
  format?: (value: string | number) => string;
}

interface Props {
  head: HeadItem[];
  body: Task[];
  update: () => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const DataTable: FC<Props> = ({ head, body, update }) => {
  // const [search, setSearch] = useState('');
  const [data, _setData] = useState(body);
  const [currentEditing, setCurrentEditing] = useState<Task | null>(null);
  const [currentDeleting, setCurrentDeleting] = useState<Task | null>(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {head.map((column) => (
              <StyledTableCell key={column.id} align='center'>
                {column.label}
              </StyledTableCell>
            ))}
            <StyledTableCell
              key='edit_delete'
              align='center'
              style={{ minWidth: 100 }}
            >
              Acciones
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <StyledTableRow key={row.id}>
                {head.map((column) => {
                  const value = row[column.id as keyof typeof row];

                  return (
                    <StyledTableCell
                      key={column.id}
                      component='th'
                      scope='row'
                      align='center'
                    >
                      {column.format ? column.format(value) : value}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => setCurrentEditing(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => setCurrentDeleting(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
          {currentEditing && (
            <EditModal
              update={update}
              currentEdit={currentEditing}
              onClose={() => setCurrentEditing(null)}
            />
          )}
          {currentDeleting && (
            <DeleteModal
              update={update}
              currentDeleting={currentDeleting}
              onClose={() => setCurrentDeleting(null)}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
