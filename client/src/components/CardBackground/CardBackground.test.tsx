import { render } from '@testing-library/react'
import { CardBackground } from './CardBackground';
import '@testing-library/jest-dom';

describe('SwitchThemeToggle', () => {
  test('renders SwitchThemeToggle component', async () => {
    // must render colorscheme + router
    // for setting up the header
    const renderResult = render(
      <CardBackground 
        buttonProps={{icon: 'browse', label: 'testlabel'}}
        description='testDescription'
        image='https://test.com'
        title='testTitle'
      ></CardBackground>
    );
    const buttonLabel = renderResult.getByText('testlabel');
    const description = renderResult.getByText('testDescription');
    const title = renderResult.getByText('testTitle');

    expect(buttonLabel).not.toBeNull();
    expect(description).not.toBeNull();
    expect(title).not.toBeNull();
  })
});