import { render } from '@testing-library/react'
import { CardBackground } from './CardBackground';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";

describe('SwitchThemeToggle', () => {
  test('renders SwitchThemeToggle component', async () => {
    // must render colorscheme + router
    // for setting up the header
    const renderResult = render(
      <Router>
      <CardBackground 
        buttonProps={{icon: 'browse', label: 'testlabel', route: 'feed'}}
        description='testDescription'
        image='https://test.com'
        title='testTitle'
      ></CardBackground>
      </Router>
    );
    const buttonLabel = renderResult.getByText('testlabel');
    const description = renderResult.getByText('testDescription');
    const title = renderResult.getByText('testTitle');

    expect(buttonLabel).not.toBeNull();
    expect(description).not.toBeNull();
    expect(title).not.toBeNull();
  })
});