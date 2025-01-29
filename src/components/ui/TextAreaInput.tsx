/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Textarea } from './Textarea';

interface TextAreaInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
  resize?: boolean;
}

export const TextAreaInput: FC<TextAreaInputProps> = ({
  name,
  control,
  placeholder = 'Digite aqui...',
  description,
  label,
  widthClass = 'w-full',
  resize = true,
}) => {
  return (
    <div className={widthClass}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className={resize ? '' : 'resize-none'}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
