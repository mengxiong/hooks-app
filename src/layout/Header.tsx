import { Toolbar, IconButton, Menu, MenuItem, Avatar, Divider, Link } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '@hlx/frame';

export function Header({ children }: { children?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useAuth();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ background: '#fff', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
      {children}
      <Link
        href="/"
        sx={{
          flex: '0 1 198px',
          height: '45px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
        }}
      ></Link>
      <span style={{ flex: '1 1 0%' }}></span>
      <IconButton
        size="large"
        sx={{ p: 0, ml: '12px' }}
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar>H</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem dense>{auth.token.user.phone}</MenuItem>
        <Divider />
        <MenuItem dense onClick={() => auth.signout()}>
          退出
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}
