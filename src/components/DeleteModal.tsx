import { Box, Button, Grid, Modal, Typography } from '@mui/material';
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
  currentDeleting: Task;
  onClose(): void;
  update: () => void;
}

export const DeleteModal = ({ currentDeleting, onClose, update }: Props) => {
  const id = currentDeleting.id;

  return (
    <Modal
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        ApiRepository.deleteTask({ id })
          .then((response) => {
            if (!response.error) {
              void Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el registro'
              });
            } else {
              void Swal.fire({
                icon: 'success',
                title: 'Registro eliminado',
                showConfirmButton: false,
                timer: 1500
              });
              update();
            }
          })
          .catch((error) => {
            console.error(error);
            // Manejar cualquier error adicional si es necesario
          });
      }}
      open={true}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{
            mb: 2
          }}
        >
          ¿Quiere eliminar el registro?
        </Typography>
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
            No
          </Button>

          <Button
            color='primary'
            variant='contained'
            type='submit'
            sx={{
              m: 1
            }}
          >
            Si
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};
