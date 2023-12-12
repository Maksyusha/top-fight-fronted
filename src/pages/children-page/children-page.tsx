import { FC } from 'react';
import { Container, Typography, Box, Divider, List, ListItem } from '@mui/material';
import children1Image from '../../assets/children-page/children-1.jpg';

const ChildrenPage: FC = () => {
  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Box display="flex" gap={4} mb={8}>
          <Box>
            <Typography variant="h2" mb={4} textAlign="center">
              Дети
            </Typography>
            <Typography textAlign="center">
              Более двадцатилетний опыт работы с детьми сформировал свою уникальную методику. В основе которой лежит не только знания о
              тайском боксе и его физическое развитие,но и формирование личностных качеств: таких как дисциплина,ответственность,уважение к
              старшим и наставнику.
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Typography variant="h2" sx={{ mt: 8 }} textAlign="center">
          Наши принципы работы:
        </Typography>
        <List sx={{ pt: 2, pb: 4 }}>
          <ListItem>
            <Typography>- Тренировочный процесс создается согласно возрастным особенностям детей</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Принцип от простого к сложному являются основополагающим</Typography>
          </ListItem>
          <ListItem>
            <Typography>
              - Учитываем индивидуальные психические и физиологические особенности в построение тренировочного процесса
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              - Вовлечение в тренировочный процесс и привитие любви к спорту,по средствам игровой манеры и дружественной атмосферы на
              тренировке
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              - Привитие философии тайского бокса формирующих дисциплину, уважение к наставнику, старшим, любви к родине и своей культуре
            </Typography>
          </ListItem>
        </List>
        <Box component="img" sx={{ maxWidth: '100%' }} src={children1Image} alt="Тренировка детей"></Box>
      </Container>
    </section>
  );
};

export default ChildrenPage;
