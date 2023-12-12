import { FC } from 'react';
import { Container, Typography, List, ListItem, Box } from '@mui/material';
import trainingsImage from '../../assets/trainings-page/trainings.jpg'

const TrainingsPage: FC = () => {
  return (
    <section>
      <Container sx={{ p: { xs: 4, sm: 8 } }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Индивидуальные тренировки
        </Typography>
        <List sx={{p: 0, mb: 4}}>
          <ListItem>
            <Typography>- Программа тренировок строиться под ваш уровень и под ваши особенности</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Современная методика и экипировка</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Внимание тренера будет сфокусировано только на Вас</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Детальный разбор вашей техники</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Проработка обще физической и специальной выносливости</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Любой вопрос тренеру - всегда получите развернутый ответ</Typography>
          </ListItem>
        </List>
        <Box component='img' sx={{maxWidth: '100%'}} src={trainingsImage} alt='Фото с индивидуальных тренировок'/>
      </Container>
    </section>
  );
};

export default TrainingsPage;
