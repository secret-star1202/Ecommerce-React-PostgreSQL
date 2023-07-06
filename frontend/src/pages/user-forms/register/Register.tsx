import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../redux/reducers/authSlice';
import { IUserRegister } from '../../../types/auth';
import { useAppDispatch } from '../../../hooks/reduxHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PageContainer, RegisterContainer } from './Register.styles';
import { useNavigate } from 'react-router-dom';

const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .required('Password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = handleSubmit((data) => {
    dispatch(registerUser(data));
    navigate('/login');
  });

  return (
    <PageContainer>
      <RegisterContainer
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
          <Typography variant="h4">Sign Up</Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              variant="outlined"
              label="Name"
              {...register('name', { required: 'Required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
              sx={{ mb: 2 }}
            />
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
              Register
            </Button>
          </Box>
          <Box
            onClick={() => navigate('/login')}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button variant="text">Login to your account? </Button>
          </Box>
        </form>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;
