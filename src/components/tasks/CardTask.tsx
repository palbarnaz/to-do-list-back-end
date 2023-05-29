import { FavoriteBorderSharp } from '@mui/icons-material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';

interface CardTaskProps {
    description: string;
    detail: string;
    favorite: string;
    actionDelete?: () => void;
    actionEdit?: () => void;
    actionFavorite?: () => void;
    mode: 'tasks' | 'favorites';
}

const CardTask: React.FC<CardTaskProps> = ({ description, detail, favorite, actionDelete, actionEdit, actionFavorite, mode }) => {
    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {detail}
                        </Typography>
                    </CardContent>
                    {mode === 'tasks' ? (
                        <CardActions>
                            <IconButton size="small" onClick={actionFavorite}>
                                {favorite ? <FavoriteSharpIcon color="error" /> : <FavoriteBorderSharp />}
                            </IconButton>

                            <IconButton onClick={actionEdit} size="small">
                                <EditSharpIcon sx={{ color: '#ab47bc' }} />
                            </IconButton>
                            <IconButton onClick={actionDelete} size="small">
                                <DeleteSharpIcon />
                            </IconButton>
                        </CardActions>
                    ) : (
                        <CardActions>
                            <IconButton size="small">
                                <FavoriteSharpIcon color="error" />
                            </IconButton>
                        </CardActions>
                    )}
                </Card>
            </Grid>
        </>
    );
};

export default CardTask;
