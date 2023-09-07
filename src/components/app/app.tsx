import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getTeam } from '../../services/slices/team-slice';
import { getLocations } from '../../services/slices/locations-slice';

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTeam())
    dispatch(getLocations())
  }, [])

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
