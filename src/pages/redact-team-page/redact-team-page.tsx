import { FC, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  IconButton,
  Button,
  Modal,
} from '@mui/material';
import { styled } from '@mui/system';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePersonRequestApi, getPersonRequestApi, patchPersonRequestApi, postPersonRequestApi } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { changePerson, deletePerson, pushPerson } from '../../services/slices/team-slice';
import { useForm } from '../../hooks/useForm';

const selectValues = ['Тренер', 'Спортсмен'];

const StyledTextarea = styled(TextareaAutosize)(
  () => `
  width: 100%;
  padding: 16.5px 14px;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background-color: #111;
  border: 1px solid #fff;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    padding: 15.5px 14px;
    border-width: 2px;
    outline: none;
  }
  `
);

interface IRegaliaItem {
  text: string;
  handleRegaliaDelete: () => void;
}

const RegaliaItem: FC<IRegaliaItem> = ({ text, handleRegaliaDelete }) => {
  return (
    <ListItem sx={{ border: '1px solid #fff', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
      <Typography mr={4}>{text}</Typography>
      <IconButton onClick={handleRegaliaDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

interface ITeamForm {
  handleModalOpen: (message: string) => void;
}

const AddMemberForm: FC<ITeamForm> = ({ handleModalOpen }) => {
  const [selectValue, setSelectValue] = useState('');
  const [regaliaValues, setRegaliaValues] = useState<string[]>([]);
  const regaliaInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [isRegaliaInputFocused, setIsRegaliaInputFocused] = useState(false);
  const dispatch = useAppDispatch();

  const handleSelectChange = (evt: SelectChangeEvent<typeof selectValue>) => {
    setSelectValue(evt.target.value);
  };

  const handleRegaliaInputKeyDown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter') {
      if (regaliaInputRef && regaliaInputRef.current) {
        const input = regaliaInputRef.current.querySelector('input');

        if (input) {
          setRegaliaValues([...regaliaValues, input.value]);
          input.value = '';
        }
      }
    }
  };

  const handleRegaliaDelete = (index: number) => {
    const newRegaliaValues = regaliaValues.slice();
    newRegaliaValues.splice(index, 1);
    setRegaliaValues(newRegaliaValues);
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault();
    const form = evt.currentTarget.form;

    if (isRegaliaInputFocused) return;

    if (form) {
      if (uploadInputRef.current && uploadInputRef.current.files && !uploadInputRef.current.files.length) {
        return handleModalOpen('Вы не добавили фотографию');
      }

      if (!form.checkValidity()) return form.reportValidity();

      const formData = new FormData(form);
      formData.set('regalia', JSON.stringify(regaliaValues));

      postPersonRequestApi(formData).then(data => {
        getPersonRequestApi(data.id)
          .then(person => dispatch(pushPerson({ person })))
          .then(() => form.reset())
          .then(() => setRegaliaValues([]))
          .then(() => setSelectValue(''))
          .then(() => handleModalOpen('Член команды добавлен'))
          .catch(err => handleModalOpen(err));
      });
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <Typography variant="h4" mb={4}>
        Добавить члена команды
      </Typography>
      <TextField sx={{ width: '100%' }} name="name" label="ФИО" variant="outlined" required></TextField>
      <FormControl fullWidth>
        <InputLabel>Роль в команде</InputLabel>
        <Select color="tertiary" name="role" label="роль в команде" value={selectValue} onChange={handleSelectChange} required>
          <MenuItem value={selectValues[0]}>{selectValues[0]}</MenuItem>
          <MenuItem value={selectValues[1]}>{selectValues[1]}</MenuItem>
        </Select>
      </FormControl>
      <TextField
        ref={regaliaInputRef}
        sx={{ width: '100%' }}
        name="regalia"
        label="Регалии"
        variant="outlined"
        onFocus={() => setIsRegaliaInputFocused(true)}
        onBlur={() => setIsRegaliaInputFocused(false)}
        onKeyDown={handleRegaliaInputKeyDown}
      ></TextField>
      {!!regaliaValues.length ? (
        <List sx={{ padding: 0, display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
          {regaliaValues.map((item, index) => {
            return <RegaliaItem key={index} text={item} handleRegaliaDelete={() => handleRegaliaDelete(index)} />;
          })}
        </List>
      ) : null}
      <StyledTextarea name="about" placeholder="О себе" required />
      <input ref={uploadInputRef} accept="image/jpg, image/jpeg" name="photo" type="file" hidden required />
      <Button
        sx={{ width: '100%' }}
        color="tertiary"
        variant="contained"
        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
      >
        Добавить фото
      </Button>
      <Button sx={{ width: '100%' }} type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
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

const RedactTeamForm: FC<ITeamForm> = ({ handleModalOpen }) => {
  const dispatch = useAppDispatch();
  const { team } = useAppSelector(store => store.team);
  const [roleSelectValue, setRoleSelectValue] = useState('');
  const [personPatchSelectValue, setPersonPatchSelectValue] = useState('');
  const [personDeleteSelectValue, setPersonDeleteSelectValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regaliaValues, setRegaliaValues] = useState<string[]>([]);
  const [isRegaliaInputFocused, setIsRegaliaInputFocused] = useState(false);
  const { values, handleChange, setValues } = useForm({ name: '', about: '' });
  const regaliaInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handlePersonPatchSelectChange = (evt: SelectChangeEvent<typeof personPatchSelectValue>) => {
    setPersonPatchSelectValue(evt.target.value);
  };

  const handleRoleSelectChange = (evt: SelectChangeEvent<typeof roleSelectValue>) => {
    setRoleSelectValue(evt.target.value);
  };

  const handleRegaliaInputKeyDown = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter') {
      if (regaliaInputRef && regaliaInputRef.current) {
        const input = regaliaInputRef.current.querySelector('input');

        if (input) {
          setRegaliaValues([...regaliaValues, input.value]);
          input.value = '';
        }
      }
    }
  };

  const handleRegaliaDelete = (index: number) => {
    const newRegaliaValues = regaliaValues.slice();
    newRegaliaValues.splice(index, 1);
    setRegaliaValues(newRegaliaValues);
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault();
    const form = evt.currentTarget.form;

    if (isRegaliaInputFocused) return;

    if (form) {
      if (!form.checkValidity()) return form.reportValidity();

      const formData = new FormData();
      formData.set('name', values.name);
      formData.set('role', roleSelectValue);
      formData.set('regalia', JSON.stringify(regaliaValues));
      formData.set('about', values.about);
      if (uploadInputRef.current && uploadInputRef.current.files && uploadInputRef.current.files[0]) {
        formData.set('photo', uploadInputRef.current.files[0]);
      }

      patchPersonRequestApi(team[+personPatchSelectValue].id, formData).then(data => {
        getPersonRequestApi(data.id)
          .then(person => dispatch(changePerson({ person })))
          .then(() => handleModalOpen('Данные члена команды изменены'))
          .catch(err => handleModalOpen(err));
      });
    }
  };

  const handlePersonDeleteSelectChange = (evt: SelectChangeEvent<typeof personDeleteSelectValue>) => {
    setPersonDeleteSelectValue(evt.target.value);
  };

  const handleDelete = () => {
    deletePersonRequestApi(team[+personDeleteSelectValue].id)
      .then(id => {
        setPersonPatchSelectValue('');
        setPersonDeleteSelectValue('');
        dispatch(deletePerson(id));
        setIsModalOpen(false);
      })
      .then(() => handleModalOpen('Член команды удален'))
      .catch(err => handleModalOpen(err));
  };

  useEffect(() => {
    if (personPatchSelectValue !== '' && team.length) {
      setRegaliaValues(team[+personPatchSelectValue].regalia);
      setRoleSelectValue(team[+personPatchSelectValue].role);
      setValues({ name: team[+personPatchSelectValue].name, about: team[+personPatchSelectValue].about });
    }
  }, [personPatchSelectValue]);

  return (
    <>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <Typography variant="h4" mb={4}>
          Изменить члена команды
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Член команды</InputLabel>
          <Select
            color="tertiary"
            name="id"
            label="Член команды"
            value={personPatchSelectValue}
            onChange={handlePersonPatchSelectChange}
            required
          >
            {team.length
              ? team.map((person, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {person.name}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
        {team.length && personPatchSelectValue !== '' ? (
          <>
            <TextField
              sx={{ width: '100%' }}
              name="name"
              label="ФИО"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              required
            ></TextField>
            <FormControl fullWidth>
              <InputLabel>Роль в команде</InputLabel>
              <Select
                color="tertiary"
                name="role"
                label="роль в команде"
                value={roleSelectValue}
                onChange={handleRoleSelectChange}
                required
              >
                <MenuItem value={selectValues[0]}>{selectValues[0]}</MenuItem>
                <MenuItem value={selectValues[1]}>{selectValues[1]}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              ref={regaliaInputRef}
              sx={{ width: '100%' }}
              name="regalia"
              label="Регалии"
              variant="outlined"
              onFocus={() => setIsRegaliaInputFocused(true)}
              onBlur={() => setIsRegaliaInputFocused(false)}
              onKeyDown={handleRegaliaInputKeyDown}
            ></TextField>
            {!!regaliaValues.length ? (
              <List sx={{ padding: 0, display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                {regaliaValues.map((item, index) => {
                  return <RegaliaItem key={index} text={item} handleRegaliaDelete={() => handleRegaliaDelete(index)} />;
                })}
              </List>
            ) : null}
            <StyledTextarea name="about" placeholder="О себе" value={values.about} onChange={handleChange} required />
            <input ref={uploadInputRef} accept="image/jpg, image/jpeg" name="photo" type="file" hidden />
            <Button
              sx={{ width: '100%' }}
              color="tertiary"
              variant="contained"
              onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
            >
              Добавить фото
            </Button>
            <Button sx={{ width: '100%' }} type="submit" color="secondary" variant="contained" onClick={handleSubmit}>
              Сохранить
            </Button>
          </>
        ) : null}
      </Box>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <Typography variant="h4">Удалить члена команды</Typography>
        <FormControl fullWidth>
          <InputLabel>Член команды</InputLabel>
          <Select
            color="tertiary"
            name="id"
            label="Член команды"
            value={personDeleteSelectValue}
            onChange={handlePersonDeleteSelectChange}
            required
          >
            {team.length
              ? team.map((person, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {person.name}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
        {team.length && personDeleteSelectValue !== '' ? (
          <>
            <Button sx={{ width: '100%' }} color="secondary" variant="contained" onClick={() => setIsModalOpen(true)}>
              Удалить
            </Button>
            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" textAlign="center">
                  {personDeleteSelectValue !== ''
                    ? `Вы точно хотите удалить ${team[+personDeleteSelectValue].role.toLowerCase()}a ${team[+personDeleteSelectValue].name}`
                    : ''}
                </Typography>
                <Button color="secondary" variant="contained" onClick={handleDelete}>
                  Удалить
                </Button>
              </Box>
            </Modal>
          </>
        ) : null}
      </Box>
    </>
  );
};

const RedactTeamPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleModalOpen = (message: string) => {
    setIsModalOpen(true);
    setModalMessage(message);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <section>
      <Container sx={{ px: { xs: 4, sm: 8 }, py: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <AddMemberForm handleModalOpen={handleModalOpen} />
        <RedactTeamForm handleModalOpen={handleModalOpen} />
        <Modal open={isModalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" textAlign="center">
              {modalMessage}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </section>
  );
};

export default RedactTeamPage;
