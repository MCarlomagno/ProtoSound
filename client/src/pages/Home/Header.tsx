import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';
import header from '../../assets/header.jpeg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export function Header() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Protosound, a web3 approach to the music industry
            </Title>
            <Text color="dimmed" mt="md">
              This app was built with ❤️ for the <a href={'https://chain.link/hackathon'}>Chainlink fall 2022 hackathon</a>.
            </Text>

            <Group mt={30}>
              <a href='https://github.com/MCarlomagno/ProtoSound' target={'_blank'}>
                <Button radius="xl" size="md" className={classes.control} leftIcon={<IconBrandGithub />}>
                  Source Code
                </Button>
              </a>
            </Group>
          </div>
          <Image radius={'lg'} src={header} height={400} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}