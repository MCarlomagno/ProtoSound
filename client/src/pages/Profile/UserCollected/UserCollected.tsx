import { Card, Image, Text, Center, SimpleGrid, createStyles, Badge, Paper, Group, Overlay, Modal, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { WIPAlert } from '../../../components/WIPAlert/WIPAlert';
import mockdata from '../../../mockdata.json';

const useStyles = createStyles((theme) => ({
  badge: {
    width: '100%',
    position: 'absolute',
    top: '24px',
    right: '24px'
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

export function UserCollected() {

  const { classes } = useStyles();
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const items = mockdata.map((item) => (
    <Card withBorder radius="md" p="md" key={item.name}>
      <Card.Section>
        <Image src={item.image} alt={item.name} height={200} />
          <Group position={'right'} className={classes.badge}>
            <Badge>NFT</Badge>
          </Group>
      </Card.Section>
      <Card.Section p="md">
        <Text size="xs" color="dimmed">
          {item.author}
        </Text>
        <Text size="sm" weight={500}>
          {item.name}
        </Text>
      </Card.Section>
      <Card.Section>
        <Center>
          <audio className={classes.audio} src={item.audio} controls />
        </Center>
      </Card.Section>
    </Card>
  ));

  return (
    <Box>
      <WIPAlert />
        <Overlay blur={2} style={{top: isMobile ? 580 : 320, height: isMobile ? '150vh' : '100vh'}} zIndex={2} opacity={0}/>
        <SimpleGrid
      cols={3}
      mt="md"
      breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
      {items}
    </SimpleGrid>

    </Box>

  )
}