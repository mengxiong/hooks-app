import { Outlet } from 'react-router-dom';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Header } from './Header';
import { Slider } from './Slider';

export function Layout() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {sm ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Slider onClick={() => setOpen(false)} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          PaperProps={{ sx: { position: 'relative', zIndex: 0 } }}
          open={open}
        >
          <Slider />
        </Drawer>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        <Header>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Header>
        <Outlet />
      </Box>
    </Box>
  );
}
