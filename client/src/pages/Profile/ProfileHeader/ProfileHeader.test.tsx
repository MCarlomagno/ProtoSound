import {render} from '@testing-library/react';
import { ProfileHeader } from './ProfileHeader';
import '@testing-library/jest-dom';

describe('ProfileHeader', () => {
  test('renders ProfileHeader page', async () => {
    const user = {
      nick: 'testuser',
      address: '0xtest'
    }
    const renderResult = render(<ProfileHeader user={user}/>);
    
    const nick = renderResult.getByText(user.nick);
    const address = renderResult.getByText(user.address);

    expect(nick).not.toBeNull();
    expect(address).not.toBeNull();
  })
});
