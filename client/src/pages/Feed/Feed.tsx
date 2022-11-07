import { SimpleGrid, Title, Text, Card, Image, Center, Container } from '@mantine/core';

import mockdata from '../../mockdata.json';

function Feed() {

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