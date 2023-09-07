import { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import dayjs from 'dayjs';
import {
  Container,
  Button,
  TextField,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  Modal,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useForm } from '../../hooks/useForm';
import { WeekDays } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { IPersonData } from '../../services/types/team';
import { IScheduleCell } from '../../services/types/schedule';
import {
  deleteLocationRequestApi,
  deleteScheduleCellsRequestApi,
  getLocationRequestApi,
  patchLocationRequestApi,
  postLocationRequestApi,
} from '../../services/api';
import { ILocation, changeLocation, deleteLocation, pushLocation } from '../../services/slices/locations-slice';

interface IScheduleItemData {
  id: number | null;
  startTime: number | null;
  endTime: number | null;
  weekDay: number | null;
  trainer: { name: string | null; id: number | null };
}

interface IScheduleItem {
  weekDayId: number;
  cellId: number;
  cellData: IScheduleItemData;
  trainers: { name: string; id: number }[];
  handleScheduleCellChange: (weekDayId: number, cellId: number, name: keyof IScheduleItemData, value: number | null) => void;
  handleButtonDeleteClick: (weekDayId: number, cellId: number) => void;
}

const scheduleCell: IScheduleItemData = {
  id: null,
  startTime: null,
  endTime: null,
  weekDay: null,
  trainer: { name: null, id: null },
};

const ScheduleItem: FC<IScheduleItem> = ({ weekDayId, cellId, cellData, trainers, handleScheduleCellChange, handleButtonDeleteClick }) => {
  const [values, setValues] = useState(cellData);

  const handleChange = (name: keyof IScheduleItemData, value: number | null) => {
    handleScheduleCellChange(weekDayId, cellId, name, value);
  };

  const handleSelectChange = (evt: SelectChangeEvent<typeof values.trainer.id>) => {
    const value = evt.target.value === null ? null : +evt.target.value;
    setValues({ ...values, trainer: { ...values.trainer, id: value } });
    handleChange(evt.target.name as keyof IScheduleItemData, value);
  };

  const parseTimeToMinutes = (value: dayjs.Dayjs | null) => {
    if (value) {
      const totalMinutes = value.hour() * 60 + value.minute();

      return totalMinutes;
    }

    return null;
  };

  const parseMinutesToHours = (minutes: number) => {
    return Math.floor(minutes / 60);
  };

  const getDayjsTime = (minutes: number | null) => {
    if (minutes === null) return dayjs().hour(0).minute(0);

    return dayjs()
      .hour(parseMinutesToHours(minutes))
      .minute(minutes % 60);
  };

  useEffect(() => {
    setValues(cellData);
  }, [cellData.startTime, cellData.endTime, cellData.trainer]);

  return (
    <ListItem sx={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="h6">{`${Object.values(WeekDays)[weekDayId]}, ячейка ${cellId + 1}`}</Typography>
      <Box
        sx={{
          padding: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          border: '1px solid #fff',
          borderRadius: '4px',
          boxSizing: 'border-box',
        }}
      >
        <TimePicker
          ampm={false}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#fff',
            },
          }}
          minutesStep={15}
          value={getDayjsTime(values.startTime)}
          label="Время начала"
          onChange={value => handleChange('startTime', parseTimeToMinutes(value))}
        />
        <TimePicker
          ampm={false}
          minutesStep={15}
          value={getDayjsTime(values.endTime)}
          label="Время окончания"
          onChange={value => handleChange('endTime', parseTimeToMinutes(value))}
        />
        <FormControl fullWidth>
          <InputLabel>Выберите тренера</InputLabel>
          <Select
            color="tertiary"
            name="trainer"
            label="Выберите тренера"
            value={values.trainer.id || values.trainer.id === 0 ? values.trainer.id : ''}
            onChange={handleSelectChange}
          >
            {trainers.map((trainer, index) => {
              return (
                <MenuItem key={index} value={trainer.id}>
                  {trainer.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button color="secondary" variant="contained" onClick={() => handleButtonDeleteClick(weekDayId, cellId)}>
          Удалить
        </Button>
      </Box>
    </ListItem>
  );
};

interface IAddOrRedactSchedule {
  type: 'add' | 'redact';
  trainers: IPersonData[];
  weekDayId: string;
  scheduleValues: IScheduleItemData[][];
  handleSelectDayChange: (evt: SelectChangeEvent<string>) => void;
  handleButtonAddCell: (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  handleChangeCell: (weekDayId: number, cellId: number, name: keyof IScheduleItemData, value: number | null) => void;
  handleButtonDeleteCell: (weekDayId: number, cellId: number) => void;
}

const AddOrRedactSchedule: FC<IAddOrRedactSchedule> = ({
  type,
  trainers,
  weekDayId,
  scheduleValues,
  handleSelectDayChange,
  handleButtonAddCell,
  handleChangeCell,
  handleButtonDeleteCell,
}) => {
  return (
    <Box>
      <Typography variant="h6" mb={4}>
        {type === 'add' ? 'Добавить расписание' : 'Изменить расписание'}
      </Typography>
      <FormControl fullWidth>
        <InputLabel>День недели</InputLabel>
        <Select
          sx={{ mb: weekDayId !== '' ? 4 : 0 }}
          color="tertiary"
          label="День недели"
          value={weekDayId}
          onChange={handleSelectDayChange}
        >
          {Object.values(WeekDays).map((weekDay, index) => {
            return (
              <MenuItem key={index} value={index}>
                {weekDay}
              </MenuItem>
            );
          })}
        </Select>
        {weekDayId !== '' ? (
          <List sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {scheduleValues[+weekDayId].length
              ? scheduleValues[+weekDayId].map((item, index) => {
                  return (
                    <ScheduleItem
                      key={index}
                      weekDayId={+weekDayId}
                      cellId={index}
                      cellData={item}
                      trainers={trainers}
                      handleScheduleCellChange={handleChangeCell}
                      handleButtonDeleteClick={handleButtonDeleteCell}
                    />
                  );
                })
              : null}
            <Button color="tertiary" variant="contained" onClick={handleButtonAddCell}>
              Добавить ячейку
            </Button>
          </List>
        ) : null}
      </FormControl>
    </Box>
  );
};

interface ILocationForm {
  type: 'add' | 'redact';
  trainers: IPersonData[];
  location?: ILocation;
  handleModalOpen: (message: string) => void;
}

const LocationForm: FC<ILocationForm> = ({ type, trainers, location, handleModalOpen }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const { values, handleChange, setValues } = useForm(
    location ? { name: location.name, address: location.address, map: location.map } : { name: '', address: '', map: '' }
  );
  const [weekDayId, setWeekDayId] = useState('');
  const [scheduleValues, setScheduleValues] = useState<Array<IScheduleItemData[]>>(
    location ? location.schedule.map(column => column.slice()) : Array.from({ length: 7 }, () => [])
  );
  const [deletedCellsId, setDeletedCellsId] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const handleSelectDayChange = (evt: SelectChangeEvent<typeof weekDayId>) => {
    setWeekDayId(evt.target.value as string);
  };

  const handleButtonAddCell = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const newScheduleValues = scheduleValues.slice();
    const newScheduleCell = { ...scheduleCell };
    newScheduleCell.weekDay = +weekDayId;

    newScheduleValues[+weekDayId].push(newScheduleCell);

    setScheduleValues(newScheduleValues);
  };

  const handleChangeCell = (weekDayId: number, cellId: number, name: keyof IScheduleItemData, value: number | null) => {
    const newScheduleValues = scheduleValues.map(colum => colum.slice());
    const newScheduleItemData = { ...newScheduleValues[weekDayId][cellId] };

    if (name !== 'trainer') {
      newScheduleItemData[name] = value;
    } else {
      newScheduleItemData.trainer.id = value;
    }

    newScheduleValues[weekDayId][cellId] = newScheduleItemData;

    setScheduleValues(newScheduleValues);
  };

  const handleButtonDeleteClick = (weekDayId: number, cellId: number) => {
    const newScheduleValues = scheduleValues.slice();
    const deletedCellId: null | number = newScheduleValues[weekDayId][cellId].id;

    if (typeof deletedCellId === 'number') {
      setDeletedCellsId([...deletedCellsId, deletedCellId]);
    }

    newScheduleValues[weekDayId].splice(cellId, 1);

    setScheduleValues(newScheduleValues);
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault();
    const form = evt.currentTarget.form;

    if (form) {
      if (type === 'add' && uploadRef.current && uploadRef.current.files && !uploadRef.current.files.length) {
        handleModalOpen('Вы не загрузили фотографию');
      }
      if (!form.checkValidity()) return form.reportValidity();

      const formData = new FormData();
      let formattedSchedule = [];
      const weekDays = Object.values(WeekDays)
      for (let i = 0; i < scheduleValues.length; i++) {
        for (let j = 0; j < scheduleValues[i].length; j++) {
          if (scheduleValues[i][j].startTime === null) {
            return handleModalOpen(`Вы не заполнили время начала тренировки в ${weekDays[i].toLowerCase()} в ячейке ${j + 1}`);
          }

          if (scheduleValues[i][j].endTime === null) {
            return handleModalOpen(`Вы не заполнили время окончания тренировки в ${weekDays[i].toLowerCase()} в ячейке ${j + 1}`);
          }

          if (scheduleValues[i][j].trainer.id === null) {
            return handleModalOpen(`Вы не указали тренера в ${weekDays[i].toLowerCase()} в ячейке ${j + 1}`);
          }

          formattedSchedule.push(scheduleValues[i][j]);
        }
      }
      formData.set('name', values.name);
      formData.set('address', values.address);
      formData.set('map', values.map);
      formData.set('schedule', JSON.stringify(formattedSchedule));

      if (uploadRef.current && uploadRef.current.files && uploadRef.current.files[0]) formData.set('photo', uploadRef.current?.files[0]);

      if (type === 'add') {
        postLocationRequestApi(formData)
          .then(data => getLocationRequestApi(data.id))
          .then(location => dispatch(pushLocation({ location })))
          .then(() => handleModalOpen('Локация сохранена'))
          .then(() => form.reset())
          .catch(err => handleModalOpen(err));
      }

      if (type === 'redact' && location) {
        deleteScheduleCellsRequestApi(deletedCellsId)
          .then(() => patchLocationRequestApi(location.id, formData))
          .then(data => getLocationRequestApi(data.id))
          .then(location => dispatch(changeLocation({ location })))
          .then(() => handleModalOpen('Данные изменены'))
          .catch(err => handleModalOpen(err));
      }
    }
  };

  useEffect(() => {
    if (location) {
      setValues({ name: location.name, address: location.address, map: location.map });
      setScheduleValues(location.schedule.map(column => column.slice()));
      setDeletedCellsId([]);
      setWeekDayId('');
    }
  }, [location]);

  return (
    <Box ref={formRef} component="form" sx={{ mb: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField name="name" value={values.name} label="Название клуба" variant="outlined" onChange={handleChange} required></TextField>
      <TextField name="address" value={values.address} label="Адрес" variant="outlined" onChange={handleChange} required></TextField>
      <TextField name="map" value={values.map} label="Компонент карты" variant="outlined" onChange={handleChange} required></TextField>
      <input ref={uploadRef} accept="image/jpg, image/jpeg" name="photo" type="file" hidden required={type === 'add' ? true : false} />
      <Button color="tertiary" variant="contained" onClick={() => uploadRef.current && uploadRef.current.click()}>
        Добавить фото
      </Button>
      <AddOrRedactSchedule
        type="add"
        trainers={trainers}
        weekDayId={weekDayId}
        scheduleValues={scheduleValues}
        handleSelectDayChange={handleSelectDayChange}
        handleButtonAddCell={handleButtonAddCell}
        handleChangeCell={handleChangeCell}
        handleButtonDeleteCell={handleButtonDeleteClick}
      />
      <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
        Сохранить
      </Button>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 4,
  bgcolor: '#111',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const RedactLocationsPage: FC = () => {
  const [locationRedactId, setLocationRedactId] = useState<string>('');
  const [locationDeleteId, setLocationDeleteId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { locations } = useAppSelector(store => store.locations);
  const { team } = useAppSelector(store => store.team);
  const trainers = team.filter(person => person.role === 'Тренер');
  const dispatch = useAppDispatch();

  const handleSelectLocationRedactChange = (evt: SelectChangeEvent<typeof locationRedactId>) => {
    setLocationRedactId(evt.target.value as string);
  };

  const handleSelectDeleteRedactChange = (evt: SelectChangeEvent<typeof locationDeleteId>) => {
    setLocationDeleteId(evt.target.value as string);
  };

  const handleModalOpen = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  const handleDelete = () => {
    if (locationDeleteId !== '') {
      setLocationDeleteId('');
      deleteLocationRequestApi(locations[+locationDeleteId].id)
        .then(({ id }) => {
          if (id === locations[+locationRedactId].id) setLocationRedactId('');
          dispatch(deleteLocation({ id }));
        })
        .then(() => {
          setIsModalDeleteOpen(false);
          handleModalOpen('Локация удалена');
        })
        .catch(err => handleModalOpen('Ошибка' + err));
    }
  };

  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8 }}>
        <Typography variant="h4" mb={4}>
          Добавить локацию
        </Typography>
        <LocationForm type="add" trainers={trainers} handleModalOpen={handleModalOpen} />
        <Typography variant="h4" mb={4}>
          Изменить данные
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Название клуба</InputLabel>
          <Select
            sx={{ mb: 4 }}
            color="tertiary"
            label="Название клуба"
            value={locationRedactId}
            onChange={handleSelectLocationRedactChange}
          >
            {locations.length
              ? locations.map((location, index) => (
                  <MenuItem key={index} value={index}>
                    {location.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        {locationRedactId !== '' ? (
          <LocationForm type="redact" location={locations[+locationRedactId]} trainers={trainers} handleModalOpen={handleModalOpen} />
        ) : null}
        <Box sx={{ pt: 4 }}>
          <Typography variant="h4" mb={4}>
            Удалить локацию
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Название клуба</InputLabel>
            <Select
              sx={{ mb: 4 }}
              color="tertiary"
              label="Название клуба"
              value={locationDeleteId}
              onChange={handleSelectDeleteRedactChange}
            >
              {locations.length
                ? locations.map((location, index) => (
                    <MenuItem key={index} value={index}>
                      {location.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          {locationDeleteId !== '' ? (
            <>
              <Button sx={{ width: '100%' }} color="secondary" variant="contained" onClick={() => setIsModalDeleteOpen(true)}>
                Удалить
              </Button>
              <Modal
                open={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography id="modal-modal-title" textAlign="center">
                    {`Вы точно хотите удалить локацию ${locations[+locationDeleteId].name}`}
                  </Typography>
                  <Button color="secondary" variant="contained" onClick={handleDelete}>
                    Удалить
                  </Button>
                </Box>
              </Modal>
            </>
          ) : null}
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" textAlign="center">
                {modalMessage}
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Container>
    </section>
  );
};

export default RedactLocationsPage;
