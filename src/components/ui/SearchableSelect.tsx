/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef, useState } from 'react';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from './Button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './Command';

interface SearchableSelectOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  name: string;
  control: Control<any>;
  options: SearchableSelectOption[];
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
}

export const SearchableSelect: FC<SearchableSelectProps> = ({
  name,
  control,
  options,
  placeholder = 'Selecione uma opção',
  description,
  label,
  widthClass = 'w-full',
}) => {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

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
                    ref={triggerRef}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'justify-between',
                      widthClass,
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value
                      ? options.find((option) => option.value === field.value)?.label
                      : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className={cn('p-0')}
                style={{
                  width: triggerRef.current?.offsetWidth || 'auto',
                }}
              >
                <Command>
                  <CommandInput placeholder="Pesquise..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            field.onChange(option.value);
                            setOpen(false);
                          }}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              option.value === field.value ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
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
