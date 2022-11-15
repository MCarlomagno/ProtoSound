import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from './AppHeader';
import { ColorSchemeProvider } from '@mantine/core';
import * as metamask from '../../hooks/useMetamask' 


jest.mock('../../assets/logo.svg', () => 'https://test.com/');

describe('AppHeader', () => {
  test('renders AppHeader component', async () => {
    // must render colorscheme + router
    // for setting up the header
    jest.spyOn(metamask, 'useMetamask').mockImplementation(() => ({
      connect: jest.fn(),
      accounts: [''], 
      getAccounts: jest.fn().mockReturnValue(new Promise(() => {})),
      network: null,
      sendTransaction: jest.fn(),
      signer: null
    }));
    render(
      <ColorSchemeProvider colorScheme='light' toggleColorScheme={()=> {}}>
          <Router><AppHeader/></Router>
      </ColorSchemeProvider>
    );
    expect(screen.getByAltText('ProtoSound')).toBeDefined();
  })
});
