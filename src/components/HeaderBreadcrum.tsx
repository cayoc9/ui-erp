import { useLocation } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/Breadcrumb';
import { APP_PAGES, EPages } from '@/constants/pages';
import React from 'react';

export const HeaderBreadcumb = ({ ...props }: React.ComponentProps<typeof Breadcrumb>) => {
  const { pathname } = useLocation();

  const page = APP_PAGES?.[pathname as EPages];

  const { title, pathPages } = page;

  const renderItem = (page: EPages, title: string) => (
    <React.Fragment key={page}>
      <BreadcrumbItem>
        <BreadcrumbLink href={page}>{title}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator />
    </React.Fragment>
  );

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {pathname !== EPages.HOME && renderItem(EPages.HOME, 'Home')}

        {pathPages.map((page) => {
          const { title } = APP_PAGES?.[page as EPages];

          return renderItem(page, title);
        })}

        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
