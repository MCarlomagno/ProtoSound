import { Card, Image, Text, Center, Container, SimpleGrid, Avatar, Alert, Group, ActionIcon, Tabs, Dialog, TextInput, Button, Stack, BackgroundImage, Divider, Title, Space } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconEdit, IconMusic, IconSeeding } from '@tabler/icons';
import { useState } from 'react';
import mockdata from '../../mockdata.json';
import { ProfileHeader } from './ProfileHeader';


function UserReleases() {
  return (
    <Title my={'xl'} order={3}>
      Your releases
    </Title>
  )
}

function UserCollected() {

  const items = mockdata.map((item) => (
    <Card withBorder radius="md" p="md" key={item.name}>
      <Card.Section>
        <Image src={item.image} alt={item.name} height={150} />
      </Card.Section>
      <Card.Section p="md">
        <Text size="xs" color="dimmed">
          {item.author}
        </Text>
        <Text size="sm" weight={500}>
          {item.name}
        </Text>
      </Card.Section>
      <Card.Section p="md">
        <Center>
          <audio src={item.audio} controls></audio>
        </Center>
      </Card.Section>
    </Card>
  ));

  return (
    <SimpleGrid
      cols={3}
      mt="md"
      breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
      {items}
    </SimpleGrid>
  )
}

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