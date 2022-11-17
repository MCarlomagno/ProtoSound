import { Text, SimpleGrid, Paper, createStyles, Badge, Group, Stack, Modal, Image, Center, Card, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { GridLoader } from '../../../components/GridLoader/GridLoader';
import { useMetamask } from '../../../hooks/useMetamask';
import { useProtosoundContract } from '../../../hooks/useProtosoundContract';

const useStyles = createStyles((theme) => ({
  card: {
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPositionY: '100%',
    transition: 'transform 500ms ease',
    [`&:hover`]: {
      transform: 'scale(1.03)',
    },
    cursor: 'pointer'
  },

  group: {
    width: '100%'
  },

  title: {
    color: '#fafafa',
    fontWeight: 500,
    fontSize: 20
  },

  subtitle: {
    color: '#efefef',
    fontWeight: 400,
    fontSize: 15
  },

  stack: {
    gap: 0
  },

  audio: {
    width: '100%',
    '&::-webkit-media-controls-panel': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-media-controls-enclosure': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-media-controls-current-time-display': {
      display: 'none',
    },
    '&::-webkit-media-controls-time-remaining-display': {
      display: 'none'
    }
  }
}));

interface ReleaseProps {
  name: string,
  author: string,
  audio: string,
  image: string,
  price: number
  covers: string[]
}

const exampleRelease = {
  name: 'Example song',
  author: 'Marcos Carlomagno, Luis Lopez, Agustín Longoni',
  audio: 'https://file-examples.com/storage/fe04183d33637128a9c93a7/2017/11/file_example_MP3_1MG.mp3',
  image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  price: 20,
  covers: [
    'https://images.unsplash.com/photo-1461784180009-21121b2f204c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1542628682-88321d2a4828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1526979118433-63c7344f06f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1513866942102-cfdd82745c6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1841&q=80',
    'https://images.unsplash.com/photo-1651065700017-a741fc4a7f26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fERKfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1577930595497-05902654453e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  ]
};

function Release({ name, author, audio, image, price, covers }: ReleaseProps) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const collection = covers.map((item, i) => (
    <div style={{position: 'relative'}}>
      <Image src={item} alt={name} height={200} radius={'lg'} /> 
      <Badge style={{position: 'absolute', top: '15px', right: '20px'}}>NFT</Badge> 
    </div>
  ));    
   

  return (
    <Paper
      key={name}
      shadow="md"
      p="xl"
      radius="lg"
      sx={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${image})` }}
      className={classes.card}
      onClick={() => setOpened(!opened)}
    >
      <Group position={'right'} className={classes.group}>
        <Badge>
          Soulbound NFT
        </Badge>
      </Group>
      
      <Group className={classes.group}>
        <Stack className={classes.stack}>
          <Text className={classes.title}>
            {name}
          </Text>
        </Stack>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={3}>{name}</Title>}
        size={'xl'}
      >
        <div style={{position: 'relative'}}>
          <Image src={image} alt={name} height={200} radius={'lg'} /> 
          <Badge style={{position: 'absolute', top: '15px', right: '20px'}}>Soulbound</Badge> 
        </div>
        <Card>
          <Center>
          <Badge style={{minWidth: '100px'}}>Soulbound</Badge> 
            <audio className={classes.audio} src={audio} controls />
          </Center>
        </Card>

        <Card withBorder={true}>
          <Group m={10} style={{ justifyContent: 'space-between'}}>
          <Title order={4}>NFT Collection</Title>
          <Badge color={'green'}>Price: {price} Matic</Badge>
        </Group>
          <SimpleGrid
            cols={3}
            style={{maxHeight: 200, overflowY: 'scroll'}}
            mt="md"
            breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
            {collection}
          </SimpleGrid>
        </Card>
      </Modal>
    </Paper>
  );
}


export function UserReleases() {
  const { accounts, getAccounts } = useMetamask();
  const { protosound } = useProtosoundContract();
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<ReleaseProps[]>([])

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (accounts[0] && protosound && !loading) {
      setLoading(true);
      const addr = accounts[0];
      protosound.functions.getSongs(addr).then(async (songs) => {
        const songIds = songs[0].map(Number);
        console.log(songIds);
        for(let id of songIds) {
          const [song] = await protosound.functions.getSongMetadata(id);
          const release: ReleaseProps = {
            name: song.name,
            audio: song.audioUri,
            author: addr,
            image: song.authorCoverUri,
            price: Number(song.price),
            covers: song.tokenUris
          }
          setReleases((r) => ([...r, release]));
        }
        setLoading(false);
      });
    }
  }, [accounts, protosound]);

  if (loading) {
    return (<GridLoader/>)
  }
  
  return (
    <SimpleGrid
      cols={3}
      mt="md"
      breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
      {releases.length > 0 ?
        releases.map((item, i) => (<Release key={i} {...item} />)) :
        <Release {...exampleRelease} />}
    </SimpleGrid>
  )
}