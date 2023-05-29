import { Alert, Stack } from '@mui/material';
import React, { useEffect } from 'react';

interface AlertInfoProps {
    msg: string;
    type: 'error' | 'success' | 'info';
    show: boolean;
    actionCancel: () => void;
}

const AlertInfo: React.FC<AlertInfoProps> = ({ msg, type, show, actionCancel }) => {
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                actionCancel();
            }, 2000);
        }
    }, [show]);
    return (
        <>
            <Stack sx={{ width: '300px', position: 'fixed', top: '65px', right: '35px' }} spacing={2}>
                {show && <Alert severity={type}>{msg}</Alert>}
            </Stack>
        </>
    );
};

export default AlertInfo;
