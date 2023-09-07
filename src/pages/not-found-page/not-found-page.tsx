import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111'
    }}>
      <Typography variant="h1">404 Not Found</Typography>
      <Typography>По данному адресу ничего нет</Typography>
      <Button sx={{textTransform: 'lowercase', fontSize: 16}} color="secondary" onClick={() => navigate(-1)}>
        Вернуться обратно
      </Button>
    </Box>
  );
};

export default NotFoundPage;
