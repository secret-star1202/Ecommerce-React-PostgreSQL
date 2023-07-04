import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHook';
import { registerUser } from '../../../redux/reducers/userSlice';
import { PageContainer, RegisterContainer } from './Register.styles';
import { IUserRegister } from '../../../types/auth';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
    avatar: yup.mixed().required(),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserRegister) => {
    dispatch(registerUser(data));
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label>Avatar</label>
            <TextField
              variant="outlined"
              type="file"
              {...register('avatar', { required: 'Required' })}
              error={!!errors.avatar}
              helperText={errors.avatar ? errors.avatar.message : null}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">
              Submit
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
