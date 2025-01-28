/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { ptBR } from 'date-fns/locale';

interface DateRangeInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  name,
  control,
  placeholder = 'Selecione uma data',
  description,
  label,
  widthClass = 'w-full',
}) => {
  return (
    <div className={widthClass}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          const isFilled = field.value?.start && field.value?.end;

          return (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'justify-start text-left font-normal',
                        widthClass,
                        !isFilled && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon />
                      {field.value?.start ? (
                        field.value?.end ? (
                          <>
                            {format(field.value.start, 'PPP', { locale: ptBR })} -{' '}
                            {format(field.value.end, 'PPP', { locale: ptBR })}
                          </>
                        ) : (
                          format(field.value.start, 'PPP', { locale: ptBR })
                        )
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.start}
                    selected={{
                      from: field.value?.start,
                      to: field.value?.end,
                    }}
                    onSelect={(value) => {
                      field.onChange({ start: value?.from, end: value?.to });
                    }}
                    numberOfMonths={2}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};
