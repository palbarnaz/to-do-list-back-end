/* eslint-disable no-lonely-if */
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveUserLogged } from '../../store/modules/userLoggedSlice';
import { clearError, loginUserThunk, saveUser } from '../../store/modules/userSlice';
import AlertInfo from '../AlertInfo';

interface FormProps {
    mode: 'signin' | 'signup';
    textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
    const [emailUser, setEmailUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [alertCreateUser, setAlertCreateUser] = useState<boolean>(false);
    const [alertInfo, setAlertInfo] = useState<boolean>(false);
    const [alertUserError, setAlertUserError] = useState<boolean>(false);
    const { user, errorCreate, errorLogin, successCreate } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const userLogged = useAppSelector((state) => state.userLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('userLoggedId')) {
            navigate('/tasks');
        }
    }, []);

    useEffect(() => {
        if (mode === 'signup') {
            const emailValid = (emailUser.includes('.com') || emailUser.includes('.com.br')) && emailUser.includes('@');

            if (emailUser.length > 0) {
                setErrorEmail(!emailValid);
            }

            const passwordValid = password.length >= 6 && password.length <= 8;
            if (password.length > 0) {
                setErrorPassword(!passwordValid);
            }

            const repasswordValid = password === repassword;
            if (repassword.length > 0) {
                setErrorRepassword(!repasswordValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid));
        }
    }, [emailUser, password, repassword, mode]);

    useEffect(() => {
        if (errorLogin) setAlertUserError(true);
        dispatch(clearError());
    }, [errorLogin]);

    useEffect(() => {
        if (successCreate) setAlertCreateUser(true);
        dispatch(clearError());
    }, [successCreate]);

    useEffect(() => {
        if (errorCreate) setAlertInfo(true);
        // dispatch(clearError());
    }, [errorCreate]);

    useEffect(() => {
        if (user) {
            dispatch(saveUserLogged(user?.id ?? ''));
        }
    }, [user]);

    useEffect(() => {
        if (userLogged.value) {
            navigate('/tasks');

            sessionStorage.setItem('userLoggedId', userLogged.value ?? '');
        }
    }, [userLogged]);

    function addUsers(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (mode === 'signup') {
            dispatch(saveUser({ emailUser, id: Date.now().toString(), password, tasks: [] }));

            setEmailUser('');
            setPassword('');
            setRepassword('');
        } else {
            const login = { emailUser, password };
            dispatch(loginUserThunk(login));
        }
    }

    const cancelAlert = () => {
        if (alertCreateUser) {
            setAlertCreateUser(false);
        } else if (alertUserError) {
            setAlertUserError(false);
            return;
        }

        setAlertInfo(false);
    };

    return (
        <Box component="form" marginTop={1} onSubmit={(e) => addUsers(e)}>
            <AlertInfo actionCancel={cancelAlert} show={alertCreateUser} msg="Usuário cadastrado com sucesso!" type="success" />
            <AlertInfo actionCancel={cancelAlert} show={alertInfo} msg="Usuário já cadastrado!" type="info" />
            <AlertInfo actionCancel={cancelAlert} show={alertUserError} msg="Conta não cadastrada! Verifique o usuário ou senha." type="error" />

            <TextField
                value={emailUser}
                name="emailUser"
                margin="normal"
                error={errorEmail}
                helperText={errorEmail ? 'E-mail inválido, deve incluir -@- e -.com-' : ''}
                onChange={(e) => setEmailUser(e.target.value)}
                variant="outlined"
                type="email"
                required
                label="E-mail"
                fullWidth
            />
            <TextField
                value={password}
                margin="normal"
                name="password"
                error={errorPassword}
                helperText={errorPassword ? 'A senha deve ter ao menos 6 caracteres' : ''}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
                label="Senha"
                fullWidth
            />

            {mode === 'signup' && (
                <TextField
                    value={repassword}
                    error={errorRepassword}
                    helperText={errorRepassword ? 'As senhas devem ser iguais' : ''}
                    margin="normal"
                    onChange={(e) => setRepassword(e.target.value)}
                    variant="outlined"
                    type="password"
                    required
                    label="Digite a senha novamente"
                    fullWidth
                />
            )}

            <Button
                type="submit"
                disabled={disabled}
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: '#3a3a3a',
                    ':hover': {
                        backgroundColor: '#3a3a3a',
                    },
                    mt: 3,
                    mb: 2,
                }}
            >
                {textButton}
            </Button>
            <Grid container justifyContent="center">
                <Grid item xs={8} textAlign="end">
                    {mode === 'signin' ? (
                        <Typography textAlign="center" variant="body2">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/signup">
                                Não tem uma conta? Cadastre-se
                            </Link>
                        </Typography>
                    ) : (
                        <Typography textAlign="center" variant="body2">
                            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">
                                Já tem uma conta?
                            </Link>
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Form;
