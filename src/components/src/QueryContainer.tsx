import React, { useLayoutEffect, useRef, useState } from 'react';
import { Box, BoxProps, CircularProgress, Fade, Typography } from '@mui/material';
import EmptyImage from './empty.svg';

export interface QueryContainerProps<T> {
  isEmpty?: (data: T) => boolean;
  isLoading?: boolean;
  error?: Error;
  wrapStateElement?: (element: React.ReactNode) => React.ReactNode;
  data: T;
}

const isDefaultEmpty = (value: unknown) => {
  return value === undefined || (Array.isArray(value) && value.length === 0);
};

function Loading() {
  return (
    <Fade in>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    </Fade>
  );
}

function EmptyState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <EmptyImage />
      <Typography variant="caption" color="#969799">
        暂无数据
      </Typography>
    </Box>
  );
}

function ErrorState({ error }: { error: Error }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="body1" color="error">
        {error.message || '加载失败'}
      </Typography>
    </Box>
  );
}

export function QueryContainer<T>(props: QueryContainerProps<T> & BoxProps) {
  const {
    error,
    isLoading,
    data,
    isEmpty = isDefaultEmpty,
    wrapStateElement,
    sx,
    children,
    ...restProps
  } = props;
  const timeoutRef = useRef<number>();

  const [loadingVisible, setLoadingVisible] = useState(false);

  useLayoutEffect(() => {
    if (isLoading) {
      timeoutRef.current = window.setTimeout(() => {
        setLoadingVisible(true);
      }, 100);
    } else {
      window.clearTimeout(timeoutRef.current);
      setLoadingVisible(false);
    }
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  let stateElement: React.ReactNode;
  if (error) {
    stateElement = <ErrorState error={error as Error} />;
  } else if (!isLoading && isEmpty(data)) {
    stateElement = <EmptyState />;
  } else if (loadingVisible) {
    stateElement = <Loading />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 100,
        opacity: loadingVisible ? 0.5 : undefined,
        ...sx,
      }}
      {...restProps}
    >
      {children}
      {wrapStateElement && stateElement ? wrapStateElement(stateElement) : stateElement}
    </Box>
  );
}
