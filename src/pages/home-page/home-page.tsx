import { FC } from 'react';
import mainImage from '../../assets/home-page/main.jpg';
import topFightSvg from '../../assets/home-page/top-fight.svg';
import teamImage from '../../assets/home-page/team.jpg';
import adultsImage from '../../assets/home-page/adults.jpg';
import childrenImage from '../../assets/home-page/children.jpg';
import campsImage from '../../assets/home-page/camps.jpeg';
import competitionsImage from '../../assets/home-page/competitions.jpg';
import shopImage from '../../assets/home-page/shop.jpg';
import { Box, Container, Typography, Divider, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/constants';
import { theme } from '../../components/theme/theme';

const imageListData = [
  {
    to: Routes.Team,
    title: 'Команда',
    src: teamImage,
  },
  {
    to: Routes.Children,
    title: 'Дети',
    src: childrenImage,
  },
  {
    to: Routes.Adults,
    title: 'Взрослые',
    src: adultsImage,
  },
  {
    to: Routes.Camps,
    title: 'Сборы',
    src: campsImage,
  },
  {
    to: Routes.Competitions,
    title: 'Турниры',
    src: competitionsImage,
  },
  {
    to: Routes.Shop,
    title: 'Магазин',
    src: shopImage,
  },
];

const ImageListItemLink: FC<{ to: string; src: string; title: string; isMatchedUp: boolean, index: number }> = ({ to, src, title, isMatchedUp, index }) => {
  const cols = isMatchedUp ? 1 : index === 0 ? 2 : 1
  const rows = isMatchedUp ? 1 : index === 0 ? 2 : 1

  return (
    <ImageListItem
      component={Link}
      to={to}
      cols={cols}
      rows={rows}
    >
      <img style={{ borderRadius: 4 }} src={src} alt={title} />
      <ImageListItemBar sx={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} title={title} position="bottom" />
    </ImageListItem>
  );
};

const HomePage: FC = () => {
  const isMatchedUp = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <section>
      <Box position="relative">
        <Box component="img" sx={{ maxWidth: '100%', objectFit: 'cover' }} src={mainImage} alt="Лого" />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100% - 4px)',
            backgroundColor: 'rgba(0, 0, 0, .8)',
          }}
        >
          <Box component="img" sx={{ maxWidth: '50%' }} src={topFightSvg}></Box>
        </Box>
      </Box>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Divider sx={{ mb: 8 }} />
        <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
          О нас
        </Typography>
        <Typography sx={{ mb: 2 }} textAlign="center">
          Школа тайского бокса - "TOP FIGHT" - новое имя с большой историей!
        </Typography>
        <Typography sx={{ mb: 8 }} textAlign="center">
          Сообщество объединенное философией и силой искусства Муай Тай.
        </Typography>
        <Divider sx={{ mb: 8 }} />
        <ImageList sx={{ m: 0 }} variant="quilted" cols={2} gap={4}>
          {imageListData.map(({ to, src, title }, index) => (
            <ImageListItemLink key={index} to={to} src={src} title={title}  isMatchedUp={isMatchedUp} index={index} />
          ))}
        </ImageList>
      </Container>
    </section>
  );
};

export default HomePage;
