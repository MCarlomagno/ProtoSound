import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { AppShell } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './pages/Feed/Feed';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Router basename='ProtoSound'>
          <AppShell header={<AppHeader></AppHeader>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AppShell>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
