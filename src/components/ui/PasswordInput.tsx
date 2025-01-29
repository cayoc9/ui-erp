/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Input } from './Input';
import { Button } from './Button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  description?: string;
  widthClass?: string;
  forgotPasswordHandler?: VoidFunction;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  name,
  control,
  placeholder = 'Digite sua senha',
  description,
  label,
  widthClass = 'w-full',
  forgotPasswordHandler,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className={widthClass}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <div className="flex items-center">
              <FormLabel>{label}</FormLabel>

              {forgotPasswordHandler && (
                <a
                  href="#"
                  onClick={forgotPasswordHandler}
                  tabIndex={-1}
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              )}
            </div>

            <FormControl>
              <div className="relative">
                <Input
                  type={isVisible ? 'text' : 'password'}
                  placeholder={placeholder}
                  {...field}
                  value={field.value ?? ''}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleVisibility}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
