import { Box, Container } from '@mui/material';
import { Breadcrumbs } from './Breadcrumbs';

export interface PageContainerProps {
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PageContainer({ actions, children }: PageContainerProps) {
  return (
    <Container
      fixed={false}
      sx={{
        position: 'relative',
        flex: 1,
        overflow: 'auto',
        py: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Breadcrumbs />
        {actions}
      </Box>
      {children}
    </Container>
  );
}
