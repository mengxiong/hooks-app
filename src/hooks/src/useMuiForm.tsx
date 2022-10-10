import { TextField, TextFieldProps } from '@mui/material';
import { useForm, Controller, UseControllerProps } from 'react-hook-form';

export interface UseMuiFormProps<T> {
  items: Array<TextFieldRule<T>>;
}

type Rule<Type, T> = { fieldType?: Type } & Pick<
  UseControllerProps<T>,
  'name' | 'rules' | 'defaultValue'
>;

type TextFieldRule<T> = Rule<'textfield', T> & TextFieldProps;

export function useMuiForm<T>({ items }: UseMuiFormProps<T>) {
  const { handleSubmit, control } = useForm<T>();

  const formItems = items.map(({ rules, name, defaultValue, fieldType, ...restProps }) => {
    return (
      <Controller
        key={name}
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => {
          switch (fieldType) {
            default:
              return (
                <TextField
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  required={!!rules?.required}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...restProps}
                  {...field}
                ></TextField>
              );
          }
        }}
      />
    );
  });

  return { handleSubmit, formItems };
}
