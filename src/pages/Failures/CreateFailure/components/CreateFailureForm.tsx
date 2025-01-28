import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { auditorOptions, dischargeSectorOptions, registeringSectorOptions } from '@/mock/failures';
import { DateInput } from '@/components/ui/DateInput';
import { NumberInput } from '@/components/ui/NumberInput';
import { useNavigate } from 'react-router';
import { TextInput } from '@/components/ui/TextInput';
import { DateRangeInput } from '@/components/ui/DateRangeInput';

interface CreateFailureFormData {
  auditor?: string;
  registeringSector?: string;
  auditDate: Date;

  medicalRecordNumber: number;
  patientId?: string;
  dischargeSector?: string;
  hospitalizationDate?: {
    start: Date;
    end: Date;
  };

  failures: {
    form: string;
    formDate: Date;
    nonCompliance: string;
    professional: string;
    responsibleSector: string;
    observation: string;
  }[];
}

// Auditor responsável - Select
// Setor de quem registra a falha - Select
// Data da Análise/Auditoria - Date

// Número do prontuário - number
// id (nome?) do paciente - string
// Setor da alta - Select
// Data de internação - Date range

// Replicável:
// Formulário - Select
// Data do formulário - Date
// Não conformidade - Select
// Profissional - Select
// Setor responsável pela falha - Select
// Observação - TextArea name: z.string().min(1).or(z.string()).refine(val => val.length > 0, { message: defaultErrorMessage }),

const formSchema = z.object({
  auditor: z.string().optional(),
  registeringSector: z.string().optional(),
  auditDate: z.date({
    errorMap: () => ({ message: 'Informe a data da auditoria' }),
  }),
  medicalRecordNumber: z.coerce
    .number({
      errorMap: () => ({ message: 'Informe o número do prontuário' }),
    })
    .min(1),
  patientId: z.string().optional(),
  dischargeSector: z.string().optional(),
  hospitalizationDate: z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .optional(),
});

export const CreateFailureForm = () => {
  const navigate = useNavigate();

  const form = useForm<CreateFailureFormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full justify-center">
        <div className="flex w-[75%] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Informações gerais</h2>

            <div className="flex flex-col gap-10">
              <div className="flex gap-8">
                <SearchableSelect
                  control={form.control}
                  name="auditor"
                  options={auditorOptions}
                  label="Auditor"
                  description="Selecione o auditor responsável"
                />

                <SearchableSelect
                  control={form.control}
                  name="registeringSector"
                  options={registeringSectorOptions}
                  label="Setor registrante"
                  description="Selecione o setor de quem registra a falha"
                />
              </div>

              <div className="flex gap-8">
                <DateInput
                  control={form.control}
                  name="auditDate"
                  label="Data da auditoria *"
                  description="Selecione a data da realização da auditoria"
                />

                <NumberInput
                  control={form.control}
                  name="medicalRecordNumber"
                  label="Número do prontuário *"
                  placeholder="Digite o número do prontuário"
                  description="Número do prontuário do paciente"
                />
              </div>

              <div className="flex gap-8">
                <TextInput
                  control={form.control}
                  name="patientId"
                  label="Id do paciente"
                  description="Informe o Id do paciente"
                />

                <SearchableSelect
                  control={form.control}
                  name="dischargeSector"
                  options={dischargeSectorOptions}
                  label="Setor de alta"
                  description="Selecione o setor de alta"
                />
              </div>

              <div className="flex w-1/2 gap-8 pr-5">
                <DateRangeInput
                  control={form.control}
                  name="hospitalizationDate"
                  label="Período de internação"
                  description="Selecione a data de início e fim da internação"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-3">
            <Button className="" variant="destructive" onClick={() => navigate('/failures')}>
              Cancelar
            </Button>

            <Button type="submit" className="" variant="outline">
              Salvar e novo
            </Button>

            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
