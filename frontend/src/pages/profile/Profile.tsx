import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { reset } from '../../redux/reducers/authSlice';
import { LoginContainer } from '../user-forms/login/Login.styles';

export const PageContainer = styled(Container)`
  height: 100vh;
`;
const Profile = () => {
  const userInfo = useAppSelector((state) => state.auth);
  const authInfo = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <LoginContainer>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            border: '1px solid gray',
          }}
        >
          {authInfo.loggedIn ? (
            <Box>
              <Box>
                <Typography variant="h5">User Information</Typography>
              </Box>
              <Box>{userInfo.userInfo?.initials}</Box>
              <Box
                maxWidth="lg"
                key={userInfo.userInfo?.id}
                sx={{
                  width: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <TextField
                  variant="outlined"
                  label={authInfo.userInfo?.name}
                  sx={{ mb: 2 }}
                  type="text"
                  disabled
                />
                <TextField
                  variant="outlined"
                  label={userInfo.userInfo?.email}
                  sx={{ mb: 2 }}
                  type="password"
                  disabled
                />
                <TextField
                  variant="outlined"
                  label={userInfo.userInfo?.password}
                  sx={{ mb: 2 }}
                  type="password"
                  disabled
                />
                <Button variant="contained">Edit</Button>
              </Box>
              <Button
                variant="contained"
                color="warning"
                onClick={() => dispatch(reset(navigate('/')))}
              >
                log out
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </LoginContainer>
    </PageContainer>
  );
};

export default Profile;
