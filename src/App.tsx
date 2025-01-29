import { Toaster } from './components/ui/Sonner';
import { AppProvider } from './contexts';
import { Router } from './Router';

function App() {
  return (
    <AppProvider>
      <Router />
      <Toaster />
    </AppProvider>
  );
}

export default App;
