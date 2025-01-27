import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';

export const HeaderUserMenu = () => {
  const renderUserCard = () => (
    <div className="flex cursor-pointer items-center gap-2 px-2 py-0.5">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />

          <AvatarFallback>JL</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start gap-0.5">
          <p className="text-sm font-medium leading-none">Usuário</p>

          <p className="text-sm leading-none text-muted-foreground">user@email.com</p>
        </div>
      </div>

      <ChevronDown className="text-muted-foreground" />
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderUserCard()}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Perfil</DropdownMenuItem>

          <DropdownMenuItem disabled>Configurações</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
