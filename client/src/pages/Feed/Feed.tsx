import { SimpleGrid, Title, Text, Card, Image, Center, Container, createStyles, Group, Badge, Button } from '@mantine/core';
import { IconCurrencyDollar, IconZoomMoney } from '@tabler/icons';

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
        <Group >
          <div>
            <Text size="xs" color="dimmed">
              {item.author}
            </Text>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </div>
        </Group>
      </Card.Section>
      <Card.Section>
        <Center>
          <audio className={classes.audio} src={item.audio} controls />
        </Center>
      </Card.Section>
      <Card.Section p={'md'} >
        <Group style={{justifyContent: 'space-between'}}>
          <Badge color={'green'}>{item.price} Matic</Badge>
          <Button variant='outline' leftIcon={<IconCurrencyDollar size={15}/>}>Get song</Button>
        </Group>
      </Card.Section>
    </Card>

  ));

  return (
    <Container>
      <Title px={'lg'} order={2}>Feed</Title>
      <Text px={'lg'} color={'dimmed'}>Select your favorite song, purchase, listen and mint your own NFT</Text>
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