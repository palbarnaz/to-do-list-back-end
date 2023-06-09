import { FavoriteBorderSharp } from '@mui/icons-material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FolderIcon from '@mui/icons-material/Folder';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';

interface CardTaskProps {
    description: string;
    detail: string;
    archived: string;
    actionDelete?: () => void;
    actionEdit?: () => void;
    actionArchived?: () => void;
    mode: 'tasks' | 'favorites';
}

const CardTask: React.FC<CardTaskProps> = ({ description, detail, archived, actionDelete, actionEdit, actionArchived, mode }) => {
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
                            <IconButton size="small" onClick={actionArchived}>
                                {archived ? <FolderIcon /> : <DriveFolderUploadIcon />}
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
