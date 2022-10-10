import { RouteObject, UNSAFE_DataRouterContext, useLocation, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useContext } from 'react';

interface Sidebar {
  path: string;
  name: string;
  icon?: React.ReactNode;
}

const getSidebar = (routes: RouteObject[], parentPath = '', result: Sidebar[] = []) => {
  routes.forEach((route) => {
    const path = `${parentPath}/${route.path || ''}`.replace(/\/\//g, '/');
    if (route.handle?.nav) {
      result.push({ path, name: route.handle.nav, icon: route.handle.icon });
    }
    if (route.children) {
      getSidebar(route.children, path, result);
    }
  });
  return result;
};

export function Slider({ onClick }: { onClick?: VoidFunction }) {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useContext(UNSAFE_DataRouterContext).router.routes;

  const sidebar = getSidebar(data);

  const handleClick = (item: Sidebar) => {
    navigate(item.path);
    onClick?.();
  };

  const selectedKey = location.pathname;

  return (
    <List
      sx={{
        p: 2,
        width: 240,
      }}
      component="nav"
    >
      {sidebar.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton selected={selectedKey === item.path} onClick={() => handleClick(item)}>
            <ListItemIcon sx={{ minWidth: 35, color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
