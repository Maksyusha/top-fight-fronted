import { FC, useState, useEffect, FormEvent } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AdminRoutes, Routes } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { ILoginRequest } from "../../services/types/login";
import {
  getLogout,
  getUser,
  sendLogin,
} from "../../services/slices/user-slice";
import { getCookie } from "../../utils/cookie";

const Admin: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navValue, setNavValue] = useState<AdminRoutes>(AdminRoutes.Home);
  const { values, handleChange, setValues } = useForm<ILoginRequest>({
    username: "",
    password: "",
  });
  const { user, isAuthChecked, loginFailed } = useAppSelector(
    (store) => store.user
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleDrawerOpen = () => setIsMenuOpen(true);

  const handleDrawerClose = () => setIsMenuOpen(false);

  interface ListItemLinkProps {
    title: string;
    to: Routes | AdminRoutes;
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

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;

    if (!form.checkValidity()) return form.reportValidity();

    dispatch(sendLogin(values));

    setValues({ username: "", password: "" });
  };

  const handleButtonLogoutClick = () => {
    dispatch(getLogout());
  };

  useEffect(() => {
    Object.values(AdminRoutes).forEach((route) => {
      if (location.pathname === route) setNavValue(route as AdminRoutes);
    });
  }, [location, isMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navValue]);

  useEffect(() => {
    dispatch(getUser());
  }, [getCookie("accessToken")]);

  if (!user || user.role !== "admin" || !isAuthChecked) {
    return (
      <section>
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            onSubmit={handleFormSubmit}
          >
            <Typography variant="h4">Авторизация</Typography>
            <TextField
              name="username"
              label="Имя пользователя"
              value={values.username}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              name="password"
              label="Пароль"
              type="password"
              value={values.password}
              onChange={handleChange}
              required
            ></TextField>
            {loginFailed ? (
              <Typography color="secondary">
                Неверный логин или пароль
              </Typography>
            ) : null}
            <Button type="submit" color="secondary" variant="contained">
              Войти
            </Button>
          </Box>
        </Container>
      </section>
    );
  }

  return (
    <Container sx={{ p: { xs: 0 } }}>
      <Navigate to="/admin/locations" replace={true} />
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
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        sx={{ position: "relative" }}
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
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ListItemLink title="Локации" to={AdminRoutes.Locations} />
          <ListItemLink title="Команда" to={AdminRoutes.Team} />
        </List>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
          <Button
            sx={{ width: "120px" }}
            color="secondary"
            variant="contained"
            onClick={handleButtonLogoutClick}
          >
            Выйти
          </Button>
        </Box>
      </SwipeableDrawer>
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default Admin;
