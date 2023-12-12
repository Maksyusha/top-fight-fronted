import { FC } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Box,
  Divider,
} from "@mui/material";
import { IPersonData } from "../../services/types/team";
import { useAppSelector } from "../../hooks/redux-hooks";

interface IPersonItem {
  personData: IPersonData;
  index: number;
  divider: boolean;
}

const PersonItem: FC<IPersonItem> = ({ personData, index, divider }) => {
  return (
    <ListItem sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{
        width: '100%',
        display: "flex",
        flexDirection: { xs: "column", lg: (index + 2) % 2 === 0 ? "row" : "row-reverse" },
        alignItems: "flex-start",
        gap: { xs: 2, lg: 8 },
      }}>
        <Typography sx={{ display: { xs: "block", lg: "none" } }}>
          {personData.role}
        </Typography>
        <Typography sx={{ display: { xs: "block", lg: "none" } }} variant="h6">
          {personData.name}
        </Typography>
        <Box
          component="img"
          sx={{
            width: { xs: "100%", lg: "50%" },
            aspectRatio: '1 / 1',
            objectFit: "cover",
          }}
          src={personData.photo}
          alt={personData.name}
        />
        <List
          sx={{
            padding: 0,
            display: { xs: "flex", lg: "none" },
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {personData.regalia.map((item, index) => {
            return (
              <ListItem sx={{ padding: 0 }} key={index}>
                <Typography>{item}</Typography>
              </ListItem>
            );
          })}
        </List>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            height: '100%',
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography>{personData.role}</Typography>
          <Typography variant="h6">{personData.name}</Typography>
          <List
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            {personData.regalia.map((item, index) => {
              return (
                <ListItem sx={{ padding: 0 }} key={index}>
                  <Typography>{item}</Typography>
                </ListItem>
              );
            })}
          </List>
          <Typography>{personData.about}</Typography>
        </Box>
        {/* {personData.about.map((item, index) => {
        return <Typography key={index}>{item}</Typography>;
      })} */}
        <Typography sx={{ display: { xs: "block", lg: "none" } }}>
          {personData.about}
        </Typography>
      </Box>
      {divider ? <Divider sx={{ my: 8, width: "100%" }} /> : null}
    </ListItem>
  );
};

const TeamPage: FC = () => {
  const { team } = useAppSelector((store) => store.team);

  if (!team) {
    return <Box></Box>;
  }

  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Typography variant="h4" textAlign="center" mb={8}>
          Команда
        </Typography>
        <List sx={{ padding: 0 }}>
          {team.map((item, index) => {
            return (
              <PersonItem
                key={index}
                index={index}
                personData={item}
                divider={index !== team.length - 1}
              />
            );
          })}
        </List>
      </Container>
    </section>
  );
};

export default TeamPage;
