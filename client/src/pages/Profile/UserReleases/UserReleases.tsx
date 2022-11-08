import { Text, SimpleGrid, Paper, createStyles, Badge, Group, Stack, Modal } from '@mantine/core';
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
  }
}));

interface ReleaseProps {
  name: string,
  author: string,
  audio: string,
  image: string
}

function Release({ name, author, audio, image }: ReleaseProps) {
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
        {/* Modal content */}
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