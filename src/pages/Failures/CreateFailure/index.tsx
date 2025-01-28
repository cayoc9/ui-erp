import { CreateFailureForm } from './components/CreateFailureForm';

export const CreateFailurePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cadastrar falha</h1>
          <h2 className="text-zinc-500">Preencha os dados abaixo para cadastrar uma falha</h2>
        </div>
      </div>

      <CreateFailureForm />
    </div>
  );
};
