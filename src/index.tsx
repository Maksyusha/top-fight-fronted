import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { breakpointsTheme, theme } from './components/theme/theme';
import HomePage from './pages/home-page/home-page';
import ChildrenPage from './pages/children-page/children-page';
import AdultsPage from './pages/adults-page/adults-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import LocationsPage from './pages/locations-page/locations-page';
import TrainingsPage from './pages/trainings-page/trainings-page';
import RedactLocationsPage from './pages/redact-locations-page/redact-locations-page';
import Admin from './pages/admin-page/admin-page';
import TeamPage from './pages/team-page/team-page';
import RedactTeamPage from './pages/redact-team-page/redact-team-page';
import '@fontsource/roboto/400.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import UserPage from './pages/user-page/user-page';
import CompetitionsPage from './pages/competions-page/competitions-page';
import { AdminRoutes, Routes } from './utils/constants';
import CampsPage from './pages/camps-page/camps-page';
import ShopPage from './pages/shop-page/shop-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <UserPage />,
        children: [
          {
            path: Routes.Home,
            element: <HomePage />,
          },
          {
            path: Routes.Children,
            element: <ChildrenPage />,
          },
          {
            path: Routes.Adults,
            element: <AdultsPage />,
          },
          {
            path: Routes.Locations,
            element: <LocationsPage />,
          },
          {
            path: Routes.Trainings,
            element: <TrainingsPage />,
          },
          {
            path: Routes.Team,
            element: <TeamPage />,
          },
          {
            path: Routes.Competitions,
            element: <CompetitionsPage />,
          },
          {
            path: Routes.Camps,
            element: <CampsPage />,
          },
          {
            path: Routes.Shop,
            element: <ShopPage />,
          },
        ],
      },
      {
        path: AdminRoutes.Home,
        element: <Admin />,
        children: [
          {
            path: AdminRoutes.Locations,
            element: <RedactLocationsPage />,
          },
          {
            path: AdminRoutes.Team,
            element: <RedactTeamPage />,
          },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={breakpointsTheme}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
