import { FC } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CompetitionImage from '../../assets/competitions-page/competition-2.jpg';

const CompetitionsPage: FC = () => {
  return (
    <section>
      <Container>
        <Typography variant="h4" textAlign="center" mb={4}>
          Соревнования
        </Typography>
        <Typography textAlign="center" mb={4}>
          От новичка до чемпиона! Вступив в ряды нашей школы вам открываются пути большого спорта,как любительского так и профессионального!
        </Typography>
        <Typography textAlign="center" mb={4}>
          Наша школа аккредитована федерацией тайского бокса г.Москвы,накопленный опыт и контакты позволяют в полной мере раскрыть потенциал
          как ребенка так и профессионального спортсмена!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box component='img' sx={{maxWidth: '100%', borderRadius: 1}} src={CompetitionImage} alt='Фото с соревнований'></Box>
        </Box>
      </Container>
    </section>
  );
};

export default CompetitionsPage;
