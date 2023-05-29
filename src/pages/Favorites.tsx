import { Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ListTasks from '../components/tasks/ListTasks';
import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/usersSlice';
import Users from '../types/Users';

const Favorites: React.FC = () => {
    const navigate = useNavigate();
    const userLoggedEmail = useAppSelector((state) => state.userLogged.value);
    const users = useAppSelector(selectAll);
    const userLogged = users.find((item) => item.emailUser === userLoggedEmail) as Users;

    useEffect(() => {
        if (!userLoggedEmail) {
            navigate('/');
        }
    }, []);

    const favoriteTasks = useMemo(() => {
        return userLogged?.tasks.filter((item) => item.favorite === true);
    }, [userLogged]);

    return (
        <>
            <ListTasks title="Recados Favoritos" tasks={favoriteTasks || []} />
        </>
    );
};

export default Favorites;
