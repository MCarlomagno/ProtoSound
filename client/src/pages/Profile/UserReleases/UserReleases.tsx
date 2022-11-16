import { Text, SimpleGrid, Paper, createStyles, Badge, Group, Stack, Modal, Image, Center, Card } from '@mantine/core';
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

function Release({ name, author, audio, image, price, covers }: ReleaseProps) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

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
        title={name}
      >
        <Image src={image} alt={name} height={200} radius={'lg'} />
        <Group m={10} style={{ justifyContent: 'space-between'}}>
          {name}
          <Badge color={'green'}>Price: {price} Matic</Badge>
        </Group>
        <Center>
          <audio className={classes.audio} src={audio} controls />
        </Center>
        <Card withBorder={true}>
          Collection
          <SimpleGrid
            cols={3}
            style={{maxHeight: 200, overflowY: 'scroll'}}
            mt="md"
            breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
            {covers.map((item, i) => (<Image key={i} src={item} radius="sm"></Image>))}
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
      {releases.map((item, i) => (<Release key={i} {...item} />))}
    </SimpleGrid>
  )
}