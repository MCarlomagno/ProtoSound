import { SimpleGrid, Title, Text, Card, Image, Center, Container, createStyles } from '@mantine/core';

import mockdata from '../../mockdata.json';

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

function Feed() {

  const { classes } = useStyles();

  const items = mockdata.map((item) => (
    <Card withBorder radius="md" p="md" key={item.name}>
      <Card.Section>
        <Image src={item.image} alt={item.name} height={200} />
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
    <Container>
      <Title p={'lg'} order={2}>Feed</Title>
      <SimpleGrid
        cols={3}
        mt="md" 
        breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]}>
        {items}
      </SimpleGrid>
    </Container>
  )
}

export default Feed;