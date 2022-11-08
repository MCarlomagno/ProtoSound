import { Card, Image, Text, Center, Container, SimpleGrid, Alert, Tabs, Paper, createStyles, Badge, Group, Stack, ActionIcon } from '@mantine/core';
import { IconAlertCircle, IconBucket, IconPlayerPause, IconPlayerPlay, IconSeeding } from '@tabler/icons';
import { useState } from 'react';
import mockdata from '../../mockdata.json';
import { ProfileHeader } from './ProfileHeader';

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
  }
}));

function UserReleases() {
  const { classes } = useStyles();
  const [playing, setPlaying] = useState(false);

  const items = mockdata.map((item) => {
    return (
      <Paper
        shadow="md"
        p="xl"
        radius="lg"
        sx={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${item.image})` }}
        className={classes.card}
      >
        <Group position={'right'} className={classes.group}>
          <Badge>
            Soulbound NFT
          </Badge>
        </Group>
        
        <Group className={classes.group}>
          <Stack className={classes.stack}>
            <Text className={classes.title}>
              {item.name}
            </Text>
          </Stack>
        </Group>
      </Paper>
    );
  });

  return (
    <SimpleGrid
      cols={3}
      mt="md"
      breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
      {items}
    </SimpleGrid>
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