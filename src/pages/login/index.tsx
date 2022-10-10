import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@hlx/frame';
import { Avatar, Box, Container, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { LoginDto } from '@hlx/dto';
import { useMuiForm } from '@hlx/hooks';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, useLocation } from 'react-router-dom';

import { login } from '../../api/auth';

export function LoginPage() {
  const { signin, token } = useAuth();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const loginMutation = useMutation(login, {
    onSuccess(data) {
      signin(data);
    },
  });

  const { handleSubmit, formItems } = useMuiForm<LoginDto>({
    items: [
      {
        name: 'phone',
        label: '手机号',
        defaultValue: '15623530290',
        rules: { required: '手机号不能为空' },
      },
      {
        name: 'password',
        label: '密码',
        defaultValue: '4588335',
        rules: { required: '密码不能为空' },
      },
    ],
  });

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          mt: 12,
          backgroundColor: '#fff',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
        >
          {formItems}
          <LoadingButton
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            type="submit"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            loading={loginMutation.isLoading}
          >
            登录
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  );
}
