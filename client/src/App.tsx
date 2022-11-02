import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import AppHeader from './components/header/AppHeader';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell header={<AppHeader></AppHeader>}>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
