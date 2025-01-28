/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from './Button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './Calendar';

interface DateInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
}

export const DateInput: FC<DateInputProps> = ({
  name,
  control,
  placeholder = 'Selecione uma data',
  description,
  label,
  widthClass = 'w-full',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={widthClass}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'pl-3 text-left font-normal',
                      widthClass,
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(value) => {
                    field.onChange(value);
                    setOpen(false);
                  }}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
