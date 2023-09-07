import { FC, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemProps, Collapse, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IScheduleCell, IScheduleItemData } from '../../services/types/schedule';
import { ILocationData } from '../../services/types/location';
import { ILocation } from '../../services/slices/locations-slice';

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const StyledListItem = styled(ListItem)<ListItemProps>(() => ({
  padding: '4px',
  border: '1px solid #fff',
  borderBottom: 'none',
  '&:last-child': {
    borderBottom: '1px solid #fff',
  },
}));

interface ISchedule {
  scheduleData: IScheduleCell[][];
}

const getStringTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours === 0 ? '00' : hours < 10 ? '0' + hours : hours}:${minutes === 0 ? '00' : minutes}`;
};

const Schedule: FC<ISchedule> = ({ scheduleData }) => {
  return (
    <Box sx={{ py: 1, display: 'flex', flexWrap: 'wrap', rowGap: 4 }}>
      {scheduleData.map((column: IScheduleCell[], i) => {
        return column.length === 0 ? null : (
          <List key={i} sx={{ padding: 0 }}>
            <StyledListItem key={0}>
              <Typography>{daysOfWeek[i]}</Typography>
            </StyledListItem>
            {column.map((cell, k) => {
              return (
                <StyledListItem key={k + 1}>
                  <Typography>{`${getStringTime(cell.startTime)} - ${getStringTime(cell.endTime)} ${
                    cell.trainer.name
                  }`}</Typography>
                </StyledListItem>
              );
            })}
          </List>
        );
      })}
    </Box>
  );
};

interface ILocationItem {
  frameWidth: string;
  locationData: ILocation;
  divider: boolean;
}

const LocationItem: FC<ILocationItem> = ({ frameWidth, locationData, divider }) => {
  const { name, photo, address, map, schedule } = locationData;
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const mapElement = document.createElement('div');
  mapElement.innerHTML = map;

  const frame = mapElement.querySelector('iframe');

  if (frame) {
    frame.width = frameWidth;
    frame.height = '300px';
  }

  const newMapElement = `${mapElement.innerHTML}`;

  return (
    <ListItem sx={{ padding: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" sx={{ mb: 4, width: '100%', textAlign: 'left' }}>
          {name}
        </Typography>
        <Box component="img" maxWidth="100%" mb={4} src={photo} alt={name}></Box>
        <Typography sx={{ mb: 2, width: '100%', textAlign: 'left' }}>Адрес: {address}</Typography>
        <Button
          sx={{ padding: 0, mb: 2, width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          onClick={() => setIsMapOpen(!isMapOpen)}
        >
          <Typography textTransform="capitalize">Показать карту</Typography>
          {isMapOpen ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
        </Button>
        <Collapse in={isMapOpen} timeout="auto" unmountOnExit>
          <div dangerouslySetInnerHTML={{ __html: newMapElement }} />
        </Collapse>
        <Button
          sx={{ padding: 0, width: '100%', display: 'flex', justifyContent: 'flex-start' }}
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
        >
          <Typography textTransform="capitalize">Показать расписание</Typography>
          {isScheduleOpen ? <ExpandLessIcon sx={{ color: '#fff' }} /> : <ExpandMoreIcon sx={{ color: '#fff' }} />}
        </Button>
        <Collapse in={isScheduleOpen} timeout="auto" unmountOnExit>
          <Schedule scheduleData={schedule} />
        </Collapse>
      </Box>
      {divider ? <Divider sx={{ width: '100%', mt: 8 }} /> : null}
    </ListItem>
  );
};

export default LocationItem;
