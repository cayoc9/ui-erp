import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import {
  auditorOptions,
  dischargeSectorOptions,
  formOptions,
  nonComplienceOptions,
  professionalOptions,
  registeringSectorOptions,
} from '@/mock/failures';
import { DateInput } from '@/components/ui/DateInput';
import { NumberInput } from '@/components/ui/NumberInput';
import { useNavigate } from 'react-router';
import { TextInput } from '@/components/ui/TextInput';
import { DateRangeInput } from '@/components/ui/DateRangeInput';
import { Plus, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';
import React from 'react';
import { TextAreaInput } from '@/components/ui/TextAreaInput';
import { toast } from 'sonner';

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
  failures: z.array(
    z.object({
      form: z.string().optional(),
      formDate: z.date().optional(),
      nonCompliance: z.string().optional(),
      professional: z.string().optional(),
      responsibleSector: z.string().optional(),
      observation: z.string().optional(),
    }),
  ),
});

export const CreateFailureForm = () => {
  const navigate = useNavigate();

  const form = useForm<CreateFailureFormData>({
    defaultValues: {
      failures: [{}],
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit((data, event) => {
    console.log('Submitting data');
    console.log(data);

    const submitEvent = event?.nativeEvent as SubmitEvent;

    const submitter = submitEvent.submitter as HTMLButtonElement;

    const action = submitter.value;

    form.reset();

    toast.success('Falha registrada com sucesso');

    if (action === 'save_and_new') return;

    navigate('/failures');
  });

  const addNewFailure = () => {
    const previous = form.getValues('failures');
    const newItem = {} as CreateFailureFormData['failures'][0];

    form.setValue('failures', [...previous, newItem]);

    form.trigger('failures');
  };

  const deleteFailure = (index: number) => {
    const previous = form.getValues('failures');

    const updated = previous.filter((_, i) => i !== index);

    form.setValue('failures', updated);

    form.trigger('failures');
  };

  const renderFailureItemFields = (index: number) => (
    <React.Fragment key={index}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Inconsistência {index + 1}</p>

          {index !== 0 && (
            <Button
              type="button"
              onClick={() => {
                deleteFailure(index);
              }}
              variant="secondary"
            >
              <Trash />
              Remover
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex gap-8">
            <SearchableSelect
              control={form.control}
              name={`failures.${index}.form`}
              options={formOptions}
              label="Formulário"
              description="Selecione o formulário"
            />

            <DateInput
              control={form.control}
              name={`failures.${index}.formDate`}
              label="Data do formulário"
              description="Selecione a data do formulário"
            />
          </div>

          <div className="flex gap-8">
            <SearchableSelect
              control={form.control}
              name={`failures.${index}.nonCompliance`}
              options={nonComplienceOptions}
              label="Não conformidade"
              description="Selecione a não conformidade"
            />

            <SearchableSelect
              control={form.control}
              name={`failures.${index}.professional`}
              options={professionalOptions}
              label="Profissional"
              description="Selecione o profissional"
            />
          </div>

          <SearchableSelect
            control={form.control}
            name={`failures.${index}.responsibleSector`}
            options={dischargeSectorOptions}
            label="Setor responsável"
            description="Selecione o setor responsável pela falha"
          />

          <TextAreaInput
            control={form.control}
            name={`failures.${index}.observation`}
            label="Observação"
            description="Escreva uma observação sobre a inconsistência"
          />
        </div>
      </div>

      {index + 1 < form.getValues('failures').length && <Separator />}
    </React.Fragment>
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full justify-center">
        <div className="flex w-[75%] flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Identificação da falha</h2>

            <div className="flex flex-col gap-7">
              <div className="flex gap-8">
                <SearchableSelect
                  control={form.control}
                  name="auditor"
                  options={auditorOptions}
                  label="Auditor responsável"
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
                  label="Setor da alta"
                  description="Selecione o setor da alta"
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

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Inconsistências encontradas</h2>

            <div className="flex flex-col gap-8">
              {form.getValues()?.failures.map((_, i) => renderFailureItemFields(i))}
            </div>

            <Button type="button" onClick={addNewFailure} className="w-fit self-center">
              <Plus />
              Adicionar Inconsistência
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="destructive" onClick={() => navigate('/failures')}>
              Cancelar
            </Button>

            <Button type="submit" variant="outline" name="action" value="save_and_new">
              Salvar e novo
            </Button>

            <Button type="submit" name="action" value="save">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
