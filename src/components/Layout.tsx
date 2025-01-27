import { AppSidebar } from '@/components/Sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:justify-end">
          <SidebarTrigger className="-ml-1 md:hidden" />
        </header>
        <main className="m-4 h-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
