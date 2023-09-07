import { FC } from 'react';
import { Container, Typography } from '@mui/material';

const ShopPage: FC = () => {
  return (
    <section>
      <Container>
        <Typography variant="h4" textAlign="center" mb={4}>
          Магазин
        </Typography>
        <Typography textAlign="center">В данный момент находится в разработке</Typography>
      </Container>
    </section>
  );
};

export default ShopPage;
