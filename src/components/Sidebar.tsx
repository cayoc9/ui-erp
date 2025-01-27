import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { AlertTriangle, Cross, Home, LucideLayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const navbarLinks = [
  {
    title: 'Home',
    url: '/',
    Icon: Home,
  },
  {
    title: 'Indicadores',
    url: '/indicators',
    Icon: LucideLayoutDashboard,
  },
  {
    title: 'Falhas',
    url: '/failures',
    Icon: AlertTriangle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="m-2 flex items-center gap-2">
          <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-zinc-900 text-sidebar-primary-foreground">
            <Cross className="size-5" />
          </div>

          <span className="text-2xl font-semibold text-black">ERP Hospitalar</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbarLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="py-5">
                    <Link to={item.url}>
                      <div className="flex items-center gap-2">
                        <item.Icon className="size-5" strokeWidth={2.5} />
                        <span className="text-lg font-semibold">{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
