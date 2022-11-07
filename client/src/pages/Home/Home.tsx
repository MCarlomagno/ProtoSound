import { BackgroundImage, Center, Container, Stack, Title, Text, Button } from '@mantine/core';
import { IconDisc, IconWorld } from '@tabler/icons';

function Home() {
  return (
    <Container>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1588638874655-9ff1b9c6668b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=1470&q=80"
        radius="lg"
        p={'lg'}
        my={'lg'}
        style={{backgroundPositionY:'75%'}}
      
      >
        <Center p="md">
          <Stack mx={'md'} style={{gap:0}}>
            <Text color={'white'} size={30} weight={600} >
              Create, Mint & Earn
            </Text>
            <Text color={'white'} size={20} weight={500}>
              Release your song with personal song cover and a collection of album covers to engage with your fans.
            </Text>
          </Stack>

          <Button mx={'md'} leftIcon={<IconDisc size={14} />}>
            Create new release
          </Button>
        </Center>
      </BackgroundImage>
      <BackgroundImage
        src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        radius="lg"
        p={'lg'}
        my={'lg'}
      >
        <Center p="md">
          <Stack mx={'md'} style={{gap:0}}>
            <Text color={'white'} size={30} weight={600} >
              Support, Listen & Collect
            </Text>
            <Text color={'white'} size={20} weight={500}>
              Browse the artists latest relases, find the music that you love and get your own NFTs.
            </Text>
          </Stack>

          <Button mx={'md'} leftIcon={<IconWorld size={14} />}>
            Browse latest releases
          </Button>
        </Center>
      </BackgroundImage>
    </Container>
  )
}

export default Home;