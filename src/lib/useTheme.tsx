import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storageTheme = localStorage.getItem('theme');
    // already previously set in browser store.
    if (storageTheme && ['light', 'dark'].includes(storageTheme)) {
      setTheme(storageTheme);
    } else {
      // try to automatically infer dark mode theme.
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        // default to light
        setTheme('light');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('storage'));
  };

  return { theme, toggleTheme };
};

export default useTheme;
