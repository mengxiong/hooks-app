import { Breadcrumbs as BreadcrumbComponent, Link, Typography } from '@mui/material';
import { useMatches } from 'react-router-dom';
import type { RouteHandle } from '../routes';

export interface BreadcrumbLink {
  name: string;
  path: string;
}

export function Breadcrumbs() {
  const matches = useMatches().filter((v) => (v.handle as RouteHandle)?.breadcrumb);

  const list = matches.map((item, index) => {
    const { breadcrumb, nav } = item.handle as RouteHandle;
    let name = breadcrumb;
    if (breadcrumb === true) {
      name = nav;
    }

    if (index !== matches.length - 1) {
      return (
        <Link underline="hover" key={item.pathname} color="inherit" href={item.pathname}>
          {name}
        </Link>
      );
    }
    return (
      <Typography variant="h6" key={item.pathname} fontSize="1rem" color="text.primary">
        {name}
      </Typography>
    );
  });

  return <BreadcrumbComponent aria-label="breadcrumb">{list}</BreadcrumbComponent>;
}
