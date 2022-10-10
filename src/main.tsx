import ReactDOM from 'react-dom/client';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthRouterProvider } from './auth';
import { queryClient } from './queryClient';
import { routes } from './routes';
import { Theme } from './theme';

// TODO: 不使用 antd, 不好看, 和mui切换不好用

const element = document.getElementById('root')!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <CssBaseline />
        <SnackbarProvider
          autoHideDuration={1500}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
        <AuthRouterProvider routes={routes} />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
);
