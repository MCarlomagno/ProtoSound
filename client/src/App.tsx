import { MantineProvider } from '@mantine/core';
import { AppShell, Header } from '@mantine/core';
import AppHeader from './components/AppHeader';

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell header={<AppHeader></AppHeader>}>
      </AppShell>
    </MantineProvider>
  )
}

export default App
