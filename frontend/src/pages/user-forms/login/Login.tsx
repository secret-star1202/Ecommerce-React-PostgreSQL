import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { loginUser, setRegistered } from '../../../redux/reducers/authSlice';
import { useEffect } from 'react';
import { LoginContainer, PageContainer } from './Login.styles';

interface ILoginInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (authInfo.loggedIn && !authInfo.error) {
      navigate('/');
    }
    if (!authInfo.userInfo) {
      dispatch(setRegistered()); // Set isRegistered to false if no user data exists
    }
  }, [
    authInfo.loggedIn,
    authInfo.error,
    authInfo.userInfo,
    dispatch,
    navigate,
  ]);

  const onSubmit = async (data: ILoginInputs) => {
    try {
      const credentials = {
        email: data.email,
        password: data.password,
      };
      await dispatch(loginUser(credentials)).unwrap();
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
                type="email"
              />
              <TextField
                variant="outlined"
                label="Password"
                {...register('password', { required: 'Required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
                sx={{ mb: 2 }}
                type="password"
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
              <Typography variant="h6">Don't have an account yet?</Typography>
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
