import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../components/AuthContext';
import { CreateModal } from '../components/CreateModal';
import { DataTable } from '../components/DataTable';
import { ListTask } from '../components/ListTasks';
import { columns } from '../controllers/HeadTable';

export const MainPage = () => {
  const user = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2, mt: 5 }}>
        <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
          Bienvenido {user.user?.user1}
        </Typography>
        <ListTask>
          {(data, getData) => (
            <>
              <Grid
                container
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
                sx={{ mb: 2, pr: 4 }}
              >
                <Button
                  variant='contained'
                  onClick={() => navigate('/', { replace: true })}
                >
                  Cerrar Sesión
                </Button>
              </Grid>
              <Grid
                container
                direction='row'
                justifyContent='flex-end'
                alignItems='center'
                sx={{ mb: 2, pr: 4 }}
              >
                <CreateModal update={getData} />
              </Grid>
              <DataTable body={data} head={columns} update={getData} />
            </>
          )}
        </ListTask>
      </Box>
    </>
  );
};
