import { Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTask, tasksFilter, tFilter } from '../../store/modules/tasksSlice';
import { Task } from '../../types/Task';
import CardTask from './CardTask';

interface ListTasksProps {
    tasks: Task[];
    title: string;
    actionDelete?: (itemRemove: Task) => void;
    actionEdit?: (itemEdit: Task) => void;
    actionArchived?: (taskArchived: Task) => void;
}

const ListTasks: React.FC<ListTasksProps> = ({ tasks, title, actionDelete, actionEdit, actionArchived }) => {
    const [filterDescription, setFilterDescription] = useState('');
    const [valueSelect, setValueSelect] = useState('');

    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleFilter = () => {
        let status;
        if (valueSelect === 'a') {
            status = true;
        } else if (valueSelect === 'd') {
            status = false;
        }
        let filter = {} as tFilter;

        if (status !== undefined) {
            filter = { idUser: user?.id, description: filterDescription, archived: status } as tFilter;
        } else {
            filter = { idUser: user?.id, description: filterDescription } as tFilter;
        }
        dispatch(tasksFilter(filter));
    };

    const clearFilter = () => {
        dispatch(getAllTask(user?.id ?? ''));
        setValueSelect('');
        setFilterDescription('');
    };

    const executeAction = (item: Task, action?: (item: Task) => void) => {
        if (action) {
            action(item);
        }
    };
    return (
        <Grid container marginBottom={10}>
            <Grid item xs={12}>
                <Container sx={{ marginTop: '20px' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h4">{title}</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="center">
                            <Box component="form" width="300px" marginX="10px">
                                <TextField
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#E0E3E7',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#ffffff', // Altere aqui para a cor desejada
                                            },
                                        },
                                    }}
                                    onChange={(e) => setFilterDescription(e.target.value)}
                                    label="Filtrar recado por descrição"
                                    value={filterDescription}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                            <Box>
                                <FormControl
                                    sx={{
                                        width: '150px',
                                        '& label.Mui-focused': {
                                            color: '#ffffff',
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: '#ffffff',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#E0E3E7',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffffff',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#ffffff', // Altere aqui para a cor desejada
                                            },
                                        },
                                    }}
                                >
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        sx={{
                                            color: 'white',
                                        }}
                                    >
                                        Status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={valueSelect}
                                        label="status"
                                        onChange={(e) => setValueSelect(e.target.value as string)}
                                    >
                                        <MenuItem value="a">Arquivado</MenuItem>
                                        <MenuItem value="d">Desarquivado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Box width="260px" sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button
                                    sx={{
                                        height: '55px',
                                        backgroundColor: '#3a3a3a',
                                        ':hover': {
                                            backgroundColor: '#3a3a3a',
                                        },
                                    }}
                                    type="submit"
                                    onClick={clearFilter}
                                    variant="contained"
                                >
                                    Limpar filtros
                                </Button>
                                <Button
                                    sx={{
                                        height: '55px',
                                        backgroundColor: '#3a3a3a',
                                        ':hover': {
                                            backgroundColor: '#3a3a3a',
                                        },
                                    }}
                                    onClick={handleFilter}
                                    type="submit"
                                    variant="contained"
                                >
                                    Filtrar
                                </Button>
                            </Box>
                        </Grid>
                        {tasks.length ? (
                            tasks.map((item: any) => {
                                return (
                                    <CardTask
                                        key={item.id}
                                        mode="tasks"
                                        description={item.description}
                                        detail={item.detail}
                                        archived={item.archived}
                                        actionArchived={() => executeAction(item, actionArchived)}
                                        actionEdit={() => executeAction(item, actionEdit)}
                                        actionDelete={() => executeAction(item, actionDelete)}
                                    />
                                );
                            })
                        ) : (
                            <Box margin={5}>
                                <Typography variant="h6">Nenhum recado existente!</Typography>
                            </Box>
                        )}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ListTasks;
