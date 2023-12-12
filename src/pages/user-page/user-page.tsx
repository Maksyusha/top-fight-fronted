import React, { FC, useState, useEffect, FormEvent } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  Divider,
  Link as MuiLink,
  ListItemText,
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Modal,
  Link,
} from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { IMaskInput } from "react-imask";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Routes } from "../../utils/constants";
import challengeImage from "../../assets/user-page/challenge.png";
import tigerLogo from "../../assets/user-page/tiger-logo.png";
import ftbmLogo from "../../assets/user-page/ftbm-logo.png";
import idiLandLogo from "../../assets/user-page/idi-land-logojpg.jpg";
import rftbmLogo from "../../assets/user-page/rftbm-logo.png";
import vkLogo from "../../assets/user-page/vk.svg";
import instLogo from "../../assets/user-page/instagram.svg";
import {
  postAppointmentRequest,
  postGoogleAppointmentsRequest,
} from "../../services/api";
import Loader from "../../components/loader/loader";
import { theme } from "../../components/theme/theme";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 4,
  bgcolor: "#111",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

interface CustomProps {
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    return (
      <IMaskInput
        {...props}
        mask="+7 (#00) 000 00-00"
        definitions={{
          "#": /[1-9]/,
        }}
        //@ts-ignore
        inputRef={ref}
        overwrite
      />
    );
  }
);

const UserPage: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubListOpen, setIsSubListOpen] = useState(false);
  const [navValue, setNavValue] = useState(Routes.Home);
  const [trainingValue, setTrainingValue] = useState("");
  const [pointValue, setPointValue] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => setIsMenuOpen(true);

  const handleDrawerClose = () => setIsMenuOpen(false);

  const handleSubListButtonClick = () => {
    setIsSubListOpen(!isSubListOpen);
  };

  interface ListItemLinkProps {
    title: string;
    to: Routes;
  }

  const ListItemLink = (props: ListItemLinkProps) => {
    const match = navValue === props.to;

    return (
      <ListItem component={RouterLink} {...props} onClick={handleDrawerClose}>
        <Typography
          sx={{ width: "100%" }}
          textAlign="center"
          color={match ? "secondary" : ""}
        >
          {props.title}
        </Typography>
      </ListItem>
    );
  };

  const handleModalOpen = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSending(false);
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleContactsClick = () => {
    handleDrawerClose();
    const root = document.getElementById("root");
    if (root) {
      window.scroll(0, root.scrollHeight);
    }
  };

  const handleAppointmentClick = () => {
    handleDrawerClose();
    const root = document.getElementById("root");
    if (root) {
      window.scroll(0, root.scrollHeight - 850);
    }
  };

  const handleSelectTrainingChange = (
    evt: SelectChangeEvent<typeof trainingValue>
  ) => {
    setTrainingValue(evt.target.value);
  };

  const handleSelectPointChange = (
    evt: SelectChangeEvent<typeof pointValue>
  ) => {
    const { value } = evt.target;
    setPointValue(typeof value === "string" ? value.split(",") : value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;

    if (!form.checkValidity()) return form.reportValidity();

    setIsSending(true);

    const formData = new FormData(form);

    const phone = formData.get("phone");

    if (phone) {
      formData.set("phone", phone.toString().substring(1));
    }

    postAppointmentRequest(formData).catch((err) => console.log(err));

    postGoogleAppointmentsRequest(formData)
      .then(() => {
        handleModalOpen("Форма отправлена");
        form.reset();
        setTrainingValue("");
        setPointValue([]);
      })
      .catch((err) => handleModalOpen(`Произошла ошибка ${err}`));
  };

  useEffect(() => {
    Object.values(Routes).forEach((route) => {
      if (location.pathname === route) setNavValue(route as Routes);
    });

    if (
      [Routes.Children, Routes.Adults, Routes.Camps, Routes.Trainings].includes(
        location.pathname as Routes
      )
    )
      return setIsSubListOpen(true);
    else setIsSubListOpen(false);
  }, [location, isMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navValue]);

  return (
    <Container sx={{ p: { xs: 0 } }}>
      <AppBar position="sticky">
        <Toolbar sx={{ px: { xs: 4 }, justifyContent: "space-between" }}>
          <IconButton
            sx={{ p: 0 }}
            size="small"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          {/* <RouterLink style={{ textDecoration: 'none' }} to={Routes.Home}>
            <Typography sx={{ textDecoration: 'none' }} variant="h3">
              <span style={{ color: '#e31e25' }}>TOP</span> FIGHT
            </Typography>
          </RouterLink> */}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        sx={{ position: "relative" }}
        PaperProps={{
          sx: { maxWidth: "1200px", margin: "0 auto", right: "17.5px" },
        }}
        anchor="top"
        variant="temporary"
        open={isMenuOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <IconButton
          sx={{ p: 0, position: "absolute", top: 16, left: 16 }}
          size="small"
          aria-label="close drawer"
          onClick={handleDrawerClose}
        >
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
        <List
          component="nav"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ListItemLink title="Главная страница" to={Routes.Home} />
          <ListItemButton onClick={handleSubListButtonClick}>
            <ListItemText sx={{ paddingLeft: 4 }} primary="Тренировки" />
            {isSubListOpen ? (
              <ExpandLessIcon sx={{ color: "#fff" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "#fff" }} />
            )}
          </ListItemButton>
          <Collapse in={isSubListOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemLink title="Индивидуальные" to={Routes.Trainings} />
              <ListItemLink title="Взрослые" to={Routes.Adults} />
              <ListItemLink title="Дети" to={Routes.Children} />
              <ListItemLink title="Сборы" to={Routes.Camps} />
            </List>
          </Collapse>
          <ListItemLink title="Команда" to={Routes.Team} />
          <ListItemLink title="Соревнования" to={Routes.Competitions} />
          <ListItemLink title="Магазин" to={Routes.Shop} />
          <ListItemLink title="Локации" to={Routes.Locations} />
          <ListItemLink title="Галерея" to={Routes.Gallery} />
          <ListItem onClick={handleContactsClick} sx={{ cursor: "pointer" }}>
            <Typography sx={{ width: "100%" }} textAlign="center">
              Контакты
            </Typography>
          </ListItem>
          <ListItem onClick={handleAppointmentClick} sx={{ cursor: "pointer" }}>
            <Typography sx={{ width: "100%" }} textAlign="center">
              Записаться
            </Typography>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <main>
        <Outlet />
        <Container sx={{ py: { xs: 0, md: 0 } }}>
          <Divider sx={{ mb: 8 }} />
          <Typography variant="h4" textAlign="center">
            Наши партнеры
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            gap={2}
            pt={4}
            mb={8}
          >
            <Box component="img" sx={{ width: 160 }} src={tigerLogo}></Box>
            <Box
              component="img"
              sx={{
                width: 160,
                height: 160,
                objectFit: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              src={ftbmLogo}
            ></Box>
            <Box component="img" sx={{ width: 160 }} src={idiLandLogo}></Box>
            <Box component="img" sx={{ width: 160 }} src={rftbmLogo}></Box>
          </Box>
          <Divider />
        </Container>
        <Container sx={{ pb: { xs: 0, md: 0 } }}>
          <Typography variant="h4" textAlign="center" mb={4}>
            Наш турнир
          </Typography>
          <Box display="flex" justifyContent="center" mb={8}>
            <a
              href="https://challengemuaythai.ru/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={challengeImage} alt="Лого нашего турнира" />
            </a>
          </Box>
          <Divider />
        </Container>
        <Container sx={{ pb: { xs: 0, md: 0 } }}>
          <Typography variant="h4" mb={4} textAlign="center">
            Предварительная запись
          </Typography>
          <Box
            component="form"
            sx={{
              mb: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
            onSubmit={handleFormSubmit}
          >
            <TextField fullWidth name="name" label="ФИО" required></TextField>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="phone">Номер телефона *</InputLabel>
              <OutlinedInput
                id="phone"
                name="phone"
                type="tel"
                inputComponent={TextMaskCustom as any}
                label="Номер телефона"
                inputMode="tel"
                required
              />
            </FormControl>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Почта"
              inputMode="email"
              required
            ></TextField>
            <FormControl fullWidth>
              <InputLabel>Вид тренировки *</InputLabel>
              <Select
                color="tertiary"
                name="training"
                label="Вид тренировки *"
                value={trainingValue}
                onChange={handleSelectTrainingChange}
                required
              >
                <MenuItem value="Индивидуальная">Индивидуальная</MenuItem>
                <MenuItem value="Групповая">Групповая</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              name="whence"
              label="Откуда о нас узнали"
              required
            ></TextField>
            <FormControl fullWidth>
              <InputLabel>Ваши цели занятий *</InputLabel>
              <Select
                color="tertiary"
                multiple
                name="point"
                label="Ваши цели занятий *"
                value={pointValue}
                onChange={handleSelectPointChange}
                required
              >
                <MenuItem value="для самообороны">Для самообороны</MenuItem>
                <MenuItem value="для поддержания физической формы">
                  Для поддержания физической формы
                </MenuItem>
                <MenuItem value="для выступления на соревнованиях">
                  Для выступления на соревнованиях
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ width: "160px" }}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Записаться
            </Button>
          </Box>
          <Loader open={isSending} />
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
          <Divider />
        </Container>
      </main>
      <footer>
        <Container>
          {/* <Typography variant='h4'>Наш турнир</Typography>
          <Typography>https://challengemuaythai.ru/</Typography> */}
          <Typography variant="h4" mb={2}>
            Контакты
          </Typography>
          {/* <Typography mb={2}>Телефон: +7(916)-737-51-74</Typography> */}
          <Typography mb={1}>
            Почта:{" "}
            <Link
              href={"mailto:topfightgym@mail.ru"}
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
              }}
            >
              topfightgym@mail.ru
            </Link>
          </Typography>
          <Typography mb={4}>
            Телефон:{" "}
            <Link
              href={"tel: +79167375174"}
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
              }}
            >
              +7 916 737-51-74
            </Link>
          </Typography>
          <Typography variant="h4" mb={2}>
            Следите за нами в
          </Typography>
          <MuiLink
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            mb={2}
            href="https://vk.com/club220739349"
            target="_blank"
          >
            <img src={vkLogo} alt="Ссылка на наш ВК" />
            <Typography>ВКонтакте</Typography>
          </MuiLink>
          <MuiLink
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            href="https://instagram.com/topfight_muaythai_school?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
          >
            <img src={instLogo} alt="Ссылка на наш инстаграм" />
            <Typography>Instagram</Typography>
          </MuiLink>
        </Container>
      </footer>
    </Container>
  );
};

export default UserPage;
