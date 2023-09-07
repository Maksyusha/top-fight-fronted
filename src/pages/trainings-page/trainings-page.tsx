import { FC } from 'react';
import { Container, Typography, List, ListItem } from '@mui/material';

const TrainingsPage: FC = () => {
  return (
    <section>
      <Container sx={{ p: { xs: 4, sm: 8 } }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Индивидуальные тренировки
        </Typography>
        <List>
          <ListItem>
            <Typography>- Программа тренировок строиться под ваш уровень и под ваши особенности</Typography>
          </ListItem>
          <ListItem>
            <Typography>- Современные методика и экипировка</Typography>
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
      </Container>
    </section>
  );
};

export default TrainingsPage;
