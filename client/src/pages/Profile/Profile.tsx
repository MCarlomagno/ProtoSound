import { Container, Alert, Tabs } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconSeeding } from '@tabler/icons';
import { useState } from 'react';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { UserCollected } from './UserCollected/UserCollected';
import { UserReleases } from './UserReleases/UserReleases';

function Feed() {
  const [user, setUser] = useState({
    nick: 'mcarlomagno',
    address: '0x98976C07bdAf95A7e66050e15FD684d93f8130Fa'
  });


  return (
    <Container>
      {user.address ? <>
        <ProfileHeader user={user}/>
        <Tabs defaultValue={'collected'}>
          <Tabs.List>
            <Tabs.Tab value="created" icon={<IconSeeding size={14} />}>Created</Tabs.Tab>
            <Tabs.Tab value="collected" icon={<IconBucket size={14} />}>Collected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="created" pt="xs">
            <UserReleases/>
          </Tabs.Panel>

          <Tabs.Panel value="collected" pt="xs">
            <UserCollected />
          </Tabs.Panel>
        </Tabs>
      </> :
        <Alert mx={'xl'} icon={<IconAlertCircle size={16} />} title="Wallet not connected" color="cyan">
          Press connect and start listenning and collecting songs!
        </Alert>}
    </Container>
  )
}

export default Feed;