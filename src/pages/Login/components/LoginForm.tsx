import { Button } from '@/components/ui/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/Form';
import { TextInput } from '@/components/ui/TextInput';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

const zodSchema = z.object({
  email: z
    .string({
      required_error: 'Informe seu e-mail',
    })
    .email({
      message: 'E-mail inválido',
    }),
  password: z.string().min(6, 'Forneça uma senha válida'),
});

export function LoginForm() {
  const { signIn } = useAuth();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(zodSchema),
  });

  const handleForgotPassword = () => {};

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn(data);
    } catch (e) {
      console.log(e);
      toast.error('Invalid Credentials!');
    }
  });

  return (
    <div className={'flex flex-col gap-6'}>
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-center text-2xl font-semibold">Bem-vindo(a)!</p>

          <p className="text-center text-sm text-muted-foreground">Entre com seu e-mail e senha</p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col gap-6">
              <TextInput
                control={form.control}
                name="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
              />

              <PasswordInput
                control={form.control}
                name="password"
                label="Senha"
                forgotPasswordHandler={handleForgotPassword}
              />
            </div>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
