import { FC } from 'react';
import { Container, Typography, List, ListItem, Box, Divider } from '@mui/material';
import fedorenkovImage from '../../assets/team-page/fedorenkov.jpg';
import topFightImage from '../../assets/home-page/top-fight.jpg';
import { IPersonData } from '../../services/types/team';
import { useAppSelector } from '../../hooks/redux-hooks';

// const teamData: IPersonData[] = [
//   {
//     role: 'Тренер',
//     name: 'Федоренков Виталий Сергеевич',
//     photo: fedorenkovImage,
//     regalia: ['Мастер спорта РФ'],
//     about: [
//       'Основатель и главный тренер школы тайского бокса “TOP FIGHT”, организатор турнира “Challenge Muay Thai Championship”, 20 лет тренерской работы,высшее спортивное образование и большой опыт выступлений на турнирах различного уровня. Разработал свою уникальную авторскую методику,которая позволила воспитывать победителей и призеров региональных,всероссийских и международных первенств.',
//       'Это настоящий наставник и друг, умеющий грамотно донести материал до учеников, создать дружественную атмосферу и привить любовь к спорту!',
//     ],
//   },
//   {
//     role: 'Тренер',
//     name: 'Сизов Сергей',
//     photo: topFightImage,
//     regalia: ['Чемпион Москвы по тайскому боксу', 'КМС по Кудо'],
//     about: [
//       'Всесторонне развитый боец и тренер,искренне любящий спорт и здоровый образ жизни. Настоящий пример для молодежи и подрастающего поколения!',
//       'Действующий спортсмен школы.',
//     ],
//   },
//   {
//     role: 'Спортсмен ',
//     name: 'Маквецян Гоар',
//     photo: topFightImage,
//     regalia: [
//       'Серебряный призер первенства России 2023г.',
//       'Серебряный призер ЦФО и СЗФО центрального региона России 2023г.',
//       'Чемпионка Москвы 2021/2022г.',
//       'Чемпионка кубка Москвы 2021/2022г.',
//       'Неоднократная победитель региональных турниров.',
//     ],
//     about: [],
//   },
//   {
//     role: 'Спортсмен ',
//     name: 'Тараненко Станислав',
//     photo: topFightImage,
//     regalia: [
//       'Серебряный призер ЦФО и СЗФО центрального региона России',
//       'Чемпион открытого первенства Москвы по тайскому боксу 2022г.',
//       'Неоднократный победитель фестивалей и региональных турниров.',
//     ],
//     about: [],
//   },
//   {
//     role: 'Спортсмен ',
//     name: 'Дьяков Илья',
//     photo: topFightImage,
//     regalia: ['Участник первенства России 2023', 'Серебряный призер ЦФО и СЗФО региона России 2022г.', 'Чемпион Москвы 2022г.'],
//     about: [],
//   },
// ];

interface IPersonItem {
  personData: IPersonData;
  divider: boolean;
}

const PersonItem: FC<IPersonItem> = ({ personData, divider }) => {
  return (
    <ListItem sx={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Typography>{personData.role}</Typography>
      <Typography variant="h6">{personData.name}</Typography>
      <Box component="img" sx={{ width: '100%', objectFit: 'cover' }} src={personData.photo} alt={personData.name} />
      <List sx={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
        {personData.regalia.map((item, index) => {
          return (
            <ListItem sx={{ padding: 0 }} key={index}>
              <Typography>{item}</Typography>
            </ListItem>
          );
        })}
      </List>
      {/* {personData.about.map((item, index) => {
        return <Typography key={index}>{item}</Typography>;
      })} */}
      <Typography>{personData.about}</Typography>
      {divider ? <Divider sx={{ my: 8, width: '100%' }} /> : null}
    </ListItem>
  );
};

const TeamPage: FC = () => {
  const { team } = useAppSelector(store => store.team);

  if (!team) {
    return <Box></Box>;
  }

  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Команда
        </Typography>
        <List sx={{ padding: 0 }}>
          {team.map((item, index) => {
            return <PersonItem key={index} personData={item} divider={index !== team.length - 1} />;
          })}
        </List>
      </Container>
    </section>
  );
};

export default TeamPage;
