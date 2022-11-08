import { Card, Image, Text, Center, SimpleGrid, createStyles, Badge, Paper, Group } from '@mantine/core';
import mockdata from '../../../mockdata.json';

const useStyles = createStyles((theme) => ({
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

  const items = mockdata.map((item) => (
    <Card withBorder radius="md" p="md" key={item.name}>
      <Card.Section>
        <Paper style={{ backgroundImage:`url(${item.image})`, height: 200 }} radius={0} p={'lg'}>
          <Group position={'right'} style={{ width: '100%' }}>
            <Badge style={{zIndex: 2}}>NFT</Badge>
          </Group>
        </Paper>
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
          <audio className={classes.audio} src={item.audio} controls></audio>
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