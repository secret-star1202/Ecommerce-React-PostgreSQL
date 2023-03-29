import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { useEffect, useState } from 'react';
import { LoginContainer, PageContainer } from './Login.styles';
import { loginUser } from '../../../redux/reducers/authSlice';

interface ILoginInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.authReducer);
  // const usersInfo = useAppSelector((state) => state.userReducer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authInfo.loggedIn && !authInfo.error) navigate('/');
  }, [authInfo.loggedIn, navigate, authInfo.error]);

  useEffect(() => {
    if (!authInfo.loggedIn && authInfo.error) navigate('/login');
  }, [authInfo.loggedIn, navigate, authInfo.error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILoginInputs) => {
    try {
      const credentials = {
        email: data.email,
        password: data.password,
      };
      await dispatch(loginUser(credentials));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageContainer>
      {authInfo.loggedIn ? (
        ''
      ) : (
        <LoginContainer
          maxWidth="xs"
          sx={{
            p: 4,
            boxShadow: 6,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4">Login</Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                variant="outlined"
                label="Email Address"
                autoComplete="email"
                {...register('email', { required: 'Required' })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
                sx={{ mb: 2 }}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <TextField
                variant="outlined"
                label="Password"
                {...register('password', { required: 'Required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
                sx={{ mb: 2 }}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h6"> Don't have an account yet? </Typography>
              <Button variant="text" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Box>
          </form>
        </LoginContainer>
      )}
    </PageContainer>
  );
};
export default Login;
