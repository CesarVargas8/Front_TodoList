import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { ApiRepository } from '../data/repository';
import { useAuth } from './AuthContext';

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
  update: () => void;
}

export const CreateModal = ({ update }: Props) => {
  const user = useAuth();
  const [tarea, setTarea] = useState<string>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTarea('');
  };

  const handleSubmit = async () => {
    if (!tarea) {
      void Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede guardar una tarea vacia'
      });

      return;
    }

    const response = await ApiRepository.createTask({
      data: {
        task: tarea,
        idUser: user.user?.id ?? 0
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
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} color='primary' variant='contained'>
        <AddIcon sx={{ height: '20px', width: '20px', pr: 1 }} /> Agregar
      </Button>
      <Modal
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
        open={open}
        autoComplete='on'
        onClose={handleClose}
      >
        <Box sx={style}>
          <TextField
            id='tarea'
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
              onClick={handleClose}
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
