import { HomePage } from '@/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import { FailuresPage } from '@/pages/Failures';
import { Layout } from '@/components/Layout';
import { IndicatorsPage } from '@/pages/Indicators';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/indicators" element={<IndicatorsPage />} />
          <Route path="/failures" element={<FailuresPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
