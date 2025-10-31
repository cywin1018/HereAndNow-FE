import { useState, useEffect } from 'react';
import Router from './routes/Router';
import SplashScreen from '@common/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <Router />;
}

export default App;
