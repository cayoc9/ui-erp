/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Input } from './Input';

interface TextInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  control,
  placeholder = 'Digite aqui',
  description,
  label,
  widthClass = 'w-full',
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
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
