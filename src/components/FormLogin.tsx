import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { useAuth } from './AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0C231E',
      dark: '#081815'
    }
  }
});

const alingCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  return (
    <>
      <Paper
        onSubmit={(e) => {
          e.preventDefault();
          if (user.trim() === '' || password.trim() === '') {
            void Swal.fire({
              title: 'Campos vacios',
              text: 'Por favor ingrese un usuario y contraseña',
              icon: 'warning',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#0C231E'
            });

            return;
          }
          login(user, password);
        }}
        elevation={2}
        component='form'
        sx={(theme) => ({
          width: 400,
          height: 360,
          ...alingCenter,
          [theme.breakpoints.down(913)]: {
            width: 500,
            height: 700
          },
          [theme.breakpoints.down(768)]: {
            width: 300,
            height: 500
          },
          [theme.breakpoints.down(376)]: {
            width: 280,
            height: 450
          }
        })}
        autoComplete='off'
      >
        <Typography
          variant='h5'
          sx={(theme) => ({
            marginBottom: '10px',
            marginTop: '10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem'
            }
          })}
        >
          To do List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: '#0C231E', mr: 1, my: 0.5 }} />
          <TextField
            id='user'
            value={user}
            label='Usuario'
            onChange={(e) => setUser(e.target.value)}
            variant='standard'
            sx={(theme) => ({
              width: '250px',
              color: '#0C231E',
              [theme.breakpoints.down(913)]: {
                width: '300px'
              },
              [theme.breakpoints.down(768)]: {
                width: '200px'
              }
            })}
            InputLabelProps={{
              style: { color: '#0C231E' }
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <KeyIcon sx={{ color: '#0C231E', mr: 1, my: 0.5 }} />
          <TextField
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Contraseña'
            variant='standard'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            margin='dense'
            sx={(theme) => ({
              width: '250px',
              color: '#0C231E',
              [theme.breakpoints.down(913)]: {
                width: '300px'
              },
              [theme.breakpoints.down(768)]: {
                width: '200px'
              }
            })}
            InputLabelProps={{
              style: { color: '#0C231E' }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle-password-visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ color: '#0C231E' }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Grid
          sx={{
            marginTop: '10px'
          }}
        >
          <ThemeProvider theme={theme}>
            <Button variant='contained' color='primary' type='submit'>
              Ingresar
            </Button>
          </ThemeProvider>
        </Grid>
      </Paper>
    </>
  );
};
