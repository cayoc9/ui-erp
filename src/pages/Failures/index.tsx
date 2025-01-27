import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';

export const FailuresPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Falhas</h1>
          <h2 className="text-zinc-500">Acompanhe e atualize as falhas</h2>
        </div>

        <Link to="create">
          <Button>
            <Plus /> Nova falha
          </Button>
        </Link>
      </div>

      <div className="mt-60 flex justify-center">
        <span className="text-lg">Tabela de Falhas</span>
      </div>
    </div>
  );
};
