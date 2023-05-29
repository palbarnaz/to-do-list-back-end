import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React from 'react';

interface DialogTaskProps {
    title: string;
    titleBtn: string;
    description: string;
    detail: string;
    valid?: boolean;
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
    actionDescription: (ev: any) => void;
    actionDetail: (ev: any) => void;
}

const DialogTask: React.FC<DialogTaskProps> = ({
    title,
    titleBtn,
    description,
    detail,
    valid,
    openModal,
    actionCancel,
    actionConfirm,
    actionDescription,
    actionDetail,
}) => {
    const handleClose = () => {
        actionCancel();
    };
    return (
        <>
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle alignSelf="center" variant="h5">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} marginTop="2px">
                        <Grid item xs={12}>
                            <TextField fullWidth value={description} label="Descrição" onChange={actionDescription} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth value={detail} label="Detalhamento" onChange={actionDetail} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ margin: 2 }}>
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
                        disabled={valid}
                    >
                        {titleBtn}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogTask;
