import { Box } from '@mui/system';

import { FormLogin } from '../components/FormLogin';

export const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '95vh'
        }}
      >
        <FormLogin />
      </Box>
    </>
  );
};
