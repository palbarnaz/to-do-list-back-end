import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AlertInfo from '../components/AlertInfo';
import DialogTask from '../components/tasks/DialogTask';
import ListTasks from '../components/tasks/ListTasks';
import ModalConfirm from '../components/tasks/ModalConfirm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { saveTask, selectAll } from '../store/modules/usersSlice';
import { Task } from '../types/Task';
import Users from '../types/Users';

const Tasks: React.FC = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');
    const [valid, setValid] = useState<boolean>(false);
    const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [taskRemove, setTaskRemove] = useState<Task | undefined>();
    const [taskEdit, setTaskEdit] = useState<Task | undefined>();
    const [alertCreate, setAlertCreate] = useState<boolean>(false);
    const [alertEdit, setAlertEdit] = useState<boolean>(false);
    const [alertDelete, setAlertDelete] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const users = useAppSelector(selectAll);
    const userLoggedEmail = useAppSelector((state) => state.userLogged.value);
    const userLogged = users.find((item) => item.emailUser === userLoggedEmail) as Users;

    useEffect(() => {
        if (!userLoggedEmail) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (description.length > 3) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [description]);

    const handleClickOpen = () => {
        setOpenDialogCreate(true);
    };
    const handleClose = () => {
        setOpenDialogCreate(false);
    };

    const saveTasks = () => {
        const userTasks = userLogged?.tasks || [];
        const newTasks = [...userTasks, { id: Date.now(), description, detail, archived: false }];
        dispatch(saveTask({ id: userLogged?.id, changes: { tasks: newTasks } }));
        setAlertCreate(true);
        setDescription('');
        setDetail('');
        setOpenDialogCreate(false);
    };

    const openModalEdit = (itemEdit: Task) => {
        setTaskEdit(itemEdit);
        setDescription(itemEdit.description);
        setDetail(itemEdit.detail);
        setOpenDialogEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenDialogEdit(false);
    };

    const editTask = useCallback(() => {
        const newTasks = userLogged.tasks.map((item) => {
            if (item.id === taskEdit?.id) {
                return { ...item, description, detail, favorite: item.archived };
            }
            return item;
        });

        dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
        setAlertEdit(true);
        setDescription('');
        setDetail('');
        setOpenDialogEdit(false);
    }, [userLogged, taskEdit, description, detail]);

    const openModalDelete = (itemRemove: Task) => {
        setTaskRemove(itemRemove);
        setOpen(true);
    };

    const closeModalConfirm = useCallback(() => {
        setOpen(false);
        setTaskRemove(undefined);
    }, []);

    const removeTask = useCallback(() => {
        const index = userLogged.tasks.findIndex((item) => item.id === taskRemove?.id);

        if (index !== -1) {
            const newTasks = [...userLogged.tasks];
            newTasks.splice(index, 1);

            dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
            closeModalConfirm();
            setAlertDelete(true);
        }
    }, [userLogged, taskRemove]);

    const addArchived = (recado: Task) => {
        const newTasks = userLogged.tasks.map((item) => {
            if (item.id === recado.id) {
                return { ...item, archived: !item.archived };
            }
            return item;
        });
        dispatch(saveTask({ id: userLogged.id, changes: { tasks: newTasks } }));
    };

    const cancelAlert = () => {
        if (alertCreate) {
            setAlertCreate(false);
        } else if (alertEdit) {
            setAlertEdit(false);
            return;
        }

        setAlertDelete(false);
    };

    return (
        <>
            <ListTasks
                title="Meus Recados "
                tasks={userLogged?.tasks || []}
                actionArchived={addArchived}
                actionDelete={openModalDelete}
                actionEdit={openModalEdit}
            />

            <AlertInfo actionCancel={cancelAlert} show={alertEdit} msg="Recado editado com sucesso!" type="success" />
            <AlertInfo actionCancel={cancelAlert} show={alertCreate} msg="Recado cadastrado com sucesso!" type="success" />
            <AlertInfo actionCancel={cancelAlert} show={alertDelete} msg="Recado excluido" type="error" />
            <DialogTask
                title="Adicionar recado"
                titleBtn="Cadastrar"
                valid={!valid}
                openModal={openDialogCreate}
                detail={detail}
                description={description}
                actionDetail={(ev) => setDetail(ev.target.value)}
                actionDescription={(ev) => setDescription(ev.target.value)}
                actionCancel={handleClose}
                actionConfirm={saveTasks}
            />
            <DialogTask
                title="Editar recado"
                titleBtn="Editar"
                openModal={openDialogEdit}
                description={description}
                detail={detail}
                actionDetail={(ev) => {
                    setDetail(ev.target.value);
                    console.log(ev.target.value);
                }}
                actionDescription={(ev) => setDescription(ev.target.value)}
                actionCancel={handleCloseEdit}
                actionConfirm={editTask}
            />
            <ModalConfirm
                actionCancel={closeModalConfirm}
                actionConfirm={removeTask}
                tittle="Deseja realmente excluir o recado?"
                description={taskRemove?.description || ''}
                detail={taskRemove?.detail || ''}
                openModal={open}
            />
            <Fab
                onClick={handleClickOpen}
                sx={{
                    position: 'fixed',
                    bottom: '35px',
                    right: '35px',
                }}
                color="secondary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
        </>
    );
};

export default Tasks;
