import { Text, Avatar, Group, ActionIcon, Dialog, TextInput, Button, Modal, Space, FileInput, LoadingOverlay, Loader } from '@mantine/core';
import { IconCurrencyDollar, IconEdit, IconMusic, IconUpload } from '@tabler/icons';
import { useCallback, useState } from 'react';
import { useIPFS } from '../../../hooks/useIPFS';

interface ProfileHeaderProps {
  address: string;
}

export function ProfileHeader({ address }: ProfileHeaderProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false)
  const { ipfs, uploadFiles } = useIPFS();

  const [coverLoading, setCoverLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);


  const [cover, setCover] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [collection, setCollection] = useState<File[]>([]);

  const submit = useCallback(async () => {
    if (!cover || !audio || !collection) return console.log('select files');
    setUploading(true);

    setCoverLoading(true);
    const [coverMeta] = await uploadFiles([cover])
    setCoverLoading(false);

    setAudioLoading(true);
    const [audioMeta] = await uploadFiles([audio])
    setAudioLoading(false);

    setCollectionLoading(true);
    const collectionMeta = await uploadFiles(collection)
    setCollectionLoading(false);

    setUploading(false);

    // TODO mint tokens
  }, [ipfs, cover, audio, collection]);


 return (
  <>
    <Group style={{ justifyContent: 'space-between'}} my={'md'}>
      <Group>
        <Avatar radius={'xl'} src={`https://avatars.dicebear.com/api/identicon/${address}.svg`} />
        <div>
          <Text size={'sm'} weight={200}>{address}</Text>
        </div>
      </Group>
      <Button leftIcon={<IconMusic />} onClick={() => setOpen(!open)}>Release Song</Button>
    </Group>

    <Modal 
      opened={open} 
      onClose={() => setOpen(false)} 
      title="Release a new Song">
      <div >
        <LoadingOverlay visible={!ipfs} overlayBlur={2} />
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
        accept="image/png,image/jpeg"
        rightSection={coverLoading && <Loader size="xs" />}
        onChange={setCover}
        icon={<IconUpload size={14}></IconUpload>} />
      <FileInput 
        m={10}
        label="Soulbound song (audio)"
        placeholder="Soulbound song (audio)"
        withAsterisk
        accept=".mp3,audio/*"
        rightSection={audioLoading && <Loader size="xs" />}
        onChange={setAudio}
        icon={<IconUpload size={14}></IconUpload>} />
      <FileInput 
        m={10}
        label="NFT collection (images)"
        placeholder="Soulbound song (images)"
        withAsterisk
        multiple
        accept="image/png,image/jpeg"
        rightSection={collectionLoading && <Loader size="xs" />}
        onChange={setCollection}
        icon={<IconUpload size={14}></IconUpload>} />
      <Group m={10} style={{justifyContent:'right'}}>
        <Button 
          disabled={!ipfs || uploading}
          leftIcon={<IconMusic></IconMusic>}
          onClick={() => submit()}>
          Release
        </Button>
      </Group>
      </div>
    </Modal>
  </>
 )
}