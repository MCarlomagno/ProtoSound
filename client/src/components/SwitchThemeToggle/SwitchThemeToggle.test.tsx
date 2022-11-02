import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { ColorSchemeProvider } from '@mantine/core';
import SwitchThemeToggle from './SwitchThemeToggle';

describe('SwitchThemeToggle', () => {
  test('renders SwitchThemeToggle component', async () => {
    // must render colorscheme + router
    // for setting up the header
    const renderResult = render(
      <ColorSchemeProvider colorScheme='light' toggleColorScheme={()=> {}}>
          <Router><SwitchThemeToggle/></Router>
      </ColorSchemeProvider>
    );
    const checkbox = renderResult.container.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
  })
});