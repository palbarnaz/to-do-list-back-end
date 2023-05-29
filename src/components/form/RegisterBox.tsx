import { Box, Container, Paper } from '@mui/material';
import React from 'react';

import Form from './Form';
import HeaderForm from './HeaderForm';

interface RegisterBoxProps {
    titleHeader: string;
    titleButton: string;
    mode: 'signin' | 'signup';
    icon: React.ReactNode;
}

const RegisterBox: React.FC<RegisterBoxProps> = ({ titleHeader, icon, mode, titleButton }) => {
    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper elevation={16}>
                <Box component="section" marginY={4} marginX={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <HeaderForm title={titleHeader} color="#ab47bc" icon={icon} />
                    <Form textButton={titleButton} mode={mode} />
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterBox;
