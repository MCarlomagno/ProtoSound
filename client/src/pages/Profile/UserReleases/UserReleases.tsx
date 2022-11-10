import { Text, SimpleGrid, Paper, createStyles, Badge, Group, Stack, Modal, Image, Center, Card } from '@mantine/core';
import { useState } from 'react';
import mockdata from '../../../mockdata.json';

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
}

function Release({ name, author, audio, image, price }: ReleaseProps) {
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
        <Card p={20} my={10} withBorder={true} style={{background: '#56da565e'}}>
          Total Revenue
          <Text weight={800} color="green">200 Matic</Text>
        </Card>
        <Card withBorder={true}>
          Collection
          <SimpleGrid
            cols={3}
            style={{maxHeight: 200, overflowY: 'scroll'}}
            mt="md"
            breakpoints={[{ maxWidth: 'sm', cols: 2 }]}>
            {mockdata.map((item) => (<Image src={item.image} radius="sm"></Image>))}
          </SimpleGrid>
        </Card>

      </Modal>
    </Paper>
  );
}


export function UserReleases() {
  return (
    <SimpleGrid
      cols={3}
      mt="md"
      breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
      {mockdata.map((item) => (<Release {...item} />))}
    </SimpleGrid>
  )
}