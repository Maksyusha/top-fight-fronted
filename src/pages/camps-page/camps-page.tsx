import { FC } from 'react';
import { Container, Typography, Box } from '@mui/material';
import campImage from '../../assets/camps-page/camp-1.jpg'

const CampsPage: FC = () => {
  return (
    <section>
      <Container>
        <Typography variant="h4" textAlign="center" mb={4}>
          Учебно-тренировочные сборы
        </Typography>
        <Typography textAlign="center" mb={4}>
          Предстартовые сезонные,так и ежегодные сборы для повышения физической и технической подготовки спортсменов.
        </Typography>
        <Box component='img' sx={{width: '100%'}} src={campImage} alt='Фото со сборов'></Box>
      </Container>
    </section>
  );
};

export default CampsPage;
