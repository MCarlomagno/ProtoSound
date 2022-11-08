import { Text, SimpleGrid, Paper, createStyles, Badge, Group, Stack } from '@mantine/core';
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


export function UserReleases() {
  const { classes } = useStyles();

  const items = mockdata.map((item) => {
    return (
      <Paper
        key={item.name}
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