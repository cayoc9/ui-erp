import { HomePage } from '@/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import { FailuresPage } from '@/pages/Failures';
import { Layout } from '@/components/Layout';
import { IndicatorsPage } from '@/pages/Indicators';
import { CreateFailurePage } from '@/pages/Failures/CreateFailure';
import { LoginPage } from '@/pages/Login';
import { AuthWrapper } from './AuthWrapper';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthWrapper isProtected={false} />}>
          <Route path="sign-in" element={<LoginPage />} />
        </Route>

        <Route element={<AuthWrapper isProtected={true} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/indicators" element={<IndicatorsPage />} />
            <Route path="/failures" element={<FailuresPage />} />
            <Route path="/failures/create" element={<CreateFailurePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
