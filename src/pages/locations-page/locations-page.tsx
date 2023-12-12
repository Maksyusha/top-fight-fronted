import { FC, useState, useEffect } from 'react';
import { useMediaQuery, Container, Typography, List } from '@mui/material';
import { theme } from '../../components/theme/theme';
import LocationItem from '../../components/location-item/location-item';
import { useAppSelector } from '../../hooks/redux-hooks';

const LocationsPage: FC = () => {
  const isSmMatchDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdMatchDown = useMediaQuery(theme.breakpoints.down('md'))
  const { locations } = useAppSelector(store => store.locations);
  const [frameWidth, setFrameWidth] = useState(window.innerWidth >= 1200 ? 1200 - 68 + 'px' : window.innerWidth - (isSmMatchDown ? 36 : 64) + 'px');
  const [frameHeight, setFrameHeight] = useState((isMdMatchDown ? 300 : 500) + 'px')

  const getFrameWidth = (innerWidth: number) => {
    const padding = isSmMatchDown ? 36 : 68;

    if (innerWidth === 399) return innerWidth - 36 + 'px'
    if (innerWidth === 400) return innerWidth - 68 + 'px'
    if (innerWidth >= 1200) return 1200 - 68 + 'px'
    return innerWidth - padding + 'px';
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setFrameWidth(getFrameWidth(window.innerWidth));
      setFrameHeight((isMdMatchDown ? 300 : 500) + 'px')
    });
  });

  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Локации
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {locations.map((item, index) => {
            return (
              <LocationItem
                key={index}
                frameWidth={frameWidth}
                frameHeight={frameHeight}
                locationData={item}
                divider={index !== locations.length - 1 ? true : false}
              />
            );
          })}
        </List>
      </Container>
    </section>
  );
};

export default LocationsPage;
