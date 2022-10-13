import { Box, Button, MenuItem } from '@mui/material';
import { Platform, Textbook } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { useMuiForm } from '../../hooks';
import { Modal } from '../../components';
import { createTextbook } from '../../api/textbook';

export interface CreateTextbookProps {
  open: boolean;
  onClose: () => void;
}

export const platforms = [
  { label: '全部', value: Platform.ALL },
  { label: 'App', value: Platform.APP },
  { label: 'Web', value: Platform.WEB },
];

// id          Int       @id @default(autoincrement())
// createdAt   DateTime  @default(now())
// updatedAt   DateTime  @updatedAt
// title       String
// description String    @default("")
// cover       String    @default("")
// platform    Platform  @default(ALL)
// cost        Int       @default(0)
// validDays   Int       @default(0)
// published   Boolean   @default(false)
// publishedAt DateTime?
// units       Unit[]

const unitKeyMap = {
  title: '二级目录',
};

const sentenceKeyMap = {
  character: '角色',
  content: '原文',
  translation: '译文',
  analysis: '解析',
  image: '图片文件名',
  audio: '音频文件名',
  video: '视频文件名',
  completion: {
    create: {
      title: '填空题目文字',
      answer: '填空题答案',
      file: '填空题目文件名',
      hintText: '填空题提示文字',
      hintFile: '填空题提示文件名',
    },
  },
  choice: {
    create: {
      title: '选择题目文字',
      answer: '选择题答案',
      file: '选择题目文件名',
      hintText: '选择题提示文字',
      hintFile: '选择题提示文件名',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
  },
};

const getObjByMap = (map: Record<string, any>, source: any) => {
  const result: any = {};
  Object.keys(map).forEach((key) => {
    const value = map[key];
    if (Array.isArray(value)) {
      result[key] = value.map((v) => source[v]).filter(Boolean);
    } else if (typeof value === 'object') {
      result[key] = getObjByMap(value, source);
    } else {
      result[key] = source[value];
    }
  });
  return result;
};

export function CreateTextbook({ open, onClose }: CreateTextbookProps) {
  const { handleSubmit, formItems } = useMuiForm<Textbook>({
    items: [
      { label: '标题', name: 'title', rules: { required: '标题不能为空' } },
      {
        label: '描述',
        name: 'description',
        rules: { required: '描述不能为空' },
      },
      {
        label: '平台',
        name: 'platform',
        select: true,
        defaultValue: Platform.ALL,
        children: platforms.map((v) => (
          <MenuItem key={v.value} value={v.value}>
            {v.label}
          </MenuItem>
        )),
      },
      {
        label: '有效天数',
        type: 'number',
        defaultValue: 30,
        name: 'validDays',
        rules: { min: { value: 1, message: '不能小于 1' } },
      },
      {
        label: '花费点数',
        type: 'number',
        defaultValue: 0,
        name: 'cost',
        rules: { min: { value: 0, message: '不能小于 0' } },
      },
    ],
  });

  const create = useMutation(createTextbook, {
    onSuccess() {},
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
  });

  async function handleFileAsync(file: File) {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const arr: any[] = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    const unitsMap = new Map();
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const unitTitle = item[unitKeyMap.title];
      if (unitTitle) {
        const sentence = getObjByMap(sentenceKeyMap, item);
        if (!sentence.completion.create.title) {
          sentence.completion = undefined;
        }
        if (!sentence.choice.create.title) {
          sentence.choice = undefined;
        }
        if (!unitsMap.get(unitTitle)) {
          unitsMap.set(unitTitle, []);
        }
        const unit = unitsMap.get(unitTitle);
        sentence.sort = unit.length + 1;
        unit.push(sentence);
      }
    }
    return [...unitsMap].map(([key, value], i) => {
      return {
        title: key,
        sort: i + 1,
        sentences: { create: value },
      };
    });
  }

  const submit = async () => {
    const units = await handleFileAsync(acceptedFiles[0]);
    handleSubmit((data) => {
      create.mutate({ ...data, units: { create: units } });
    })();
  };

  return (
    <Modal
      title="新增课程"
      open={open}
      onClose={onClose}
      onConfirm={submit}
      confirmLoading={create.isLoading}
    >
      {formItems}
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 100,
          p: 3,
          borderStyle: 'dashed',
          borderColor: 'grey.500',
          color: 'text.secondary',
          mt: 2,
        }}
        fullWidth
        variant="outlined"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span>点击或拖拽到此处, 上传学习文件</span>
        <Box sx={{ color: 'text.disabled' }}>{acceptedFiles[0]?.name}</Box>
      </Button>
    </Modal>
  );
}
