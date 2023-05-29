import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface ModalConfirmProps {
    tittle: string;
    description: string;
    detail: string;
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ tittle, description, detail, openModal, actionCancel, actionConfirm }) => {
    const handleClose = () => {
        actionCancel();
    };

    return (
        <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{tittle}</DialogTitle>
            <DialogContent>
                <Card sx={{ margin: '15px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {detail}
                        </Typography>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#3a3a3a',
                        ':hover': {
                            backgroundColor: '#3a3a3a',
                        },
                    }}
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#3a3a3a',
                        ':hover': {
                            backgroundColor: '#3a3a3a',
                        },
                    }}
                    onClick={actionConfirm}
                    autoFocus
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirm;
