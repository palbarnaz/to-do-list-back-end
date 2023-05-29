import { Container, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { Task } from '../../types/Task';
import CardTask from './CardTask';

interface ListTasksProps {
    tasks: Task[];
    title: string;
    actionDelete?: (itemRemove: Task) => void;
    actionEdit?: (itemEdit: Task) => void;
    actionFavorite?: (taskFavorite: Task) => void;
}

const ListTasks: React.FC<ListTasksProps> = ({ tasks, title, actionDelete, actionEdit, actionFavorite }) => {
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
                        {tasks.length ? (
                            tasks.map((item: any) => {
                                return (
                                    <CardTask
                                        key={item.id}
                                        mode="tasks"
                                        description={item.description}
                                        detail={item.detail}
                                        favorite={item.favorite}
                                        actionFavorite={() => executeAction(item, actionFavorite)}
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
