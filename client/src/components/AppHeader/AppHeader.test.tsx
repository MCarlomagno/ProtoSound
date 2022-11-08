import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from './AppHeader';
import { ColorSchemeProvider } from '@mantine/core';

describe('AppHeader', () => {
  test('renders AppHeader component', async () => {
    // must render colorscheme + router
    // for setting up the header
    render(
      <ColorSchemeProvider colorScheme='light' toggleColorScheme={()=> {}}>
          <Router><AppHeader/></Router>
      </ColorSchemeProvider>
    );
    expect(screen.getByText('Protosound')).toBeDefined()
  })
});