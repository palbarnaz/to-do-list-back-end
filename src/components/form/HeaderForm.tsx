import { Avatar, Typography } from '@mui/material';
import React from 'react';

interface HeaderFormProps {
    title: string;
    icon: React.ReactNode;
    color: string;
}

const HeaderForm: React.FC<HeaderFormProps> = ({ title, icon, color }) => {
    return (
        <>
            <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>

            <Typography variant="h4">{title}</Typography>
        </>
    );
};

export default HeaderForm;
