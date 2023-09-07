import { FC } from 'react';
import { Container, Typography, Box } from '@mui/material';
import adultsImage from '../../assets/adults-page/adults.jpg'

const AdultsPage: FC = () => {
  return (
    <section>
      <Container>
        <Typography variant="h4" textAlign="center" mb={4}>
          Взрослые
        </Typography >
        <Typography textAlign='center' mb={4}>Современный подход и методики проверенные временем, дифференцированный подход к уровню и опыту занимающихся.</Typography>
        <Box component='img' sx={{maxWidth: '100%'}} src={adultsImage} alt='Тренировка'></Box>
      </Container>
    </section>
  );
};

export default AdultsPage;
