import { Card, Image, Text, Center, Container, SimpleGrid, Avatar, Alert, Group, ActionIcon, Tabs, Dialog, TextInput, Button, Stack, BackgroundImage, Divider, Title, Space } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconEdit, IconMusic, IconSeeding } from '@tabler/icons';
import { useState } from 'react';
import mockdata from '../../mockdata.json';


interface User {
  nick: string;
  address: string;
}

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [editOpened, setEditOpened] = useState(false);
  const [editing, setEditing] = useState(false);

 return (
  <>
    <Group style={{ justifyContent: 'space-between'}} my={'md'}>
      <Group>
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
      <Button leftIcon={<IconMusic />}>Release Song</Button>
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
  </>
 )
}