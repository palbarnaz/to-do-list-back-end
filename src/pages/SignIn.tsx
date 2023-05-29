import HowToRegIcon from '@mui/icons-material/HowToReg';
import React from 'react';

import RegisterBox from '../components/form/RegisterBox';

const SignIn: React.FC = () => {
    return <RegisterBox icon={<HowToRegIcon fontSize="large" />} mode="signin" titleButton="Entrar" titleHeader="Entrar no sistema" />;
};

export default SignIn;
