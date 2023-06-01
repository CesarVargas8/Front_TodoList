import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { ApiRepository } from '../data/repository';
import { Task } from '../models/userData';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

interface Props {
  currentEdit: Task;
  update: () => void;
  onClose: () => void;
}

export const EditModal = ({ currentEdit, update, onClose }: Props) => {
  const [tarea, setTarea] = useState<string>(currentEdit.task1);

  const handleSubmit = async () => {
    if (!tarea) {
      void Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede guardar una tarea vacia'
      });

      return;
    }

    const response = await ApiRepository.updateTask({
      id: currentEdit.id,
      data: {
        task: tarea,
        idUser: currentEdit.idUser
      }
    });
    if (!response.error) {
      void Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo guardar la tarea'
      });

      return;
    }
    void Swal.fire({
      icon: 'success',
      title: 'Tarea guardada',
      showConfirmButton: false,
      timer: 1500
    });

    update();
  };

  return (
    <>
      <Modal
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        open={true}
        autoComplete='on'
        onClose={onClose}
      >
        <Box sx={style}>
          <TextField
            id='tarea'
            value={tarea}
            onChange={(e) => {
              setTarea(e.target.value);
            }}
            label='Nombre de la tarea'
            variant='standard'
            sx={{ width: '100%', mb: 1, color: '#0C231E' }}
            InputLabelProps={{
              style: { color: '#0C231E' }
            }}
          />
          <Grid
            item
            xs={12}
            container
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Button
              onClick={onClose}
              color='primary'
              variant='contained'
              sx={{
                m: 1
              }}
            >
              Cancelar
            </Button>

            <Button
              color='primary'
              variant='contained'
              type='submit'
              sx={{
                m: 1
              }}
            >
              Guardar
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
