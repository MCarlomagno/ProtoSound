import { Container, Alert, Tabs } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconSeeding } from '@tabler/icons';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useMetamask } from '../../hooks/useMetamask';
import { useProtosoundContract } from '../../hooks/useProtosoundContract';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { UserCollected } from './UserCollected/UserCollected';
import { UserReleases } from './UserReleases/UserReleases';

function Feed() {
  const [address, setAddress] = useState<string>();

  const { getAccounts, accounts } = useMetamask();
  const { protosound } = useProtosoundContract();

  useEffect(() => {
    getAccounts().then(async (acc) => {
      if (acc[0] && protosound) {
        const addr = acc[0];
        setAddress(addr);
        const songs = await protosound.functions.getSongs(addr);
        console.log(songs[0]);
        const parsedIds = songs[0].map(Number);
        console.log(parsedIds);
        for(let id of parsedIds) {
          const song = await protosound.functions.songMetadata(id);
          console.log(song);
        }
      }
    });
  }, [protosound]);

  return (
    <Container>
      {address ? <>
        <ProfileHeader address={address}/>
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