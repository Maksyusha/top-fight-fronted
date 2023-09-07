import { FC, useState, useEffect } from 'react';
import { useMediaQuery, Container, Typography, List } from '@mui/material';
import { theme } from '../../components/theme/theme';
import LocationItem from '../../components/location-item/location-item';
import { locationsData } from '../../utils/data';
import { useAppSelector } from '../../hooks/redux-hooks';

const LocationsPage: FC = () => {
  const isMatchDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { locations } = useAppSelector(store => store.locations);
  const [frameWidth, setFrameWidth] = useState(window.innerWidth - (isMatchDown ? 36 : 64) + 'px');

  const getFrameWidth = (innerWidth: number) => {
    const padding = isMatchDown ? 36 : 64;
    if (innerWidth < 800) return innerWidth - padding + 'px';

    return 800 - padding + 'px';
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      const innerWidth = window.innerWidth;

      setFrameWidth(getFrameWidth(innerWidth));
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
                locationData={item}
                divider={index !== locationsData.length - 1 ? true : false}
              />
            );
          })}
        </List>
      </Container>
    </section>
  );
};

export default LocationsPage;
