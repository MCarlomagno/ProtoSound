import { Text, Avatar, Group, ActionIcon, Dialog, TextInput, Button, Modal, Space, FileInput } from '@mantine/core';
import { IconCurrencyDollar, IconEdit, IconMusic, IconUpload } from '@tabler/icons';
import { useState } from 'react';


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
  const [releasing, setReleasing] = useState(false);

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
      <Button leftIcon={<IconMusic />} onClick={() => setReleasing(!releasing)}>Release Song</Button>
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

    <Modal 
      opened={releasing} 
      onClose={() => setReleasing(false)} 
      title="Release a new Song">
      <TextInput
        m={10}
        placeholder="Song name"
        label="Song name"
        withAsterisk
      />
      <TextInput
        m={10}
        placeholder="Song NFT price (Matic)"
        label="Song NFT price (Matic)"
        withAsterisk
        icon={<IconCurrencyDollar size={14}/>}
        type={'number'}
      />
      <FileInput 
        m={10}
        label="Soulbound cover (image)"
        placeholder="Soulbound cover (image)"
        withAsterisk
        icon={<IconUpload size={14}></IconUpload>} />
      <FileInput 
        m={10}
        label="Soulbound song (audio)"
        placeholder="Soulbound song (audio)"
        withAsterisk
        icon={<IconUpload size={14}></IconUpload>} />
      <FileInput 
        m={10}
        label="NFT collection (images)"
        placeholder="Soulbound song (images)"
        withAsterisk
        multiple
        icon={<IconUpload size={14}></IconUpload>} />
      <Group m={10} style={{justifyContent:'right'}}>
        <Button 
          leftIcon={<IconMusic></IconMusic>}
          onClick={() => setReleasing(false)}>
          Release
        </Button>
      </Group>
    </Modal>
  </>
 )
}