import { Container, SimpleGrid } from '@mantine/core';
import { CardBackground } from '../../components/CardBackground/CardBackground';

const backgroundImages = {
  createMintEarn: "https://images.unsplash.com/photo-1588638874655-9ff1b9c6668b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&fit=crop&w=1470&q=80",
  supportListenCollect: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
};

function Home() {
  return (
    <Container>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
        <CardBackground 
          image={backgroundImages.createMintEarn}
          title='Create, Mint & Earn'
          description='Release your song with personal song cover and a collection of album covers to engage with your fans.'
          buttonProps={{ icon: 'create', label: 'Create new release' }}
        ></CardBackground>
        <CardBackground 
          image={backgroundImages.supportListenCollect}
          title='Support, Listen & Collect'
          description='Browse the artists latest relases, find the music that you love and get your own NFTs.'
          buttonProps={{ icon: 'browse', label: 'Browse latest releases' }}
        ></CardBackground>
      </SimpleGrid>
    </Container>
  )
}

export default Home;