import { Button, Chip, Stack } from '@mui/material';
import { Textbook as TextbookData } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MxTable, MxTableCols } from '../../components';
import { getTextbooks } from '../../api/textbook';
import { PageContainer } from '../../layout/PageContainer';
import { CreateTextbook } from './CreateTextbook';

export function Textbook() {
  const { isLoading, error, data } = useQuery(['textbooks'], getTextbooks);
  const [open, setOpen] = useState(false);

  const rows = data?.data;

  const columns: MxTableCols<TextbookData> = [
    { title: 'id', field: 'id' },
    { title: '名称', field: 'title' },
    { title: '描述', field: 'description' },
    { title: '平台', field: 'platform' },
    { title: '有效天数', field: 'validDays' },
    { title: '扣除点数', field: 'cost' },
    {
      title: '状态',
      field: 'published',
      render: (row, value: boolean) => (
        <Chip label={value ? '已发布' : '未发布'} color={value ? 'success' : 'default'} />
      ),
    },
    { title: '创建时间', field: 'createdAt', type: 'datetime' },
    {
      title: '操作',
      field: 'actions',
      render: () => {
        return (
          <Stack direction="row" spacing={1}>
            <Button size="small">编辑</Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <PageContainer
      actions={
        <Button onClick={() => setOpen(true)} variant="contained">
          新增课程
        </Button>
      }
    >
      <MxTable columns={columns} isLoading={isLoading} error={error} rows={rows} />
      <CreateTextbook open={open} onClose={() => setOpen(false)} />
    </PageContainer>
  );
}
