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
import { APP_PAGES, EPages, EPageSections } from '@/constants/pages';

const navbarLinks = [
  {
    title: 'Home',
    url: EPages.HOME,
    Icon: Home,
    section: EPageSections.HOME,
  },
  {
    title: 'Indicadores',
    url: EPages.INDICATORS,
    Icon: LucideLayoutDashboard,
    section: EPageSections.INDICATORS,
  },
  {
    title: 'Falhas',
    url: EPages.FAILURES,
    Icon: AlertTriangle,
    section: EPageSections.FAILURES,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();

  const { section } = APP_PAGES?.[pathname as EPages];

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
                  <SidebarMenuButton asChild isActive={section === item.section} className="py-5">
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
