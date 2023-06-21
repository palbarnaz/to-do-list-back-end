import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AlertInfo from '../components/AlertInfo';
import DialogTask from '../components/tasks/DialogTask';
import ListTasks from '../components/tasks/ListTasks';
import ModalConfirm from '../components/tasks/ModalConfirm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteTask, editTask, getAllTask, saveTask, selectAll, statusTask, taskRequest, tEdit } from '../store/modules/tasksSlice';
import { getUserId } from '../store/modules/userSlice';
import { Task } from '../types/Task';

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
    const [alertTask, setAlertTask] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const tasks = useAppSelector(selectAll);
    const userLogged = sessionStorage.getItem('userLoggedId');

    useEffect(() => {
        if (!userLogged) {
            navigate('/');
        }

        dispatch(getUserId(userLogged ?? ''));
        dispatch(getAllTask(userLogged ?? ''));
    }, []);

    useEffect(() => {
        if (description.length > 3 && detail.length > 3) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [description, detail]);

    const handleClickOpen = () => {
        setOpenDialogCreate(true);
    };
    const handleClose = () => {
        setOpenDialogCreate(false);
    };

    const existTask = (description: string) => {
        const exist = tasks.some((t) => t.description === description.toLocaleLowerCase());
        if (exist) {
            setAlertTask(true);
        }
        return exist;
    };

    const saveTasks = () => {
        if (!existTask(description)) {
            const userId = user?.id ?? '';
            dispatch(saveTask({ task: { id: Date.now().toString(), description, detail, archived: false }, idUser: userId }));
        }
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
        setDescription('');
        setDetail('');
    };

    const editT = useCallback(() => {
        if (!existTask(description)) {
            const newTask = { id: taskEdit?.id, description, detail, archived: taskEdit?.archived } as Task;
            const userId = user?.id ?? '';
            const taskId = taskEdit?.id ?? '';
            const taskEdited = { idTask: taskId, idUser: userId, tEdit: newTask } as tEdit;
            dispatch(editTask(taskEdited));
        }

        setDescription('');
        setDetail('');
        setOpenDialogEdit(false);
    }, [taskEdit, description, detail]);

    const openModalDelete = (itemRemove: Task) => {
        setTaskRemove(itemRemove);
        setOpen(true);
    };

    const closeModalConfirm = useCallback(() => {
        setOpen(false);
        setTaskRemove(undefined);
    }, []);

    const removeTask = useCallback(() => {
        const tRemove = { idUser: user?.id, idTask: taskRemove?.id } as taskRequest;

        dispatch(deleteTask(tRemove));

        closeModalConfirm();
    }, [taskRemove]);

    const addArchived = (recado: Task) => {
        const status = recado.archived;

        const tArchived = { idUser: user?.id, idTask: recado?.id, archived: !status } as taskRequest;

        dispatch(statusTask(tArchived));
    };

    const cancelAlert = () => {
        if (alertTask) {
            setAlertTask(false);
        }
    };

    return (
        <>
            <ListTasks
                title="Meus Recados "
                tasks={tasks || []}
                actionArchived={addArchived}
                actionDelete={openModalDelete}
                actionEdit={openModalEdit}
            />

            <AlertInfo actionCancel={cancelAlert} show={alertTask} msg="Recado já existente" type="error" />

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
                }}
                actionDescription={(ev) => setDescription(ev.target.value)}
                actionCancel={handleCloseEdit}
                actionConfirm={editT}
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
