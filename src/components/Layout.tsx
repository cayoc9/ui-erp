import { AppSidebar } from '@/components/Sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router';
import { HeaderBreadcumb } from './HeaderBreadcrum';
import { HeaderUserMenu } from './HeaderUserMenu';

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div>
            <SidebarTrigger className="-ml-1 md:hidden" />

            <HeaderBreadcumb className="hidden md:block" />
          </div>

          <HeaderUserMenu />
        </header>
        <main className="flex h-full justify-center">
          <div className="m-4 w-full max-w-screen-2xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
