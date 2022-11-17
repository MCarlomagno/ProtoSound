import { Text, Avatar, Group, Notification, TextInput, Button, Modal, FileInput, LoadingOverlay, Loader, Image } from '@mantine/core';
import { IconCurrencyDollar, IconMusic, IconUpload } from '@tabler/icons';
import { useCallback, useEffect, useState } from 'react';
import { useIPFS } from '../../../hooks/useIPFS';
import { useMetamask } from '../../../hooks/useMetamask';
import { useProtosoundContract } from '../../../hooks/useProtosoundContract';
import songReleaseImage from '../../../assets/release.png';
import { useElementSize } from '@mantine/hooks';

interface ProfileHeaderProps {
  address: string;
}

export function ProfileHeader({ address }: ProfileHeaderProps) {
  const { ref, width, height } = useElementSize();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const { ipfs, uploadFiles } = useIPFS();
  const { signer, connect } = useMetamask();
  const { protosound, sign } = useProtosoundContract(); 

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>();
  const [coverLoading, setCoverLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);


  const [cover, setCover] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [collection, setCollection] = useState<File[]>([]);

  useEffect(() => {
    connect();
  },[])

  const submit = useCallback(async () => {
    if (!protosound || !ipfs || !signer) return console.log('Loading resources!');
    if (!cover || 
        !audio ||
        !collection ||
        !name ||
        !price
    ) return console.log('complete all the fields!');

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

    const protosoundSigned = await sign(signer);
    if (!protosoundSigned) throw Error('something unexpected happened');

    setMinting(true);

    const tx = await protosoundSigned.functions.mintSong(
      price,
      name,
      coverMeta.url,
      audioMeta.url,
      collectionMeta.map((c) => c.url)
    );

    await tx.wait();
    setMinting(false);
    setUploading(false);
    window.location.reload();
  }, [ipfs, price, name, cover, audio, collection, protosound, signer]);


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
      title="Release a new Song"
      size={'md'}>
          <Image src={songReleaseImage} alt={'song release'} height={150} fit={'cover'} radius={'lg'} /> 
          <div >
            <LoadingOverlay visible={!ipfs} overlayBlur={2} />
            <TextInput
            m={10}
            placeholder="Song name"
            label="Song name"
            withAsterisk
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            m={10}
            placeholder="Song price"
            label="Song price"
            description="The cost (in Matic) that your fans will pay for your song and minting one of the generated NFTs"
            withAsterisk
            icon={<IconCurrencyDollar size={14}/>}
            type={'number'}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <FileInput 
            m={10}
            label="Soulbound cover (image)"
            placeholder="Soulbound cover (image)"
            withAsterisk
            description="The image Soulbound token, it is a visual representation of your song"
            accept="image/png,image/jpeg"
            rightSection={coverLoading && <Loader size="xs" />}
            onChange={setCover}
            icon={<IconUpload size={14}></IconUpload>} />
          <FileInput 
            m={10}
            label="Soulbound song (audio)"
            placeholder="Soulbound song (audio)"
            withAsterisk
            description="The audio Soulbound token, and its your actual song, it will belong to you forever since you are the author"
            accept=".mp3,audio/*"
            rightSection={audioLoading && <Loader size="xs" />}
            onChange={setAudio}
            icon={<IconUpload size={14}></IconUpload>} />
          <FileInput 
            m={10}
            label="NFT collection (images)"
            placeholder="Soulbound song (images)"
            withAsterisk
            description="The NFT collection that will be minted and for sell, when your fans buy your song, they also will receive one token from the collection randomly"
            multiple
            accept="image/png,image/jpeg"
            rightSection={collectionLoading && <Loader size="xs" />}
            onChange={setCollection}
            icon={<IconUpload size={14}></IconUpload>} />
          <Group m={10} style={{justifyContent:'right'}}>
            { uploading && <Loader size={'xs'} />}
            <Button 
              disabled={!ipfs || !protosound || uploading}
              leftIcon={<IconMusic></IconMusic>}
              onClick={() => submit()}>
              Release
            </Button>
          </Group>
        </div>
    </Modal>

    {uploading && <Notification loading disallowClose title={minting ? "Minting tokens" : "Uploading Files"}>
     {minting ?
        'Your Soulbound and NFT tokens are in process of minting' :
        'Your song files and nfts are being uploaded to IPFS decentralized storage.'}
    </Notification>}
  </>
 )
}