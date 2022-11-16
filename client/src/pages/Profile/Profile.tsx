import { Container, Alert, Tabs } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconSeeding } from '@tabler/icons';
import { useEffect } from 'react';
import { useMetamask } from '../../hooks/useMetamask';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { UserCollected } from './UserCollected/UserCollected';
import { UserReleases } from './UserReleases/UserReleases';

function Feed() {
  const { accounts, getAccounts } = useMetamask();

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Container>
      {accounts[0] ? <>
        <ProfileHeader address={accounts[0]}/>
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