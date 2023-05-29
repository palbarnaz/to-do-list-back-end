import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';

import RegisterBox from '../components/form/RegisterBox';

const SignUp: React.FC = () => {
    return <RegisterBox icon={<AccountCircleIcon fontSize="large" />} mode="signup" titleButton="Criar Conta" titleHeader="Cadastrar" />;
};

export default SignUp;
