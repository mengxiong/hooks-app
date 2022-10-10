import { MxTable, MxTableCols } from '@hlx/components';
import { Button, Chip, Stack } from '@mui/material';
import { Textbook as TextbookData } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { textbookApi } from '../../api/textbook';
import { PageContainer } from '../../layout/PageContainer';

export function Units() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(['textbookDetail', id], () =>
    textbookApi.findOne(id)
  );

  const rows = data?.units;

  const columns: MxTableCols<TextbookData> = [
    { title: 'id', field: 'id' },
    { title: '名称', field: 'title' },
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
    <PageContainer>
      <MxTable columns={columns} isLoading={isLoading} error={error} rows={rows} />
    </PageContainer>
  );
}
