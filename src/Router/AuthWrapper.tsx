import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';

interface Props {
  isProtected: boolean;
}

export const AuthWrapper = ({ isProtected }: Props) => {
  const { signedIn } = useAuth();

  if (signedIn === isProtected) return <Outlet />;

  const redirectTo = signedIn ? '/' : '/sign-in';

  return <Navigate to={redirectTo} replace />;
};
