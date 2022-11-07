import { Card, Image, Text, Center, Container, SimpleGrid, Avatar, Alert, Group, ActionIcon, Tabs, Dialog, TextInput, Button, Stack, BackgroundImage, Divider, Title } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconDisc, IconEdit, IconSeeding } from '@tabler/icons';
import { useState } from 'react';
import mockdata from '../../mockdata.json';

function Feed() {
  const [user, setUser] = useState({
    nick: 'mcarlomagno',
    address: '0x98976C07bdAf95A7e66050e15FD684d93f8130Fa'
  });

  const [editOpened, setEditOpened] = useState(false);
  const [editing, setEditing] = useState(false);

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
    <Container>
      {user.address ? <>
        <Group my={'md'}>
          <Avatar radius={'xl'} src={`https://avatars.dicebear.com/api/identicon/${user.address}.svg`} />
          <div>
            <Group>
              <Text size={'xl'} weight={600}>{user.nick}</Text>
              <ActionIcon>
                <IconEdit size={14} onClick={() => setEditOpened((o) => !o)} />
              </ActionIcon>
            </Group>
            <Text size={'sm'} weight={200}>{user.address}</Text>
          </div>
        </Group>

        <Dialog
          opened={editOpened}
          withCloseButton
          onClose={() => setEditOpened(false)}
          size="lg"
          radius="md"
          position={{ top: 20, right: 20 }}
        >
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Edit your nickname
          </Text>

          <Group align="flex-end">
            <TextInput placeholder="Your nickname" style={{ flex: 1 }} />
            <Button loading={editing} onClick={() => setEditOpened(false)}>Edit</Button>
          </Group>
        </Dialog>

        <Tabs defaultValue={'collected'}>
          <Tabs.List>
            <Tabs.Tab value="created" icon={<IconSeeding size={14} />}>Created</Tabs.Tab>
            <Tabs.Tab value="collected" icon={<IconBucket size={14} />}>Collected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="created" pt="xs">
            <Title my={'xl'} order={3}>
              Your releases
            </Title>
          </Tabs.Panel>

          <Tabs.Panel value="collected" pt="xs">
            <SimpleGrid
              cols={3}
              mt="md"
              breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
              {items}
            </SimpleGrid>
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