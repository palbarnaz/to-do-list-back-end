import { Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

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
                                        },
                                    }}
                                    label="Filtrar recado por descrição"
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
                                        },
                                    }}
                                >
                                    <InputLabel
                                        sx={{
                                            color: 'white',
                                        }}
                                    >
                                        Status
                                    </InputLabel>
                                    <Select
                                        sx={{ color: 'white' }}
                                        // value={age}
                                        label="Age"
                                        // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Arquivados</MenuItem>
                                        <MenuItem value={20}>Desarquivados</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Box>
                                <Button
                                    sx={{
                                        height: '55px',
                                        backgroundColor: '#3a3a3a',
                                        ':hover': {
                                            backgroundColor: '#3a3a3a',
                                        },
                                    }}
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
